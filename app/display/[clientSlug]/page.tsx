import TvBackgroundDecor from '@/components/tv/TvBackgroundDecor';
import TvLayout from '@/components/tv/TvLayout';
import TvMenuGrid, { TvMenuItem } from '@/components/tv/TvMenuGrid';
import TvSpecialsSlider, { TvSpecial } from '@/components/tv/TvSpecialsSlider';
import { getMenuBySlug } from '@/lib/menu';

interface DisplayPageProps {
  params: { clientSlug: string };
}

const formatPrice = (priceCents: number) => `$${(priceCents / 100).toFixed(2)}`;

export default async function DisplayPage({ params }: DisplayPageProps) {
  const menuData = await getMenuBySlug(params.clientSlug);

  if (!menuData) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-brand-background text-foreground">
        <p className="text-lg text-slate-200">Menu not found for this client.</p>
      </main>
    );
  }

  const specials: TvSpecial[] = menuData.specials.map((special) => ({
    ...special,
    priceText: formatPrice(special.priceCents),
  }));

  const items: TvMenuItem[] = menuData.items.map((item) => ({
    id: item.id,
    name: item.name,
    description: item.description,
    priceText: formatPrice(item.priceCents),
  }));

  return (
    <TvLayout
      restaurant={{ name: menuData.client.name, tagline: menuData.client.tagline, logoUrl: menuData.client.logoUrl }}
    >
      <TvBackgroundDecor />
      <section className="relative z-10">
        <TvSpecialsSlider specials={specials} />
      </section>
      <section className="relative z-10">
        <TvMenuGrid items={items} />
      </section>
    </TvLayout>
  );
}
