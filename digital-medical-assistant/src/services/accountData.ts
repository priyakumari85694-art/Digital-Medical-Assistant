import { supabase } from './supabase';
import { localApi } from './localApi';

export interface SavedChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  content: string;
  created_at: string;
}

export interface SavedConversation {
  id: string;
  title: string;
  updated_at: string;
}

export interface SavedVisitNote {
  appointment_id: string;
  doctor_name: string;
  specialty: string;
  appointment_date: string;
  note: string;
}

export const loadLatestConversation = async (userId: string) => {
  const conversations = await loadConversations(userId);
  const conversation = conversations[0];
  if (!conversation) return { conversationId: null, messages: [] as SavedChatMessage[] };

  const messages = await loadConversationMessages(userId, conversation.id);
  return { conversationId: conversation.id, messages };
};

export const loadConversations = async (userId: string) => {
  if (!supabase) {
    const { conversations } = await localApi<{ conversations: SavedConversation[] }>('/conversations');
    return conversations;
  }

  const { data, error } = await supabase
    .from('chat_conversations')
    .select('id, title, updated_at')
    .eq('user_id', userId)
    .order('updated_at', { ascending: false })
    .limit(50);

  if (error) throw error;
  return (data ?? []) as SavedConversation[];
};

export const loadConversationMessages = async (userId: string, conversationId: string) => {
  if (!supabase) {
    const { messages } = await localApi<{ messages: SavedChatMessage[] }>(
      `/conversations/${encodeURIComponent(conversationId)}/messages`
    );
    return messages;
  }

  const { data: messages, error } = await supabase
    .from('chat_messages')
    .select('id, sender, content, created_at')
    .eq('user_id', userId)
    .eq('conversation_id', conversationId)
    .order('created_at', { ascending: true });

  if (error) throw error;
  return (messages ?? []) as SavedChatMessage[];
};

export const createConversation = async (userId: string, title: string) => {
  if (!supabase) {
    const { id } = await localApi<{ id: string }>('/conversations', {
      method: 'POST',
      body: JSON.stringify({ title: title.slice(0, 100) || 'Health conversation' })
    });
    return id;
  }

  const { data, error } = await supabase
    .from('chat_conversations')
    .insert({ user_id: userId, title: title.slice(0, 100) || 'Health conversation' })
    .select('id')
    .single();

  if (error) throw error;
  return data.id as string;
};

export const saveChatMessage = async (
  userId: string,
  conversationId: string,
  sender: SavedChatMessage['sender'],
  content: string
) => {
  if (!supabase) {
    await localApi(`/conversations/${encodeURIComponent(conversationId)}/messages`, {
      method: 'POST',
      body: JSON.stringify({ sender, content })
    });
    return;
  }

  const { error } = await supabase.from('chat_messages').insert({
    user_id: userId,
    conversation_id: conversationId,
    sender,
    content
  });

  if (error) throw error;

  const { error: updateError } = await supabase
    .from('chat_conversations')
    .update({ updated_at: new Date().toISOString() })
    .eq('id', conversationId)
    .eq('user_id', userId);

  if (updateError) throw updateError;
};

export const loadVisitNotes = async (userId: string) => {
  if (!supabase) {
    const { notes } = await localApi<{ notes: SavedVisitNote[] }>('/visit-notes');
    return notes;
  }

  const { data, error } = await supabase
    .from('doctor_visit_notes')
    .select('appointment_id, doctor_name, specialty, appointment_date, note')
    .eq('user_id', userId);

  if (error) throw error;
  return (data ?? []) as SavedVisitNote[];
};

export const saveVisitNote = async (userId: string, visitNote: SavedVisitNote) => {
  if (!supabase) {
    await localApi(`/visit-notes/${encodeURIComponent(visitNote.appointment_id)}`, {
      method: 'PUT',
      body: JSON.stringify({
        doctorName: visitNote.doctor_name,
        specialty: visitNote.specialty,
        appointmentDate: visitNote.appointment_date,
        note: visitNote.note
      })
    });
    return;
  }

  const { error } = await supabase.from('doctor_visit_notes').upsert({
    user_id: userId,
    ...visitNote,
    updated_at: new Date().toISOString()
  }, { onConflict: 'user_id,appointment_id' });

  if (error) throw error;
};