'use client';

import { solutions } from '@/data/solutions';
import { motion } from 'framer-motion';
import Image from 'next/image';

export default function Solutions() {
  return (
    <section className="bg-background py-20">
      <div className="mx-auto max-w-7xl px-6 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-foreground text-3xl font-bold md:text-4xl"
        >
          Intelligent AI Solutions Suite
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="text-muted-foreground mt-3 text-lg"
        >
          Driving Smart Decisions for Your Enterprise
        </motion.p>

        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          viewport={{ once: true }}
          className="bg-primary mx-auto mt-3 h-1 w-24 origin-left rounded-full"
        />

        <div className="mt-14 grid gap-8 md:grid-cols-3">
          {solutions.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              transition={{
                duration: 0.7,
                delay: index * 0.2,
                type: 'spring',
                stiffness: 80,
              }}
              viewport={{ once: true }}
              whileHover={{
                scale: 1.03,
                boxShadow: '0px 10px 30px rgba(0,0,0,0.15)',
              }}
              className="group border-border bg-card hover:border-primary overflow-hidden rounded-2xl border shadow-md transition-all"
            >
              <div className="overflow-hidden">
                <motion.div whileHover={{ scale: 1.1 }} transition={{ duration: 0.4 }}>
                  <Image
                    src={item.image}
                    alt={item.title}
                    width={500}
                    height={300}
                    className="h-56 w-full object-cover"
                  />
                </motion.div>
              </div>

              <div className="p-6 text-left">
                <h3 className="text-foreground group-hover:text-primary text-xl font-semibold transition-colors">
                  {item.title}
                </h3>
                <p className="text-muted-foreground mt-3 text-sm leading-relaxed">
                  {item.description}
                </p>
                <motion.a
                  href={item.link}
                  whileHover={{ x: 5 }}
                  className="text-primary mt-4 inline-block font-medium"
                >
                  Explore →
                </motion.a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
