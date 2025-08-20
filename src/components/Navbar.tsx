'use client';

import { useState } from 'react';
import { motion } from 'motion/react';
import { Moon, Sun, Menu, X } from 'lucide-react';
import { navLinks } from '@/data/navbar';

export default function Navbar() {
  const [isDark, setIsDark] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const toggleTheme = () => {
    setIsDark(!isDark);
    document.documentElement.classList.toggle('dark');
  };

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="fixed top-0 left-0 z-50 w-full border-b border-gray-200 bg-white/80 backdrop-blur-md dark:border-gray-800 dark:bg-gray-900/80"
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-6 py-4">
        <motion.a
          whileHover={{ scale: 1.05 }}
          href="/"
          className="bg-gradient-to-r from-indigo-500 to-purple-500 bg-clip-text text-2xl font-bold text-transparent"
        >
          INextLabs
        </motion.a>

        <div className="ml-auto hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-sm font-medium text-gray-700 transition hover:text-indigo-500 dark:text-gray-300 dark:hover:text-indigo-400"
            >
              {link.name}
            </a>
          ))}

          <motion.a
            whileHover={{ scale: 1.05 }}
            href="#get-started"
            className="rounded-xl bg-gradient-to-r from-indigo-500 to-purple-500 px-5 py-2 text-sm font-semibold text-white shadow-lg hover:opacity-90"
          >
            Get Started
          </motion.a>
        </div>

        <div className="flex items-center gap-3">
          <motion.button
            whileHover={{ rotate: 20, scale: 1.1 }}
            whileTap={{ scale: 0.9, rotate: -20 }}
            onClick={toggleTheme}
            className="rounded-full bg-gray-200 p-2 text-gray-800 shadow-md dark:bg-gray-700 dark:text-yellow-300"
          >
            {isDark ? <Moon size={20} /> : <Sun size={20} />}
          </motion.button>

          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="rounded-lg p-2 text-gray-700 hover:bg-gray-100 md:hidden dark:text-gray-300 dark:hover:bg-gray-800"
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="flex flex-col items-center gap-6 px-6 py-4 md:hidden"
        >
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-base font-medium text-gray-700 transition hover:text-indigo-500 dark:text-gray-300 dark:hover:text-indigo-400"
              onClick={() => setMobileOpen(false)}
            >
              {link.name}
            </a>
          ))}

          <a
            href="#get-started"
            className="w-full rounded-xl bg-gradient-to-r from-indigo-500 to-purple-500 px-5 py-2 text-center text-sm font-semibold text-white shadow-lg hover:opacity-90"
          >
            Get Started
          </a>
        </motion.div>
      )}
    </motion.nav>
  );
}
