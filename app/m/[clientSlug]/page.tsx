import MobileMenuExperience from '@/components/mobile/MobileMenuExperience';
import { MobileMenuCategory } from '@/components/mobile/MobileMenuCategories';
import { MobileMenuItem } from '@/components/mobile/MobileMenuList';
import { getMenuBySlug } from '@/lib/menu';

interface MobileMenuPageProps {
  params: { clientSlug: string };
}

const formatPrice = (priceCents: number) => `$${(priceCents / 100).toFixed(2)}`;

export default async function MobileMenuPage({ params }: MobileMenuPageProps) {
  const menuData = await getMenuBySlug(params.clientSlug);

  if (!menuData) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-brand-background text-foreground">
        <p className="text-lg text-slate-200">Menu not found for this client.</p>
      </main>
    );
  }

  const categories: MobileMenuCategory[] = [
    { id: 'all', name: 'All' },
    ...menuData.categories.map((category) => ({
      id: category.id,
      name: category.name,
    })),
  ];

  const items: MobileMenuItem[] = menuData.items.map((item) => {
    const category = menuData.categories.find((cat) => cat.id === item.categoryId);
    return {
      id: item.id,
      name: item.name,
      description: item.description,
      priceCents: item.priceCents,
      priceText: formatPrice(item.priceCents),
      categoryName: category?.name ?? 'All',
      categoryId: item.categoryId ?? 'all',
      imageUrl: item.imageUrl,
    };
  });

  return (
    <MobileMenuExperience
      clientSlug={params.clientSlug}
      client={{
        name: menuData.client.name,
        tagline: menuData.client.tagline,
        logoUrl: menuData.client.logoUrl,
      }}
      categories={categories}
      items={items}
    />
  );
}
