'use client';

import { motion } from 'framer-motion';

export interface TvMenuItem {
  id: string;
  name: string;
  description: string | null;
  priceText: string;
}

interface TvMenuGridProps {
  items: TvMenuItem[];
}

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.2
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { ease: 'easeOut', duration: 0.4 } }
};

export default function TvMenuGrid({ items }: TvMenuGridProps) {
  if (!items?.length) return null;

  return (
    <div className="w-full rounded-3xl border border-white/5 bg-slate-900/50 p-8 shadow-inner ring-1 ring-white/10 md:p-10">
      <div className="mb-6 flex items-baseline justify-between gap-4">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-brand-primary">Menu</p>
          <h3 className="font-heading text-3xl md:text-4xl">Signature Items</h3>
        </div>
        <p className="text-sm text-slate-400">All prices in USD</p>
      </div>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3"
      >
        {items.map((item) => (
          <motion.div
            key={item.id}
            variants={itemVariants}
            className="flex flex-col gap-3 rounded-2xl bg-slate-800/40 p-5 shadow-lg backdrop-blur"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <h4 className="font-heading text-2xl leading-snug md:text-3xl">{item.name}</h4>
                <p className="text-base text-slate-300 md:text-lg">{item.description}</p>
              </div>
              <span className="text-2xl font-bold text-brand-accent md:text-3xl">{item.priceText}</span>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
