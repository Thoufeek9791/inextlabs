'use client';
import { motion } from 'motion/react';
import { LucideIcon } from 'lucide-react';

interface MotionCardProps {
  title: string;
  description: string;
  gradient: string;
  Icon: LucideIcon;
  delay?: number;
}

export function MotionCard({ title, description, gradient, Icon, delay = 0 }: MotionCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 60, rotateX: -15 }}
      whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
      transition={{ delay, duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
      viewport={{ once: true }}
      whileHover={{ scale: 1.04, rotateX: 3, rotateY: -3 }}
      whileTap={{ scale: 0.97 }}
      className="w-full"
    >
      <div className="group relative overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-lg transition-all duration-500 hover:shadow-2xl dark:border-gray-800 dark:bg-gray-900">
        {/* Animated gradient glow on hover */}
        <motion.div
          className={`absolute inset-0 bg-gradient-to-r ${gradient} opacity-20 blur-2xl`}
          whileHover={{ opacity: 0.45, scale: 1.1 }}
          transition={{ duration: 0.5 }}
        />

        {/* Banner with floating icon */}
        <div
          className={`relative z-10 flex h-28 items-center justify-center bg-gradient-to-r ${gradient}`}
        >
          <motion.div
            animate={{ y: [0, -6, 0] }}
            transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
          >
            <Icon className="h-14 w-14 text-white drop-shadow-xl" />
          </motion.div>
        </div>

        {/* Content */}
        <div className="relative z-10 p-6">
          <motion.h3
            whileHover={{
              backgroundImage: 'linear-gradient(to right, #6366f1, #a855f7)',
              backgroundClip: 'text',
              color: 'transparent',
            }}
            transition={{ duration: 0.4 }}
            className="mb-2 text-xl font-semibold text-gray-900 dark:text-white"
          >
            {title}
          </motion.h3>
          <p className="text-sm leading-relaxed text-gray-600 dark:text-gray-400">{description}</p>
        </div>
      </div>
    </motion.div>
  );
}
