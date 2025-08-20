'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { logos } from '@/data/trustedby';

export default function TrustedBy() {
  return (
    <section className="bg-background py-20">
      <div className="mx-auto max-w-7xl px-6 text-center">
        <h2 className="text-foreground text-3xl font-bold md:text-4xl">
          Trusted by Leading Companies
        </h2>
        <div className="bg-primary mx-auto mt-3 h-1 w-20 origin-left rounded-full" />

        <div className="relative mt-12 overflow-hidden">
          <motion.div
            className="flex gap-12"
            animate={{ x: ['0%', '-100%'] }}
            transition={{
              repeat: Infinity,
              duration: 20,
              ease: 'linear',
            }}
            whileHover={{ x: 0 }}
          >
            {[...logos, ...logos].map((logo, index) => (
              <div
                key={index}
                className="flex items-center justify-center grayscale transition-all duration-300 hover:grayscale-0"
              >
                <Image
                  src={logo.src}
                  alt={logo.alt}
                  width={120}
                  height={60}
                  className="object-contain"
                />
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
