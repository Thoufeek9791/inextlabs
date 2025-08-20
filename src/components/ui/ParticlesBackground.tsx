'use client';
import { motion } from 'motion/react';

const ParticlesBackground = () => {
  const particles = Array.from({ length: 20 });

  return (
    <div className="absolute inset-0 -z-10 overflow-hidden bg-gray-950">
      {particles.map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 bg-white rounded-full opacity-30"
          initial={{
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight
          }}
          animate={{
            y: [Math.random() * window.innerHeight, -20],
            opacity: [0.2, 0.8, 0.2]
          }}
          transition={{
            duration: 10 + Math.random() * 10,
            repeat: Infinity,
            ease: 'linear'
          }}
        />
      ))}
    </div>
  );
};

export default ParticlesBackground;
