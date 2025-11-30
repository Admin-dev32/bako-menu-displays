'use client';

import { motion } from 'framer-motion';

export interface MobileMenuCategory {
  id: string;
  name: string;
}

interface MobileMenuCategoriesProps {
  categories: MobileMenuCategory[];
  selected: string;
  onSelect: (category: string) => void;
}

export default function MobileMenuCategories({ categories, selected, onSelect }: MobileMenuCategoriesProps) {
  return (
    <div className="relative">
      <div className="flex items-center gap-2 overflow-x-auto pb-3">
        {categories.map((category) => {
          const isActive = category.id === selected;
          return (
            <button
              key={category.id}
              type="button"
              onClick={() => onSelect(category.id)}
              className="relative rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold text-foreground transition-colors hover:border-brand-primary/60 focus:outline-none focus:ring-2 focus:ring-brand-primary/60"
            >
              {isActive ? (
                <motion.span
                  layoutId="pill"
                  className="absolute inset-0 -z-10 rounded-full bg-brand-primary/20"
                  transition={{ type: 'spring', stiffness: 260, damping: 22 }}
                />
              ) : null}
              {category.name}
            </button>
          );
        })}
      </div>
    </div>
  );
}
