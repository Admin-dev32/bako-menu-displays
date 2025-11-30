interface MobileFloatingActionsProps {
  totalCents: number;
  onOpenCart: () => void;
  hasItems: boolean;
  phoneNumber?: string;
  directionsUrl?: string;
}

const formatPrice = (priceCents: number) => `$${(priceCents / 100).toFixed(2)}`;

export default function MobileFloatingActions({
  totalCents,
  onOpenCart,
  hasItems,
  phoneNumber = '+15555550123',
  directionsUrl = 'https://maps.example.com',
}: MobileFloatingActionsProps) {
  return (
    <div className="flex flex-col gap-3">
      <button
        type="button"
        onClick={onOpenCart}
        disabled={!hasItems}
        className="flex w-full items-center justify-between rounded-full bg-brand-primary px-5 py-3 text-sm font-semibold text-slate-950 shadow-xl shadow-brand-primary/40 transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-60"
      >
        <span>View Cart / Checkout</span>
        <span>{formatPrice(totalCents)}</span>
      </button>
      <div className="flex items-center justify-end gap-3">
        <a
          href={directionsUrl}
          className="flex-1 rounded-full bg-white/10 px-4 py-3 text-center text-sm font-semibold text-foreground shadow-lg ring-1 ring-white/10 backdrop-blur transition hover:bg-white/15"
          target="_blank"
          rel="noreferrer"
        >
          Get Directions
        </a>
        <a
          href={`tel:${phoneNumber}`}
          className="rounded-full bg-white/10 px-4 py-3 text-sm font-semibold text-foreground shadow-lg ring-1 ring-white/10 backdrop-blur transition hover:bg-white/15"
        >
          Call to Order
        </a>
      </div>
    </div>
  );
}
