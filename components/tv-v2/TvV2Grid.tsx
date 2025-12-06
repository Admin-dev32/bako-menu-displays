import { MenuItem, DisplayConfig } from '@/lib/menu';

export type TvV2GridProps = {
  items: MenuItem[];
  displayConfig: DisplayConfig;
};

const formatPrice = (priceCents: number) => `$${(priceCents / 100).toFixed(2)}`;

export default function TvV2Grid({ items, displayConfig }: TvV2GridProps) {
  const cols = displayConfig.cols || 3;
  const rows = displayConfig.rows || 3;
  const gridTemplateColumns = `repeat(${cols}, minmax(0, 1fr))`;
  const gridTemplateRows = `repeat(${rows}, minmax(0, 1fr))`;

  return (
    <div
      className="grid gap-4"
      style={{ gridTemplateColumns, gridTemplateRows }}
    >
      {items.map((item) => (
        <article
          key={item.id}
          className="relative flex flex-col justify-between overflow-hidden rounded-3xl border border-white/5 bg-white/5 p-4 shadow-xl shadow-black/40"
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.06),transparent_35%),radial-gradient(circle_at_80%_10%,rgba(34,197,94,0.08),transparent_35%)]" />
          <div className="relative flex items-start justify-between gap-3">
            <div className="flex flex-1 flex-col gap-2">
              <div className="flex items-center gap-2">
                {item.variantLabel ? (
                  <span className="rounded-full bg-brand-primary/20 px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-brand-primary">
                    {item.variantLabel}
                  </span>
                ) : null}
                {item.kind && item.kind !== 'single' ? (
                  <span className="rounded-full bg-brand-accent/20 px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-brand-accent">
                    {item.kind}
                  </span>
                ) : null}
              </div>
              <h3 className="text-lg font-bold uppercase tracking-tight text-white drop-shadow">
                {item.name}
              </h3>
              {item.description ? (
                <p className="text-sm text-slate-300/90">{item.description}</p>
              ) : null}
            </div>
            <div className="flex flex-col items-end gap-2">
              <div className="rounded-full bg-emerald-500 px-4 py-2 text-lg font-extrabold text-slate-900 shadow-lg shadow-emerald-500/40">
                {formatPrice(item.priceCents)}
              </div>
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}
