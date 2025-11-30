'use client';

import { motion, AnimatePresence } from 'framer-motion';

export interface MobileMenuItem {
  id: string;
  name: string;
  description: string | null;
  priceCents: number;
  priceText: string;
  categoryName: string;
  categoryId: string | null;
  imageUrl?: string | null;
}

interface MobileMenuListProps {
  items: MobileMenuItem[];
  onAdd?: (item: MobileMenuItem) => void;
}

const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  show: { opacity: 1, y: 0, transition: { duration: 0.22 } },
  exit: { opacity: 0, y: -8, transition: { duration: 0.15 } },
};

export default function MobileMenuList({ items, onAdd }: MobileMenuListProps) {
  return (
    <div className="space-y-3">
      <AnimatePresence mode="popLayout">
        {items.map((item) => (
          <motion.article
            key={item.id}
            layout
            variants={itemVariants}
            initial="hidden"
            animate="show"
            exit="exit"
            className="flex gap-3 rounded-2xl bg-white/5 p-4 shadow-lg ring-1 ring-white/10 backdrop-blur"
          >
            {item.imageUrl ? (
              <div className="h-16 w-16 shrink-0 overflow-hidden rounded-xl bg-slate-800/60">
                <img src={item.imageUrl} alt="" className="h-full w-full object-cover" />
              </div>
            ) : null}
            <div className="flex flex-1 flex-col gap-2">
              <div className="flex items-start justify-between gap-3">
                <div className="flex flex-col">
                  <h3 className="font-heading text-lg text-foreground">{item.name}</h3>
                  <p className="text-sm text-slate-300">{item.description}</p>
                </div>
                <div className="flex flex-col items-end gap-2">
                  <span className="text-base font-bold text-brand-accent">{item.priceText}</span>
                  <button
                    type="button"
                    onClick={() => onAdd?.(item)}
                    className="rounded-full bg-brand-primary px-3 py-1 text-xs font-semibold text-slate-950 shadow-md shadow-brand-primary/40 transition hover:brightness-110"
                  >
                    Add
                  </button>
                </div>
              </div>
              <span className="text-xs uppercase tracking-[0.18em] text-slate-400">{item.categoryName}</span>
            </div>
          </motion.article>
        ))}
      </AnimatePresence>
    </div>
  );
}
