import { Children, ReactNode } from 'react';

export interface RestaurantInfo {
  name: string;
  tagline: string | null;
  logoUrl: string | null;
}

export interface TvLayoutProps {
  restaurant: RestaurantInfo;
  children: ReactNode;
  alignItems?: 'start' | 'center' | 'end';
  justifyContent?: 'start' | 'center' | 'between';
}

const alignClassMap: Record<NonNullable<TvLayoutProps['alignItems']>, string> = {
  start: 'items-start',
  center: 'items-center',
  end: 'items-end'
};

const justifyClassMap: Record<NonNullable<TvLayoutProps['justifyContent']>, string> = {
  start: 'justify-start',
  center: 'justify-center',
  between: 'justify-between'
};

export default function TvLayout({
  restaurant,
  children,
  alignItems = 'start',
  justifyContent = 'start'
}: TvLayoutProps) {
  const allChildren = Children.toArray(children);
  const decorLayer = allChildren[0];
  const contentChildren = allChildren.slice(1);

  // Primer child = specials, el resto = secciones (grid de menú, etc.)
  const [specialsSection, ...restSections] = contentChildren;

  const initials = restaurant.name
    .split(' ')
    .map((part) => part[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();

  return (
    <main className="relative isolate flex min-h-screen w-full items-center justify-center overflow-hidden bg-gradient-to-br from-[#050816] via-[#050816] to-[#020617] text-slate-100">
      {/* background glow */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(249,115,22,0.14),transparent_32%),radial-gradient(circle_at_80%_30%,rgba(34,197,94,0.14),transparent_28%)]" />
      {decorLayer ? <div className="absolute inset-0 -z-10 opacity-80">{decorLayer}</div> : null}

      {/* Canvas fijo 16:9 pensado para 2560 x 1440 */}
      <div className="relative z-10 box-border w-full max-w-[2560px] aspect-[16/9] px-4 py-6 lg:px-10 lg:py-10">
        <div className="grid h-full grid-cols-1 gap-6 rounded-3xl lg:grid-cols-[0.28fr_0.72fr]">
          {/* PANEL IZQUIERDO – Verde + logo + especiales */}
          <aside className="relative flex h-full flex-col overflow-hidden rounded-3xl bg-gradient-to-b from-[#476c1f] via-[#6d9c26] to-[#fbbf24] p-6 shadow-2xl shadow-black/40 lg:p-10">
            <div className="absolute inset-0 opacity-40 [background-image:radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.22),transparent_38%),radial-gradient(circle_at_70%_60%,rgba(0,0,0,0.12),transparent_40%)]" />
            {/* Top: logo + textos */}
            <div className="relative flex flex-col items-center gap-4 text-center">
              <div className="flex h-28 w-28 items-center justify-center overflow-hidden rounded-full bg-white shadow-2xl shadow-black/40 ring-4 ring-white/60">
                {restaurant.logoUrl ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={restaurant.logoUrl}
                    alt={`${restaurant.name} logo`}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <span className="text-3xl font-black tracking-wide text-[#476c1f]">{initials}</span>
                )}
              </div>
              <div className="space-y-2">
                <p className="text-sm font-semibold uppercase tracking-[0.4em] text-white/80">Restaurant</p>
                <p className="text-5xl font-black italic leading-none tracking-tight text-white drop-shadow-lg">
                  Menu
                </p>
                <h1 className="text-3xl font-extrabold leading-tight drop-shadow-md">{restaurant.name}</h1>
                {restaurant.tagline ? (
                  <p className="text-lg text-white/90">{restaurant.tagline}</p>
                ) : null}
              </div>
            </div>

            {/* Separador flexible */}
            <div className="flex-1" />

            {/* Specials dentro del panel verde */}
            {specialsSection ? (
              <div className="relative mt-6 overflow-hidden rounded-2xl bg-black/15 p-3 shadow-2xl shadow-amber-900/40 backdrop-blur-sm lg:p-4">
                <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_0%,rgba(255,255,255,0.25),transparent_45%)]" />
                <div className="relative">
                  {specialsSection}
                </div>
              </div>
            ) : (
              <div className="relative mt-6 overflow-hidden rounded-2xl bg-black/10 p-4 text-center text-sm text-white/80">
                Today&apos;s specials coming soon
              </div>
            )}
          </aside>

          {/* PANEL DERECHO – Chalkboard con menú */}
          <section className="relative overflow-hidden rounded-3xl border border-white/5 bg-gradient-to-br from-[#060b19]/90 via-[#060914]/90 to-[#04060f]/95 p-6 shadow-[0_24px_80px_-40px_rgba(0,0,0,0.85)] lg:p-8">
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.03),transparent_35%),radial-gradient(circle_at_80%_20%,rgba(249,115,22,0.08),transparent_30%),radial-gradient(circle_at_50%_80%,rgba(34,197,94,0.06),transparent_32%)]" />
            <div className="relative flex h-full flex-col gap-6">
              {/* Header chalkboard */}
              <header className="flex items-center justify-between rounded-2xl bg-white/5 px-4 py-3 backdrop-blur">
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center overflow-hidden rounded-full bg-white/10 ring-2 ring-white/10">
                    {restaurant.logoUrl ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={restaurant.logoUrl}
                        alt={`${restaurant.name} logo`}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <span className="text-lg font-bold text-white">{initials}</span>
                    )}
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-[0.3em] text-brand-primary">Menu</p>
                    <p className="text-lg font-semibold">{restaurant.name}</p>
                  </div>
                </div>
                <div className="text-sm text-slate-300">All prices in USD</div>
              </header>

              {/* Sub header / etiqueta */}
              <div
                className={`flex items-center justify-between rounded-2xl border border-white/5 bg-white/5 px-4 py-3 text-xs font-semibold uppercase tracking-[0.25em] text-white/80 shadow-inner shadow-black/30 ${alignClassMap[alignItems]} ${justifyClassMap[justifyContent]}`}
              >
                <span>Chalkboard Classics</span>
                <span className="hidden md:inline text-[0.65rem] tracking-[0.25em] text-white/60">
                  Signature dishes & combos
                </span>
              </div>

              {/* Contenido de menú (grid, etc.) */}
              <div className="flex-1 overflow-hidden">
                {restSections.map((section, index) => (
                  <div key={index} className="h-full">
                    {section}
                  </div>
                ))}
              </div>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
