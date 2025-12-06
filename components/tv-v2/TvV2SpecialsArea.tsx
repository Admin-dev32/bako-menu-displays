import TvSpecialsSlider, { TvSpecial } from '@/components/tv/TvSpecialsSlider';
import { MenuItem } from '@/lib/menu';

export type TvV2SpecialsAreaProps = {
  specials: MenuItem[];
};

const formatPrice = (priceCents: number) => `$${(priceCents / 100).toFixed(2)}`;

export default function TvV2SpecialsArea({ specials }: TvV2SpecialsAreaProps) {
  if (!specials.length) return null;

  const mappedSpecials: TvSpecial[] = specials.map((special) => ({
    id: special.id,
    name: special.name,
    description: special.description,
    priceText: formatPrice(special.priceCents),
    imageUrl: special.imageUrl,
    badge: special.variantLabel ?? (special.kind && special.kind !== 'single' ? special.kind : undefined)
  }));

  return (
    <div className="h-full w-full">
      <TvSpecialsSlider specials={mappedSpecials} />
    </div>
  );
}
