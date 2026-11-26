import { randomBytes, randomUUID, scryptSync, timingSafeEqual, createHash } from 'node:crypto';
import { mkdirSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { DatabaseSync } from 'node:sqlite';
import express from 'express';

if (process.env.NODE_ENV === 'production') {
  throw new Error('The local demo API is development-only.');
}

const port = Number(process.env.DEMO_API_PORT || 3002);
const databasePath = resolve(process.env.DEMO_DB_PATH || 'data/local-demo.sqlite');
const cookieName = 'dma_demo_session';
const sessionDurationMs = 8 * 60 * 60 * 1000;
const demoAccounts = [
  { id: 'demo-patient-1', name: 'Aarav Sharma', email: 'aarav.demo@example.test' },
  { id: 'demo-patient-2', name: 'Mira Patel', email: 'mira.demo@example.test' },
  { id: 'demo-patient-3', name: 'Kabir Mehta', email: 'kabir.demo@example.test' }
];

mkdirSync(dirname(databasePath), { recursive: true });
const database = new DatabaseSync(databasePath);
database.exec(`
  pragma foreign_keys = on;
  create table if not exists users (
    id text primary key,
    name text not null,
    email text not null unique collate nocase,
    password_salt text not null,
    password_hash text not null,
    is_demo integer not null default 0,
    created_at text not null default (datetime('now'))
  );
  create table if not exists sessions (
    token_hash text primary key,
    user_id text not null references users(id) on delete cascade,
    expires_at integer not null
  );
  create table if not exists chat_conversations (
    id text primary key,
    user_id text not null references users(id) on delete cascade,
    title text not null,
    created_at text not null default (datetime('now')),
    updated_at text not null default (datetime('now'))
  );
  create table if not exists chat_messages (
    id text primary key,
    user_id text not null references users(id) on delete cascade,
    conversation_id text not null references chat_conversations(id) on delete cascade,
    sender text not null check (sender in ('user', 'assistant')),
    content text not null,
    created_at text not null default (datetime('now'))
  );
  create table if not exists doctor_visit_notes (
    user_id text not null references users(id) on delete cascade,
    appointment_id text not null,
    doctor_name text not null,
    specialty text not null,
    appointment_date text not null,
    note text not null,
    updated_at text not null default (datetime('now')),
    primary key (user_id, appointment_id)
  );
  create index if not exists conversations_user_updated_idx on chat_conversations(user_id, updated_at desc);
  create index if not exists messages_user_conversation_created_idx on chat_messages(user_id, conversation_id, created_at);
`);

const hashPassword = (password, salt) => scryptSync(password, salt, 64).toString('hex');
const hashToken = (token) => createHash('sha256').update(token).digest('hex');

for (const account of demoAccounts) {
  const existing = database.prepare('select id from users where id = ?').get(account.id);
  if (!existing) {
    const salt = randomBytes(16).toString('hex');
    database.prepare(`
      insert into users (id, name, email, password_salt, password_hash, is_demo)
      values (?, ?, ?, ?, ?, 1)
    `).run(account.id, account.name, account.email, salt, hashPassword(randomBytes(32).toString('hex'), salt));
  }
}

const app = express();
app.disable('x-powered-by');
app.use(express.json({ limit: '16kb' }));

const getCookie = (request, name) => {
  const cookieHeader = request.headers.cookie || '';
  const entry = cookieHeader.split(';').map((part) => part.trim()).find((part) => part.startsWith(`${name}=`));
  return entry ? decodeURIComponent(entry.slice(name.length + 1)) : null;
};

const setSessionCookie = (response, token) => {
  response.setHeader('Set-Cookie', `${cookieName}=${encodeURIComponent(token)}; HttpOnly; SameSite=Lax; Path=/; Max-Age=${sessionDurationMs / 1000}`);
};

const createSession = (userId, response) => {
  const token = randomBytes(32).toString('base64url');
  const expiresAt = Date.now() + sessionDurationMs;
  database.prepare('insert into sessions (token_hash, user_id, expires_at) values (?, ?, ?)')
    .run(hashToken(token), userId, expiresAt);
  setSessionCookie(response, token);
};

const requireUser = (request, response, next) => {
  const token = getCookie(request, cookieName);
  if (!token) return response.status(401).json({ error: 'Please sign in to continue.' });

  const session = database.prepare(`
    select users.id, users.name, users.email
    from sessions join users on users.id = sessions.user_id
    where sessions.token_hash = ? and sessions.expires_at > ?
  `).get(hashToken(token), Date.now());

  if (!session) return response.status(401).json({ error: 'Your session expired. Please sign in again.' });
  request.user = session;
  next();
};

app.get('/api/health', (_request, response) => response.json({ mode: 'local-demo' }));

app.get('/api/auth/demo-accounts', (_request, response) => {
  response.json({ accounts: demoAccounts });
});

app.get('/api/auth/me', requireUser, (request, response) => {
  response.json({ user: request.user });
});

app.post('/api/auth/demo-login', (request, response) => {
  const account = demoAccounts.find((demoAccount) => demoAccount.id === request.body?.accountId);
  if (!account) return response.status(400).json({ error: 'Choose a valid demo account.' });

  createSession(account.id, response);
  response.json({ user: { id: account.id, name: account.name, email: account.email } });
});

app.post('/api/auth/register', (request, response) => {
  const name = typeof request.body?.name === 'string' ? request.body.name.trim() : '';
  const email = typeof request.body?.email === 'string' ? request.body.email.trim().toLowerCase() : '';
  const password = typeof request.body?.password === 'string' ? request.body.password : '';

  if (name.length < 2 || name.length > 100) return response.status(400).json({ error: 'Enter a name between 2 and 100 characters.' });
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || email.length > 254) return response.status(400).json({ error: 'Enter a valid email address.' });
  if (password.length < 8 || password.length > 256) return response.status(400).json({ error: 'Password must be between 8 and 256 characters.' });

  const salt = randomBytes(16).toString('hex');
  const userId = randomUUID();
  try {
    database.prepare(`
      insert into users (id, name, email, password_salt, password_hash)
      values (?, ?, ?, ?, ?)
    `).run(userId, name, email, salt, hashPassword(password, salt));
  } catch (error) {
    if (error.code === 'SQLITE_CONSTRAINT_UNIQUE') return response.status(409).json({ error: 'An account with this email already exists.' });
    throw error;
  }

  createSession(userId, response);
  response.status(201).json({ user: { id: userId, name, email } });
});

app.post('/api/auth/login', (request, response) => {
  const email = typeof request.body?.email === 'string' ? request.body.email.trim().toLowerCase() : '';
  const password = typeof request.body?.password === 'string' ? request.body.password : '';
  const user = database.prepare(`
    select id, name, email, password_salt, password_hash
    from users where email = ? collate nocase
  `).get(email);

  if (!user || password.length > 256) return response.status(401).json({ error: 'Email or password is incorrect.' });
  const expectedHash = Buffer.from(user.password_hash, 'hex');
  const submittedHash = Buffer.from(hashPassword(password, user.password_salt), 'hex');
  if (expectedHash.length !== submittedHash.length || !timingSafeEqual(expectedHash, submittedHash)) {
    return response.status(401).json({ error: 'Email or password is incorrect.' });
  }

  createSession(user.id, response);
  response.json({ user: { id: user.id, name: user.name, email: user.email } });
});

app.post('/api/auth/logout', (request, response) => {
  const token = getCookie(request, cookieName);
  if (token) database.prepare('delete from sessions where token_hash = ?').run(hashToken(token));
  response.setHeader('Set-Cookie', `${cookieName}=; HttpOnly; SameSite=Lax; Path=/; Max-Age=0`);
  response.status(204).end();
});

app.get('/api/conversations', requireUser, (request, response) => {
  const conversations = database.prepare(`
    select id, title, updated_at from chat_conversations
    where user_id = ? order by updated_at desc limit 50
  `).all(request.user.id);
  response.json({ conversations });
});

app.post('/api/conversations', requireUser, (request, response) => {
  const title = typeof request.body?.title === 'string' ? request.body.title.trim().slice(0, 100) : '';
  const id = randomUUID();
  database.prepare('insert into chat_conversations (id, user_id, title) values (?, ?, ?)')
    .run(id, request.user.id, title || 'Health conversation');
  response.status(201).json({ id });
});

app.get('/api/conversations/:conversationId/messages', requireUser, (request, response) => {
  const messages = database.prepare(`
    select id, sender, content, created_at from chat_messages
    where user_id = ? and conversation_id = ? order by created_at asc, rowid asc
  `).all(request.user.id, request.params.conversationId);
  response.json({ messages });
});

app.post('/api/conversations/:conversationId/messages', requireUser, (request, response) => {
  const sender = request.body?.sender;
  const content = typeof request.body?.content === 'string' ? request.body.content.trim() : '';
  if (!['user', 'assistant'].includes(sender) || !content || content.length > 10000) {
    return response.status(400).json({ error: 'Invalid message.' });
  }

  const conversation = database.prepare('select id from chat_conversations where id = ? and user_id = ?')
    .get(request.params.conversationId, request.user.id);
  if (!conversation) return response.status(404).json({ error: 'Conversation not found.' });

  database.prepare(`
    insert into chat_messages (id, user_id, conversation_id, sender, content)
    values (?, ?, ?, ?, ?)
  `).run(randomUUID(), request.user.id, conversation.id, sender, content);
  database.prepare("update chat_conversations set updated_at = datetime('now') where id = ? and user_id = ?")
    .run(conversation.id, request.user.id);
  response.status(201).json({ saved: true });
});

app.get('/api/visit-notes', requireUser, (request, response) => {
  const notes = database.prepare(`
    select appointment_id, doctor_name, specialty, appointment_date, note
    from doctor_visit_notes where user_id = ? order by updated_at desc
  `).all(request.user.id);
  response.json({ notes });
});

app.put('/api/visit-notes/:appointmentId', requireUser, (request, response) => {
  const { doctorName, specialty, appointmentDate, note } = request.body ?? {};
  if (![doctorName, specialty, appointmentDate, note].every((value) => typeof value === 'string' && value.trim()) || note.length > 10000) {
    return response.status(400).json({ error: 'Complete the doctor, appointment, and note fields.' });
  }

  database.prepare(`
    insert into doctor_visit_notes (user_id, appointment_id, doctor_name, specialty, appointment_date, note)
    values (?, ?, ?, ?, ?, ?)
    on conflict (user_id, appointment_id) do update set
      doctor_name = excluded.doctor_name,
      specialty = excluded.specialty,
      appointment_date = excluded.appointment_date,
      note = excluded.note,
      updated_at = datetime('now')
  `).run(request.user.id, request.params.appointmentId, doctorName.trim(), specialty.trim(), appointmentDate.trim(), note.trim());
  response.json({ saved: true });
});

app.use((error, _request, response, _next) => {
  console.error('Local demo API error:', error.message);
  response.status(500).json({ error: 'The local demo service could not complete the request.' });
});

app.listen(port, '127.0.0.1', () => {
  console.log(`Local demo API listening on http://127.0.0.1:${port}`);
  console.log(`Demo database: ${databasePath}`);
});