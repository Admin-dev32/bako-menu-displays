'use client';

import { useMemo, useState } from 'react';
import MobileMenuCategories, { MobileMenuCategory } from './MobileMenuCategories';
import MobileMenuList, { MobileMenuItem } from './MobileMenuList';

interface MobileMenuContentProps {
  categories: MobileMenuCategory[];
  items: MobileMenuItem[];
  onAddItem?: (item: MobileMenuItem) => void;
}

export default function MobileMenuContent({ categories, items, onAddItem }: MobileMenuContentProps) {
  const [selectedCategory, setSelectedCategory] = useState(categories[0]?.id ?? 'all');

  const filteredItems = useMemo(() => {
    if (selectedCategory === 'all') return items;
    return items.filter((item) => item.categoryId === selectedCategory);
  }, [items, selectedCategory]);

  return (
    <div className="space-y-4">
      <MobileMenuCategories categories={categories} selected={selectedCategory} onSelect={setSelectedCategory} />
      <MobileMenuList items={filteredItems} onAdd={onAddItem} />
    </div>
  );
}
