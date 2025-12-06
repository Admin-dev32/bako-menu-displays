'use client';

import { useEffect, useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import TvV2CategoryHeader from './TvV2CategoryHeader';
import TvV2Grid from './TvV2Grid';
import { DisplayConfig, MenuCategory, MenuItem } from '@/lib/menu';

export type TvV2Page = {
  categoryId: string | null;
  categoryName: string;
  items: MenuItem[];
  icon?: string | null;
};

export type TvV2PageRotatorProps = {
  categories: MenuCategory[];
  items: MenuItem[];
  displayConfig: DisplayConfig;
};

const chunkItems = (items: MenuItem[], size: number): MenuItem[][] => {
  if (size <= 0) return [items];
  const chunks: MenuItem[][] = [];
  for (let i = 0; i < items.length; i += size) {
    chunks.push(items.slice(i, i + size));
  }
  return chunks;
};

export default function TvV2PageRotator({ categories, items, displayConfig }: TvV2PageRotatorProps) {
  const capacity = Math.max(1, displayConfig.itemsPerPage ?? displayConfig.rows * displayConfig.cols);

  const pages = useMemo<TvV2Page[]>(() => {
    const orderedCategories = categories.length
      ? [...categories].sort((a, b) => a.position - b.position)
      : [];

    const categorizedPages: TvV2Page[] = [];

    const addPagesForGroup = (categoryId: string | null, categoryName: string, groupItems: MenuItem[]) => {
      if (!groupItems.length) return;
      const chunks = chunkItems(groupItems, capacity);
      chunks.forEach((chunk, index) => {
        categorizedPages.push({
          categoryId,
          categoryName: chunks.length > 1 ? `${categoryName} (${index + 1})` : categoryName,
          items: chunk,
          icon: undefined
        });
      });
    };

    if (orderedCategories.length) {
      orderedCategories.forEach((category) => {
        const groupItems = items.filter((item) => item.categoryId === category.id);
        addPagesForGroup(category.id, category.name, groupItems);
      });
      const uncategorized = items.filter((item) => !item.categoryId);
      addPagesForGroup(null, 'Uncategorized', uncategorized);
    } else {
      addPagesForGroup(null, 'Menu', items);
    }

    return categorizedPages;
  }, [capacity, categories, items]);

  const [currentPageIndex, setCurrentPageIndex] = useState(0);
  const hasMultiplePages = pages.length > 1;
  const rotateMs = displayConfig.rotateMs ?? 12000;

  useEffect(() => {
    if (!hasMultiplePages) return undefined;
    const interval = setInterval(() => {
      setCurrentPageIndex((prev) => (prev + 1) % pages.length);
    }, rotateMs);
    return () => clearInterval(interval);
  }, [hasMultiplePages, pages.length, rotateMs]);

  useEffect(() => {
    setCurrentPageIndex(0);
  }, [pages.length]);

  const currentPage = pages[currentPageIndex] ?? pages[0];

  if (!currentPage) {
    return (
      <div className="flex h-full items-center justify-center rounded-3xl border border-white/5 bg-white/5/50 p-6 text-slate-200">
        No items available.
      </div>
    );
  }

  return (
    <div className="relative h-full overflow-hidden rounded-3xl border border-white/5 bg-[#0b1020]/70 p-6 shadow-2xl shadow-black/50">
      <AnimatePresence mode="wait">
        <motion.div
          key={`${currentPage.categoryId ?? 'all'}-${currentPageIndex}`}
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -24 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="flex h-full flex-col"
        >
          <TvV2CategoryHeader categoryName={currentPage.categoryName} icon={currentPage.icon} />
          <div className="flex-1 overflow-hidden">
            <TvV2Grid items={currentPage.items} displayConfig={displayConfig} />
          </div>
          {hasMultiplePages ? (
            <div className="mt-4 flex items-center justify-end gap-2 text-xs text-slate-300/80">
              {pages.map((page, index) => (
                <span
                  key={`${page.categoryId ?? 'all'}-${index}`}
                  className={`h-2 w-8 rounded-full transition ${
                    index === currentPageIndex ? 'bg-brand-primary' : 'bg-white/15'
                  }`}
                />
              ))}
            </div>
          ) : null}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
