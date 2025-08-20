'use client';
import { useParams } from 'next/navigation';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { CheckCircle, ChevronDown } from 'lucide-react';
import { useState } from 'react';
import { Testimonials } from '@/components/Testimonials';
import { productData } from '@/data/products';

export default function ProductPage() {
  const { product } = useParams();
  console.log('Product:', product);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  

  const productInfo = productData[product as string];

  if (!productInfo) {
    return <div className="p-10 text-center">❌ Product not found</div>;
  }

  const faqs = [
    {
      q: `What is ${productInfo.name}?`,
      a: `${productInfo.name} is an AI-powered solution designed to streamline your workflows.`,
    },
    {
      q: 'Is my data secure?',
      a: 'Yes, it uses enterprise-grade encryption and complies with global privacy standards.',
    },
  ];

  return (
    <div className="bg-white text-gray-900 dark:bg-gray-950 dark:text-gray-100">
      {/* Hero Section */}
      <section className="mx-auto flex max-w-7xl flex-col items-center gap-12 px-6 py-24 lg:flex-row">
        <motion.div
          initial={{ x: -80, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.7 }}
          className="flex-1 space-y-6"
        >
          <h1 className="text-5xl leading-tight font-extrabold">
            inFlow <br />
            <span className="text-indigo-600">{productInfo.name}</span>
          </h1>
          <p className="max-w-xl text-lg text-gray-600 dark:text-gray-300">{productInfo.tagline}</p>
          <motion.a
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            href="#features"
            className="inline-block rounded-xl bg-gradient-to-r from-indigo-500 to-purple-500 px-6 py-3 font-semibold text-white shadow-lg"
          >
            Explore Features
          </motion.a>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, duration: 0.7 }}
          className="flex-1"
        >
          <Image
            src={productInfo.heroImage}
            alt={`${productInfo.name} Illustration`}
            width={600}
            height={400}
            className="rounded-2xl shadow-2xl"
          />
        </motion.div>
      </section>

      <section id="features" className="bg-gray-50 py-20 dark:bg-gray-900">
        <div className="mx-auto max-w-6xl px-6 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-12 text-3xl font-bold md:text-4xl"
          >
            Core Capabilities
          </motion.h2>
          <div className="grid grid-cols-1 gap-10 md:grid-cols-3">
            {productInfo.features.map((feat: string, idx: number) => (
              <motion.div
                key={feat}
                whileHover={{ y: -10, scale: 1.05 }}
                transition={{ type: 'spring', stiffness: 200 }}
                className="rounded-2xl bg-white p-6 shadow-lg dark:bg-gray-800"
              >
                <CheckCircle className="mb-4 h-10 w-10 text-indigo-500" />
                <h3 className="mb-2 text-xl font-semibold">{feat}</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Effortlessly extract and verify critical data at scale.
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-20 dark:bg-gray-950">
        <div className="mx-auto max-w-7xl px-6 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-12 text-3xl font-bold md:text-4xl"
          >
            Speed every process with intelligent document processing
          </motion.h2>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
            {[
              {
                title: 'Intelligent Data Extraction',
                desc: 'Extract, analyze, and organize data from invoices, contracts, policies, and more.',
                icon: '📄',
              },
              {
                title: 'AI-Powered Automation',
                desc: 'Reduce manual work and eliminate errors with AI-driven automation.',
                icon: '🤖',
              },
              {
                title: 'Faster Compliance',
                desc: 'Accelerate compliance, onboarding, and decision-making across teams.',
                icon: '✅',
              },
              {
                title: 'Flexible and Secure Deployment',
                desc: 'Deploy securely in any environment—cloud or on-prem.',
                icon: '🔒',
              },
            ].map((item, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -8, scale: 1.03 }}
                transition={{ type: 'spring', stiffness: 200 }}
                className="rounded-2xl bg-gray-50 p-6 shadow-md dark:bg-gray-900"
              >
                <div className="mb-4 text-4xl">{item.icon}</div>
                <h3 className="mb-2 text-lg font-semibold">{item.title}</h3>
                <p className="text-gray-600 dark:text-gray-300">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-gray-50 py-20 dark:bg-gray-900">
        <div className="mx-auto max-w-7xl px-6">
          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-12 text-center text-3xl font-bold md:text-4xl"
          >
            Everything you need to automate document workflows
          </motion.h2>

          <div className="grid grid-cols-1 gap-10 md:grid-cols-2">
            {/* Left Side - Features */}
            <div className="space-y-8">
              {[
                {
                  title: 'Data Governance Framework',
                  desc: 'Ensure data integrity, access control, and audit readiness.',
                  icon: '🛡️',
                },
                {
                  title: 'Multi-Source Connectors',
                  desc: 'Seamlessly connect with data from drives, databases, or APIs.',
                  icon: '🔗',
                },
                {
                  title: 'Advanced RAG (Retrieval-Augmented Generation)',
                  desc: 'Enable context-aware document understanding and responses.',
                  icon: '📚',
                },
                {
                  title: 'Intelligent Data Pre-processing',
                  desc: 'Clean, structure, and optimize raw data for accurate AI extraction.',
                  icon: '⚙️',
                },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  whileHover={{ scale: 1.03 }}
                  transition={{ type: 'spring', stiffness: 200 }}
                  className="flex items-start gap-4 rounded-xl bg-white p-6 shadow-md dark:bg-gray-800"
                >
                  <div className="text-3xl">{item.icon}</div>
                  <div>
                    <h3 className="text-lg font-semibold">{item.title}</h3>
                    <p className="text-gray-600 dark:text-gray-300">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.7 }}
              className="flex items-center justify-center"
            >
              <Image
                src="/images/documents.jpg"
                alt="Document Workflow Illustration"
                width={600}
                height={400}
                className="rounded-2xl shadow-2xl"
              />
            </motion.div>
          </div>
        </div>
      </section>

      <Testimonials />

      <section className="py-20">
        <div className="mx-auto max-w-4xl px-6">
          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-10 text-center text-3xl font-bold md:text-4xl"
          >
            Frequently Asked Questions
          </motion.h2>
          <div className="space-y-6">
            {faqs.map((faq, i) => (
              <motion.div
                key={i}
                whileHover={{ scale: 1.01 }}
                className="rounded-xl bg-white shadow-md dark:bg-gray-800"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="flex w-full items-center justify-between p-5 text-left font-medium"
                >
                  {faq.q}
                  <ChevronDown
                    className={`transition-transform ${openFaq === i ? 'rotate-180' : ''}`}
                  />
                </button>
                {openFaq === i && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    transition={{ duration: 0.3 }}
                    className="px-5 pb-5 text-gray-600 dark:text-gray-300"
                  >
                    {faq.a}
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
