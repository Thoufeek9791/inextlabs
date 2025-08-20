'use client';
import { useEffect, useState } from 'react';
import { motion } from 'motion/react';

const HeroBackground = () => {
  const particles = Array.from({ length: 25 });
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const [isDark, setIsDark] = useState(false);
  const [windowHeight, setWindowHeight] = useState(800);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setWindowHeight(window.innerHeight);
      setIsDark(document.documentElement.classList.contains('dark'));

      const handleMouseMove = (e: MouseEvent) => {
        setMouse({
          x: e.clientX / window.innerWidth,
          y: e.clientY / window.innerHeight,
        });
      };

      window.addEventListener('mousemove', handleMouseMove);
      return () => window.removeEventListener('mousemove', handleMouseMove);
    }
  }, []);

  return (
    <div className="absolute inset-0 -z-10 overflow-hidden bg-gradient-to-br from-gray-50 via-blue-50 to-white dark:from-gray-900 dark:via-indigo-900 dark:to-black">
      <motion.div
        className="absolute h-[150%] w-[150%] bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 opacity-30 blur-3xl dark:from-indigo-500 dark:via-purple-500 dark:to-pink-500"
        animate={{
          rotate: 360,
          scale: [1, 1.1, 1],
        }}
        transition={{
          rotate: { duration: 40, repeat: Infinity, ease: 'linear' },
          scale: { duration: 20, repeat: Infinity, ease: 'easeInOut' },
        }}
      />

      {particles.map((_, i) => {
        const size = Math.random() * 4 + 3;
        const speed = 12 + Math.random() * 10;

        const lightColors = ['#60A5FA', '#A78BFA', '#F472B6', '#34D399'];
        const darkColors = ['#3B82F6', '#8B5CF6', '#EC4899', '#10B981'];

        const colors = isDark ? darkColors : lightColors;
        const color = colors[Math.floor(Math.random() * colors.length)];

        return (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
              width: size,
              height: size,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              background: `radial-gradient(circle, ${color} 40%, transparent 80%)`,
              boxShadow: `0 0 ${size * 4}px ${color}`,
              filter: 'blur(1px)',
            }}
            animate={{
              y: [Math.random() * windowHeight, -20],
              x: mouse.x * 40 * (i % 2 === 0 ? 1 : -1),
              opacity: [0.2, 0.9, 0.2],
            }}
            transition={{
              duration: speed,
              repeat: Infinity,
              ease: 'linear',
            }}
          />
        );
      })}
    </div>
  );
};

export default HeroBackground;
