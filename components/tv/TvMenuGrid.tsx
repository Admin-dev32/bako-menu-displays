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
    <div className="w-full rounded-3xl border border-white/10 bg-[rgba(9,12,21,0.75)] p-6 shadow-inner shadow-black/60 ring-1 ring-white/10 md:p-8">
      <div className="mb-6 flex items-center justify-between gap-4">
        <div className="space-y-1">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-brand-primary">Chalkboard Classics</p>
          <h3 className="font-heading text-3xl md:text-4xl">Menu</h3>
        </div>
        <p className="rounded-full bg-white/5 px-4 py-2 text-xs uppercase tracking-[0.2em] text-slate-200">All prices in USD</p>
      </div>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4"
      >
        {items.map((item) => (
          <motion.div
            key={item.id}
            variants={itemVariants}
            className="relative flex flex-col items-center gap-4 rounded-3xl bg-white/5 px-4 pt-6 pb-5 text-center shadow-lg shadow-black/40 backdrop-blur"
          >
            <div className="absolute right-4 top-4 rounded-full bg-emerald-500 px-3 py-1 text-sm font-semibold text-slate-900 shadow-lg shadow-emerald-500/40">
              {item.priceText}
            </div>
            <div className="flex h-20 w-20 items-center justify-center rounded-full border border-white/10 bg-slate-800 text-xl font-bold uppercase text-white shadow-inner shadow-black/40">
              {item.name.charAt(0)}
            </div>
            <div className="space-y-2">
              <h4 className="text-sm font-semibold uppercase tracking-[0.15em] text-white md:text-base">{item.name}</h4>
              <p className="text-xs text-slate-300/90 md:text-sm">{item.description}</p>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
