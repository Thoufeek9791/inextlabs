'use client';
import { MotionCard } from '@/components/ui/MotionCard';
import { Bot, BarChart3, Workflow, Cloud } from 'lucide-react';
import Link from 'next/link';

const products = [
  {
    id: 1,
    name: 'InFlow Docs AI',
    description: 'Smart conversational agent for customer engagement.',
    gradient: 'from-indigo-500 to-purple-500',
    Icon: Bot,
    href: '/products/docsai',
  },
  {
    id: 2,
    name: 'inFlow InsightsAI',
    description: 'Visualize and analyze business data with AI-powered dashboards.',
    gradient: 'from-pink-500 to-rose-500',
    Icon: BarChart3,
    href: '/products/insightsai',
  },
  {
    id: 3,
    name: 'inFlow EngageAI',
    description: 'Automate workflows to save time and boost productivity.',
    gradient: 'from-emerald-500 to-teal-500',
    Icon: Workflow,
    href: '/products/engageai',
  },
  {
    id: 4,
    name: 'inFlow AssistAI',
    description: 'Scalable cloud solutions for your AI workloads.',
    gradient: 'from-orange-500 to-yellow-500',
    Icon: Cloud,
    href: '/products/assistai',
  },
];

export default function ProductsSection() {
  return (
    <section className="bg-white py-16 dark:bg-gray-950" id='products'>
      <div className="container mx-auto px-6">
        <h2 className="mb-12 text-center text-3xl font-bold text-gray-900 md:text-4xl dark:text-white">
          Our Products
        </h2>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {products.map((p, i) => (
            <Link key={p.id} href={p.href} className="group">
              <MotionCard
                title={p.name}
                description={p.description}
                gradient={p.gradient}
                Icon={p.Icon}
                delay={i * 0.15}
              />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
