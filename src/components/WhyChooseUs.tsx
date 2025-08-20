'use client';

import { Shield, Layers, PiggyBank, Bug } from 'lucide-react';
import { motion } from 'framer-motion';

const features = [
  {
    icon: <Layers className="text-primary h-8 w-8" />,
    title: 'All-in-One Solution',
    description: 'A unified AI platform that integrates seamlessly with your workflows.',
  },
  {
    icon: <Shield className="text-primary h-8 w-8" />,
    title: 'Data Security',
    description: 'Protects privacy with data masking, securing PII and sensitive info.',
  },
  {
    icon: <PiggyBank className="text-primary h-8 w-8" />,
    title: 'Cost Efficient',
    description: 'Optimizes with caching, token use, and fine-tuning for savings.',
  },
  {
    icon: <Bug className="text-primary h-8 w-8" />,
    title: 'Hallucination Control',
    description: 'Minimizes errors with advanced detection and correction mechanisms.',
  },
];

export default function WhyChooseUs() {
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
          Why Choose Us
        </motion.h2>

        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="bg-primary mx-auto mt-3 h-1 w-20 origin-left rounded-full"
        />

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          viewport={{ once: true }}
          className="text-muted-foreground mx-auto mt-4 max-w-xl"
        >
          Advanced, Adaptive, and Unmatched in Performance
        </motion.p>

        
        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, index) => (
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
              whileHover={{ scale: 1.05, rotate: 1 }}
              className="border-border bg-card hover:border-primary/50 flex flex-col items-center rounded-2xl border p-6 text-center shadow-md transition-all hover:shadow-lg"
            >
              <motion.div
                whileHover={{ rotate: 10, scale: 1.1 }}
                transition={{ type: 'spring', stiffness: 300 }}
                className="bg-primary/10 mb-4 flex h-16 w-16 items-center justify-center rounded-xl"
              >
                {feature.icon}
              </motion.div>
              <h3 className="text-foreground text-lg font-semibold">{feature.title}</h3>
              <p className="text-muted-foreground mt-2 text-sm leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
