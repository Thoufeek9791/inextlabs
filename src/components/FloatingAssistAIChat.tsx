'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle } from 'lucide-react';
import AssistAIChat from '@/components/AssistAiChat';

export default function FloatingAssistAIChat() {
  const [isOpen, setIsOpen] = useState(false);

  
  useEffect(() => {
    const saved = sessionStorage.getItem('assistai-chat-open');
    if (saved === 'true') setIsOpen(true);
  }, []);

  useEffect(() => {
    sessionStorage.setItem('assistai-chat-open', isOpen.toString());
  }, [isOpen]);

  return (
    <div className="fixed right-4 bottom-4 z-50">
      
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="flex h-14 w-14 items-center justify-center rounded-full bg-blue-600 text-white shadow-lg hover:bg-blue-700"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        <MessageCircle size={28} />
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 30 }}
            transition={{ duration: 0.25 }}
            className="absolute right-0 bottom-20 max-h-[90vh] w-[380px] xl:w-[680px] overflow-hidden rounded-2xl border bg-white shadow-xl dark:bg-gray-900"
          >
            <AssistAIChat />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
