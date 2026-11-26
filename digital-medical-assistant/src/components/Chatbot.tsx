import React, { useState, useRef, useEffect } from 'react';
import { 
  Send, 
  Bot, 
  User, 
  RotateCcw, 
  Sparkles, 
  ShieldCheck, 
  AlertCircle,
  Copy,
  Check,
  HelpCircle
} from 'lucide-react';
import { ChatMessage } from '../types';
import { getAIResponse } from '../services/aiService';
import { useAuth } from '../AuthContext';
import {
  createConversation,
  loadConversations,
  loadConversationMessages,
  loadLatestConversation,
  saveChatMessage,
  SavedConversation
} from '../services/accountData';

interface ChatbotProps {
  embedded?: boolean;
}

const INITIAL_MESSAGES: ChatMessage[] = [
  {
    id: 'msg-1',
    sender: 'assistant',
    text: "Hello! I'm your Digital Medical Assistant. How can I help you today?",
    timestamp: '10:18 AM'
  },
  {
    id: 'msg-2',
    sender: 'user',
    text: "I've been having a headache since this morning. What could be some common causes?",
    timestamp: '10:19 AM'
  },
  {
    id: 'msg-3',
    sender: 'assistant',
    text: "Headaches can have many common causes, such as dehydration, lack of sleep, stress, or tension. If your symptoms are severe, sudden, or unusual, consider seeking professional medical attention.",
    timestamp: '10:19 AM'
  }
];

const WELCOME_MESSAGE: ChatMessage = {
  id: 'welcome',
  sender: 'assistant',
  text: "Hello! I'm your Digital Medical Assistant. How can I help you today?",
  timestamp: ''
};

const SUGGESTED_QUESTIONS = [
  "What are common causes of headaches?",
  "How can I improve my sleep?",
  "What are common flu symptoms?",
  "When should I see a doctor?"
];

export const Chatbot: React.FC<ChatbotProps> = ({ embedded = false }) => {
  const { user } = useAuth();
  const [messages, setMessages] = useState<ChatMessage[]>(INITIAL_MESSAGES);
  const [conversations, setConversations] = useState<SavedConversation[]>([]);
  const [conversationId, setConversationId] = useState<string | null>(null);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [historyLoading, setHistoryLoading] = useState(false);
  const [historyNotice, setHistoryNotice] = useState('');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  useEffect(() => {
    let active = true;
    setConversationId(null);
    setHistoryNotice('');

    if (!user) {
      setConversations([]);
      setMessages(INITIAL_MESSAGES);
      setHistoryLoading(false);
      return () => { active = false; };
    }

    setMessages([WELCOME_MESSAGE]);
    setHistoryLoading(true);
    void Promise.all([loadConversations(user.id), loadLatestConversation(user.id)])
      .then(([savedConversations, latest]) => {
        if (!active) return;
        setConversations(savedConversations);
        setConversationId(latest.conversationId);
        setMessages(latest.messages.length ? latest.messages.map((message) => ({
          id: message.id,
          sender: message.sender,
          text: message.content,
          timestamp: new Date(message.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        })) : [WELCOME_MESSAGE]);
      })
      .catch(() => {
        if (active) setHistoryNotice('Saved chat history could not be loaded. Check your account data setup and try again.');
      })
      .finally(() => {
        if (active) setHistoryLoading(false);
      });

    return () => { active = false; };
  }, [user?.id]);

  const handleSendMessage = async (textToSend?: string) => {
    const text = (textToSend || inputValue).trim();
    if (!text || isLoading) return;

    const userMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    let currentConversationId = conversationId;
    let canSaveAssistantMessage = Boolean(user);
    if (user) {
      try {
        if (!currentConversationId) {
          currentConversationId = await createConversation(user.id, text);
          setConversationId(currentConversationId);
          setConversations((previous) => [{
            id: currentConversationId!,
            title: text.slice(0, 100),
            updated_at: new Date().toISOString()
          }, ...previous]);
        }
        await saveChatMessage(user.id, currentConversationId, 'user', text);
        setHistoryNotice('');
      } catch {
        canSaveAssistantMessage = false;
        setHistoryNotice('Your message could not be saved to this account. Check the account service and try again.');
      }
    }

    let assistantText: string;
    try {
      assistantText = await getAIResponse(text);
    } catch {
      assistantText = 'I could not generate a response at this moment. Please try again or consult a healthcare professional for urgent concerns.';
    }

    const assistantMessage: ChatMessage = {
      id: `asst-${Date.now()}`,
      sender: 'assistant',
      text: assistantText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    if (user && currentConversationId && canSaveAssistantMessage) {
      try {
        await saveChatMessage(user.id, currentConversationId, 'assistant', assistantText);
        setConversations((previous) => previous.map((conversation) => conversation.id === currentConversationId
          ? { ...conversation, updated_at: new Date().toISOString() }
          : conversation
        ).sort((first, second) => second.updated_at.localeCompare(first.updated_at)));
      } catch {
        setHistoryNotice('The reply is shown, but it could not be saved to your chat history.');
      }
    }

    setMessages((prev) => [...prev, assistantMessage]);
    setIsLoading(false);
    setTimeout(() => inputRef.current?.focus(), 50);
  };

  const handleReset = () => {
    setMessages(user ? [WELCOME_MESSAGE] : INITIAL_MESSAGES);
    setConversationId(null);
    setHistoryNotice('');
    setInputValue('');
  };

  const handleConversationChange = async (nextConversationId: string) => {
    if (!user) return;
    if (!nextConversationId) {
      handleReset();
      return;
    }

    setHistoryLoading(true);
    setHistoryNotice('');
    try {
      const savedMessages = await loadConversationMessages(user.id, nextConversationId);
      setConversationId(nextConversationId);
      setMessages(savedMessages.map((message) => ({
        id: message.id,
        sender: message.sender,
        text: message.content,
        timestamp: new Date(message.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      })));
    } catch {
      setHistoryNotice('This saved conversation could not be loaded. Please try again.');
    } finally {
      setHistoryLoading(false);
    }
  };

  const copyMessage = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className={`w-full flex flex-col bg-white rounded-2xl border border-slate-200/90 shadow-sm overflow-hidden ${
      embedded ? 'h-[620px]' : 'h-[680px]'
    }`}>
      
      {/* Chatbot Header */}
      <div className="bg-slate-900 text-white px-5 py-3.5 flex items-center justify-between border-b border-slate-800">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-blue-600 to-teal-500 flex items-center justify-center text-white shadow-xs">
              <Bot className="w-5 h-5" />
            </div>
            {/* Online Green Status Dot */}
            <span 
              className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-emerald-500 border-2 border-slate-900" 
              title="Online"
              aria-label="Online"
            />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-sm sm:text-base font-bold text-white tracking-tight">
                Digital Medical Assistant
              </h3>
              <span className="text-[10px] font-medium bg-blue-500/20 text-blue-300 border border-blue-400/30 px-2 py-0.5 rounded-full">
                AI Preview
              </span>
            </div>
            <div className="flex items-center gap-1.5 text-xs text-slate-300">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>Online</span>
              <span className="text-slate-500" aria-hidden="true">·</span>
              <span className="text-slate-400">Educational Assistant</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {user && (
            <select
              value={conversationId ?? ''}
              onChange={(event) => void handleConversationChange(event.target.value)}
              disabled={historyLoading || isLoading}
              aria-label="Saved conversations"
              className="max-w-36 rounded-md border border-slate-700 bg-slate-800 px-2 py-1.5 text-xs text-slate-100 disabled:opacity-60"
            >
              <option value="">New conversation</option>
              {conversations.map((conversation) => (
                <option key={conversation.id} value={conversation.id}>{conversation.title}</option>
              ))}
            </select>
          )}
          <button
            onClick={handleReset}
            className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-blue-400"
            title="Reset conversation"
            aria-label="Reset conversation"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Embedded Safety Disclaimer Bar */}
      <div className="bg-blue-50/80 border-b border-blue-100/90 px-4 py-2 text-[11px] sm:text-xs text-blue-900 flex items-center justify-between gap-2">
        <div className="flex items-center gap-2 truncate">
          <ShieldCheck className="w-4 h-4 text-blue-600 shrink-0" />
          <span className="truncate">General health education only. Not medical diagnosis or personalized treatment.</span>
        </div>
        <span className="shrink-0 font-medium text-blue-700">Educational Demo</span>
      </div>

      {/* Messages Scroll Area */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4 bg-slate-50/60">
        {historyLoading && <p className="text-center text-xs text-slate-500">Loading saved conversation...</p>}
        {historyNotice && (
          <p role="status" className="rounded-lg border border-amber-200 bg-amber-50 px-3 py-2 text-xs text-amber-900">
            {historyNotice}
          </p>
        )}
        {messages.map((message) => {
          const isUser = message.sender === 'user';
          return (
            <div
              key={message.id}
              className={`flex items-start gap-3 ${isUser ? 'flex-row-reverse' : 'flex-row'}`}
            >
              {/* Avatar */}
              <div 
                className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 text-xs font-semibold ${
                  isUser 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-white border border-slate-200 text-blue-600 shadow-2xs'
                }`}
              >
                {isUser ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
              </div>

              {/* Message Bubble Container */}
              <div className={`max-w-[85%] sm:max-w-[78%] flex flex-col ${isUser ? 'items-end' : 'items-start'}`}>
                <div
                  className={`relative group rounded-2xl px-4 py-3 text-xs sm:text-sm leading-relaxed shadow-xs ${
                    isUser
                      ? 'bg-blue-600 text-white rounded-tr-xs'
                      : 'bg-white text-slate-800 border border-slate-200/90 rounded-tl-xs'
                  }`}
                >
                  <div className="whitespace-pre-line">{message.text}</div>

                  {!isUser && (
                    <button
                      onClick={() => copyMessage(message.id, message.text)}
                      className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 p-1 text-slate-400 hover:text-slate-700 rounded transition-opacity"
                      title="Copy response"
                      aria-label="Copy response"
                    >
                      {copiedId === message.id ? (
                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                      ) : (
                        <Copy className="w-3.5 h-3.5" />
                      )}
                    </button>
                  )}
                </div>

                {/* Timestamp */}
                <span className="text-[10px] text-slate-400 mt-1 px-1">
                  {message.timestamp}
                </span>
              </div>
            </div>
          );
        })}

        {/* Typing Loading Indicator */}
        {isLoading && (
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-full bg-white border border-slate-200 text-blue-600 flex items-center justify-center shrink-0">
              <Bot className="w-4 h-4" />
            </div>
            <div className="bg-white text-slate-500 border border-slate-200/90 rounded-2xl rounded-tl-xs px-4 py-3 shadow-xs">
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-blue-500 animate-bounce [animation-delay:-0.3s]" />
                <span className="w-2 h-2 rounded-full bg-blue-500 animate-bounce [animation-delay:-0.15s]" />
                <span className="w-2 h-2 rounded-full bg-blue-500 animate-bounce" />
                <span className="text-xs text-slate-500 ml-1.5 font-medium">Assistant is thinking...</span>
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Suggested Questions Quick Row */}
      <div className="bg-slate-100/70 border-t border-slate-200/80 px-4 py-2.5">
        <div className="flex items-center gap-1.5 text-xs text-slate-500 mb-1.5 font-medium">
          <HelpCircle className="w-3.5 h-3.5 text-blue-600" />
          <span>Suggested queries:</span>
        </div>
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          {SUGGESTED_QUESTIONS.map((question, idx) => (
            <button
              key={idx}
              onClick={() => handleSendMessage(question)}
              disabled={isLoading}
              className="text-xs px-3 py-1.5 bg-white hover:bg-blue-50 text-slate-700 hover:text-blue-700 border border-slate-200/90 hover:border-blue-200 rounded-lg transition-colors whitespace-nowrap shadow-2xs disabled:opacity-50 shrink-0"
            >
              {question}
            </button>
          ))}
        </div>
      </div>

      {/* Input Field & Send Button */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSendMessage();
        }}
        className="p-3 sm:p-4 bg-white border-t border-slate-200 flex items-center gap-2"
      >
        <input
          ref={inputRef}
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Ask a health question (e.g. causes of fatigue, sleep habits)..."
          disabled={isLoading || historyLoading}
          className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:outline-hidden focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all"
        />
        <button
          type="submit"
          disabled={!inputValue.trim() || isLoading || historyLoading}
          className="px-4 py-2.5 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-200 text-white disabled:text-slate-400 font-semibold rounded-xl text-xs sm:text-sm flex items-center gap-1.5 transition-colors shadow-xs disabled:cursor-not-allowed shrink-0"
          aria-label="Send message"
        >
          <span>Send</span>
          <Send className="w-4 h-4" />
        </button>
      </form>
    </div>
  );
};
