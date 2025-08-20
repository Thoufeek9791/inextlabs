'use client';
import { motion } from 'motion/react';
import HeroBackground from './ui/HeroBackground';

const Hero = () => {
   const scrollToProducts = () => {
     const section = document.getElementById('products');
     if (section) {
       section.scrollIntoView({ behavior: 'smooth', block: 'start' });
     }
   };
  return (
    <section className="relative flex h-screen flex-col items-center justify-center overflow-hidden text-white">
      <HeroBackground />

      
      <motion.h1
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="mb-6 text-center text-5xl font-bold md:text-6xl"
      >
        Empowering Businesses with the Right AI
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.8 }}
        className="mb-8 max-w-2xl text-center text-lg md:text-xl"
      >
        Generative AI to enhance efficiency, accuracy, and growth.
      </motion.p>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={scrollToProducts}
        className="rounded-full bg-white px-6 py-3 font-semibold text-indigo-600 shadow-lg cursor-pointer"
      >
        Explore Products
      </motion.button>
    </section>
  );
};

export default Hero;
