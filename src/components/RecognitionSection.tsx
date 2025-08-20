'use client';
import { motion } from 'framer-motion';

const logos = [
  { src: '/images/verify-foundation.jpg', alt: 'Verify Foundation' },
  { src: '/logos/microsoft.png', alt: 'Microsoft Solutions Partner' },
  { src: '/logos/malaysia-digital.png', alt: 'Malaysia Digital' },
  { src: '/logos/imda.png', alt: 'Infocomm Media Development Authority' },
];

export default function RecognitionSection() {
  return (
    <section className="bg-[#060714] py-20">
      <div className="mx-auto max-w-6xl px-6 text-center">
        {/* Title */}
        <motion.h2
          className="text-2xl font-bold text-white md:text-3xl"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          Recognised by the world’s top organizations
        </motion.h2>

        {/* Logos */}
        <div className="mt-12 grid grid-cols-2 items-center gap-10 sm:grid-cols-4">
          {logos.map((logo, index) => (
            <motion.div
              key={index}
              className="flex items-center justify-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15, duration: 0.5 }}
            >
              <motion.img
                src={logo.src}
                alt={logo.alt}
                className="h-10 object-contain opacity-70 grayscale transition duration-300 hover:opacity-100 hover:grayscale-0 sm:h-14"
                whileHover={{ scale: 1.1 }}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
