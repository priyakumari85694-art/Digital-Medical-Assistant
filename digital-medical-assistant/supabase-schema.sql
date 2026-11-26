create table if not exists public.chat_conversations (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  title text not null default 'Health conversation',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.chat_messages (
  id uuid primary key default gen_random_uuid(),
  conversation_id uuid not null references public.chat_conversations(id) on delete cascade,
  user_id uuid not null references auth.users(id) on delete cascade,
  sender text not null check (sender in ('user', 'assistant')),
  content text not null,
  created_at timestamptz not null default now()
);

create table if not exists public.doctor_visit_notes (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  appointment_id text not null,
  doctor_name text not null,
  specialty text not null,
  appointment_date text not null,
  note text not null,
  updated_at timestamptz not null default now(),
  unique (user_id, appointment_id)
);

create index if not exists chat_conversations_user_updated_idx
  on public.chat_conversations (user_id, updated_at desc);
create index if not exists chat_messages_user_conversation_created_idx
  on public.chat_messages (user_id, conversation_id, created_at);

alter table public.chat_conversations enable row level security;
alter table public.chat_messages enable row level security;
alter table public.doctor_visit_notes enable row level security;

grant usage on schema public to authenticated;
grant select, insert, update, delete on public.chat_conversations to authenticated;
grant select, insert, update, delete on public.chat_messages to authenticated;
grant select, insert, update, delete on public.doctor_visit_notes to authenticated;

drop policy if exists "Customers can access their own conversations" on public.chat_conversations;
drop policy if exists "Customers can access their own chat messages" on public.chat_messages;
drop policy if exists "Customers can access their own doctor visit notes" on public.doctor_visit_notes;

create policy "Customers can access their own conversations"
  on public.chat_conversations for all to authenticated
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

create policy "Customers can access their own chat messages"
  on public.chat_messages for all to authenticated
  using (auth.uid() = user_id)
  with check (
    auth.uid() = user_id
    and exists (
      select 1 from public.chat_conversations
      where id = conversation_id and user_id = auth.uid()
    )
  );

create policy "Customers can access their own doctor visit notes"
  on public.doctor_visit_notes for all to authenticated
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);