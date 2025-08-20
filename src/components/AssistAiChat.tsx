'use client';

import React, { useEffect, useMemo, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Paperclip,
  Send,
  Search,
  Filter,
  Trash2,
  Check,
  CheckCheck,
  Loader2,
  X,
  Image as ImageIcon,
  FileText,
} from 'lucide-react';


type Role = 'user' | 'assistant';

type Attachment = {
  id: string;
  name: string;
  type: string;
  size: number; 
  url: string; 
};

type Message = {
  id: string;
  role: Role;
  text: string;
  at: number; 
  status?: 'sending' | 'sent' | 'delivered' | 'read';
  attachments?: Attachment[];
};

const STORAGE_KEY = 'assistai.chat.v1';

const statusIcon = (status?: Message['status']) => {
  switch (status) {
    case 'sending':
      return <Loader2 className="h-4 w-4 animate-spin opacity-70" />;
    case 'sent':
      return <Check className="h-4 w-4 opacity-70" />;
    case 'delivered':
      return (
        <div className="flex -space-x-1 text-gray-500">
          <Check className="h-4 w-4" />
          <Check className="h-4 w-4" />
        </div>
      );
    case 'read':
      return <CheckCheck className="h-4 w-4 text-indigo-500" />;
    default:
      return null;
  }
};

function formatTime(ts: number) {
  const d = new Date(ts);
  return d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

function fileToAttachment(file: File): Attachment {
  return {
    id: `${file.name}-${file.size}-${file.lastModified}`,
    name: file.name,
    type: file.type || 'application/octet-stream',
    size: file.size,
    url: URL.createObjectURL(file),
  };
}

function humanSize(bytes: number) {
  const units = ['B', 'KB', 'MB', 'GB'];
  let i = 0;
  let n = bytes;
  while (n >= 1024 && i < units.length - 1) {
    n /= 1024;
    i++;
  }
  return `${n.toFixed(1)} ${units[i]}`;
}

function AttachmentBadge({ a }: { a: Attachment }) {
  const isImage = a.type.startsWith('image/');
  return (
    <a
      href={a.url}
      target="_blank"
      rel="noreferrer"
      className="flex items-center gap-2 rounded-lg border border-gray-200 px-2 py-1 text-xs text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:text-gray-200 dark:hover:bg-gray-800"
    >
      {isImage ? <ImageIcon className="h-4 w-4" /> : <FileText className="h-4 w-4" />}
      <span className="max-w-[10rem] truncate" title={a.name}>
        {a.name}
      </span>
      <span className="opacity-60">· {humanSize(a.size)}</span>
    </a>
  );
}

export default function AssistAIChat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [files, setFiles] = useState<Attachment[]>([]);
  const [typing, setTyping] = useState(false);
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState<'all' | 'user' | 'assistant' | 'with-files'>('all');

  const listRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLTextAreaElement | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      try {
        const parsed = JSON.parse(raw) as Message[];
        setMessages(parsed);
      } catch {}
    } else {
      setMessages([
        {
          id: crypto.randomUUID(),
          role: 'assistant',
          text: "Hi! I'm AssistAI. Upload files or ask me anything about them. How can I help today? 😊",
          at: Date.now(),
          status: 'read',
        },
      ]);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
    
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: 'smooth' });
  }, [messages]);

  
  const filtered = useMemo(() => {
    return messages.filter((m) => {
      if (filter === 'user' && m.role !== 'user') return false;
      if (filter === 'assistant' && m.role !== 'assistant') return false;
      if (filter === 'with-files' && !(m.attachments && m.attachments.length)) return false;
      if (!query) return true;
      return m.text.toLowerCase().includes(query.toLowerCase());
    });
  }, [messages, filter, query]);

  const handlePickFiles = () => fileInputRef.current?.click();

  const onFilesSelected = (filesList: FileList | null) => {
    if (!filesList) return;
    const newAtt = Array.from(filesList).slice(0, 6).map(fileToAttachment);
    setFiles((prev) => [...prev, ...newAtt]);
  };

  const handleSend = () => {
    if (!input.trim() && files.length === 0) return;

    
    const userMsg: Message = {
      id: crypto.randomUUID(),
      role: 'user',
      text: input.trim(),
      attachments: files,
      at: Date.now(),
      status: 'sending',
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setFiles([]);

    
    setTimeout(() => updateStatus(userMsg.id, 'sent'), 300);
    setTimeout(() => updateStatus(userMsg.id, 'delivered'), 900);
    setTimeout(() => updateStatus(userMsg.id, 'read'), 1500);

    mockAIResponse(userMsg);
  };

  const updateStatus = (id: string, status: Message['status']) =>
    setMessages((prev) => prev.map((m) => (m.id === id ? { ...m, status } : m)));

  const mockAIResponse = (userMsg: Message) => {
    setTyping(true);
    const delay = 700 + Math.random() * 1200; 

    const canned = generateAIReply(userMsg);

    setTimeout(() => {
      const aiMsg: Message = {
        id: crypto.randomUUID(),
        role: 'assistant',
        text: canned,
        at: Date.now(),
        status: 'sent',
      };
      setMessages((prev) => [...prev, aiMsg]);
      setTyping(false);
      setTimeout(() => updateStatus(aiMsg.id, 'delivered'), 500);
      setTimeout(() => updateStatus(aiMsg.id, 'read'), 900);
    }, delay);
  };

  function generateAIReply(userMsg: Message) {
    const t = userMsg.text.toLowerCase();
    if (userMsg.attachments?.length) {
      const names = userMsg.attachments.map((a) => a.name).join(', ');
      return `Thanks! I\'ve received ${userMsg.attachments.length} file(s): ${names}. I\'ll scan them for key entities and summaries. Ask me anything specific while I process.`;
    }
    if (t.includes('hello') || t.includes('hi')) return 'Hello! How can I assist you today?';
    if (t.includes('summary'))
      return "Upload a file and I'll summarize it into bullet points, action items, and deadlines.";
    if (t.includes('help'))
      return 'You can ask questions, upload PDFs/images, and filter/search messages above. Try attaching a file!';
    return "Got it. I\'m crafting a response based on your message. You can also attach related files for deeper analysis.";
  }

  const onKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const clearChat = () => {
    if (!confirm('Clear conversation?')) return;
    setMessages([]);
    localStorage.removeItem(STORAGE_KEY);
  };

  return (
    <div className="mx-auto flex h-[calc(100vh-8rem)] max-w-5xl flex-col rounded-2xl border border-gray-200 bg-white shadow-xl dark:border-gray-800 dark:bg-gray-900">
      <div className="flex items-center gap-3 border-b border-gray-200 p-4 dark:border-gray-800">
        <div className="h-9 w-9 rounded-xl bg-indigo-600/10 ring-1 ring-indigo-600/20" />
        <div className="flex-1">
          <div className="text-sm font-semibold text-gray-900 dark:text-gray-100">
            inFlow AssistAI
          </div>
          <div className="text-xs text-gray-500 dark:text-gray-400">Chat • Files • Insights</div>
        </div>

        <div className="hidden items-center gap-2 md:flex">
          <div className="flex items-center gap-2 rounded-xl border border-gray-200 px-3 py-2 text-sm dark:border-gray-700">
            <Search className="h-4 w-4 opacity-60" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search messages…"
              className="w-52 bg-transparent outline-none placeholder:text-gray-400"
            />
          </div>
          <div className="flex items-center gap-2 rounded-xl border border-gray-200 px-2 py-2 text-sm dark:border-gray-700">
            <Filter className="h-4 w-4 opacity-60" />
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value as any)}
              className="bg-transparent text-sm outline-none"
            >
              <option value="all">All</option>
              <option value="user">User</option>
              <option value="assistant">AI</option>
              <option value="with-files">With files</option>
            </select>
          </div>
          <button
            onClick={clearChat}
            className="rounded-xl border border-gray-200 px-3 py-2 text-sm hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-800"
            title="Clear conversation"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
      </div>

      <div ref={listRef} className="flex-1 space-y-4 overflow-y-auto p-4">
        <AnimatePresence initial={false}>
          {filtered.map((m) => (
            <motion.div
              key={m.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.2 }}
              className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[85%] rounded-2xl px-4 py-3 shadow-sm md:max-w-[70%] ${
                  m.role === 'user'
                    ? 'bg-indigo-600 text-white'
                    : 'bg-gray-100 text-gray-900 dark:bg-gray-800 dark:text-gray-100'
                }`}
              >
                <div className="text-[15px] leading-relaxed whitespace-pre-wrap">{m.text}</div>

                {m.attachments && m.attachments.length > 0 && (
                  <div
                    className={`mt-3 flex flex-wrap gap-2 ${m.role === 'user' ? 'text-indigo-50' : ''}`}
                  >
                    {m.attachments.map((a) => (
                      <AttachmentBadge key={a.id} a={a} />
                    ))}
                  </div>
                )}

                <div
                  className={`mt-2 flex items-center gap-2 text-xs opacity-70 ${m.role === 'user' ? 'text-indigo-100' : 'text-gray-500'}`}
                >
                  <span>{formatTime(m.at)}</span>
                  <span>•</span>
                  <span className="flex items-center gap-1">{statusIcon(m.status)}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        <AnimatePresence>
          {typing && (
            <motion.div
              key="typing"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              className="flex justify-start"
            >
              <div className="flex items-center gap-2 rounded-2xl bg-gray-100 px-4 py-2 text-gray-700 shadow-sm dark:bg-gray-800 dark:text-gray-200">
                <span className="text-xs">AssistAI is typing</span>
                <motion.span className="flex gap-1">
                  {[0, 1, 2].map((i) => (
                    <motion.span
                      key={i}
                      className="h-1.5 w-1.5 rounded-full bg-current"
                      animate={{ opacity: [0.2, 1, 0.2], y: [0, -2, 0] }}
                      transition={{ duration: 0.9, repeat: Infinity, delay: i * 0.15 }}
                    />
                  ))}
                </motion.span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="border-t border-gray-200 p-4 dark:border-gray-800">
        {files.length > 0 && (
          <div className="mb-3 flex flex-wrap items-center gap-2">
            {files.map((a) => (
              <div key={a.id} className="group relative">
                <AttachmentBadge a={a} />
                <button
                  onClick={() => setFiles((prev) => prev.filter((x) => x.id !== a.id))}
                  className="absolute -top-2 -right-2 rounded-full bg-gray-900/80 p-1 text-white opacity-0 transition group-hover:opacity-100"
                >
                  <X className="h-3 w-3" />
                </button>
              </div>
            ))}
          </div>
        )}

        <div className="flex items-end gap-2">
          <button
            onClick={handlePickFiles}
            className="rounded-xl border border-gray-200 p-2 hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-800"
            title="Attach files"
          >
            <Paperclip className="h-5 w-5" />
          </button>

          <textarea
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={onKeyDown}
            rows={1}
            placeholder="Type a message… (Shift+Enter for newline)"
            className="max-h-40 w-full resize-none rounded-2xl border border-gray-200 bg-transparent p-3 outline-none focus:ring-2 focus:ring-indigo-500 dark:border-gray-700"
          />

          <button
            onClick={handleSend}
            disabled={!input.trim() && files.length === 0}
            className="rounded-2xl bg-indigo-600 px-4 py-3 font-medium text-white shadow-lg transition hover:bg-indigo-700 disabled:opacity-40"
          >
            <div className="flex items-center gap-2">
              <Send className="h-4 w-4" />
              <span className="hidden sm:inline">Send</span>
            </div>
          </button>

          <input
            ref={fileInputRef}
            type="file"
            multiple
            onChange={(e) => onFilesSelected(e.target.files)}
            className="hidden"
          />
        </div>

        <div className="mt-3 flex items-center gap-2 md:hidden">
          <div className="flex flex-1 items-center gap-2 rounded-xl border border-gray-200 px-3 py-2 text-sm dark:border-gray-700">
            <Search className="h-4 w-4 opacity-60" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search…"
              className="w-full bg-transparent outline-none placeholder:text-gray-400"
            />
          </div>
          <div className="flex items-center gap-2 rounded-xl border border-gray-200 px-2 py-2 text-sm dark:border-gray-700">
            <Filter className="h-4 w-4 opacity-60" />
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value as any)}
              className="bg-transparent text-sm outline-none"
            >
              <option value="all">All</option>
              <option value="user">User</option>
              <option value="assistant">AI</option>
              <option value="with-files">With files</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}
