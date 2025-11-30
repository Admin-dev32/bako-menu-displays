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

  // Primer hijo = specials, resto = secciones de menú
  const [specialsSection, ...restSections] = contentChildren;

  const initials = restaurant.name
    .split(' ')
    .map((part) => part[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();

  return (
    <main className="relative isolate flex min-h-screen w-full items-center justify-center overflow-hidden bg-black text-slate-100">
      {/* Fondo global con tu imagen 2560x1440 */}
      <div
        className="absolute inset-0 -z-20 bg-cover bg-center"
        style={{
          backgroundImage:
            'url("https://mvtmzeigyjvexppekyti.supabase.co/storage/v1/object/public/menu-images/Artboard%201-100.jpg")'
        }}
      />
      {/* Capa oscura ligera para legibilidad */}
      <div className="pointer-events-none absolute inset-0 -z-10 bg-black/35" />

      {/* Capa decorativa opcional */}
      {decorLayer ? <div className="absolute inset-0 -z-5 opacity-80">{decorLayer}</div> : null}

      {/* Canvas 16:9 centrado (pensado para 2560x1440) */}
      <div className="relative z-10 box-border w-full max-w-[2560px] aspect-[16/9] px-4 py-6 lg:px-10 lg:py-10">
        <div className="grid h-full grid-cols-1 gap-6 rounded-3xl lg:grid-cols-[0.28fr_0.72fr]">
          {/* PANEL IZQUIERDO VERDE */}
          <aside className="relative flex h-full flex-col overflow-hidden rounded-3xl bg-gradient-to-b from-[#476c1f] via-[#6d9c26] to-[#fbbf24] p-6 shadow-2xl shadow-black/40 lg:p-10">
            <div className="absolute inset-0 opacity-40 [background-image:radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.22),transparent_38%),radial-gradient(circle_at_70%_60%,rgba(0,0,0,0.12),transparent_40%)]" />
            <div className="relative flex h-full flex-col gap-6 text-center text-slate-50">
              {/* Logo + título */}
              <div className="flex flex-col items-center gap-4">
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
                  <p className="text-sm font-semibold uppercase tracking-[0.4em] text-white/80">
                    Restaurant
                  </p>
                  <p className="text-5xl font-black italic leading-none tracking-tight text-white drop-shadow-lg">
                    Menu
                  </p>
                  <h1 className="text-3xl font-extrabold leading-tight drop-shadow-md">
                    {restaurant.name}
                  </h1>
                  {restaurant.tagline ? (
                    <p className="text-lg text-white/90">{restaurant.tagline}</p>
                  ) : null}
                </div>
              </div>

              {/* SPECIAL VERTICAL DENTRO DEL PANEL VERDE */}
              {specialsSection ? (
                <div className="flex-1">
                  <div className="h-full">{specialsSection}</div>
                </div>
              ) : null}

              {/* Bloque decorativo debajo */}
              <div className="relative mt-4 overflow-hidden rounded-2xl bg-gradient-to-br from-white/30 via-white/15 to-white/5 p-4 shadow-2xl shadow-amber-800/30">
                <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(255,255,255,0.45),transparent_55%)]" />
                <div className="relative flex h-28 items-center justify-center rounded-xl bg-gradient-to-tr from-amber-200/80 via-amber-100/70 to-amber-50/70 text-4xl drop-shadow-md">
                  <span className="animate-pulse select-none">🌮 🍔 🍟</span>
                </div>
              </div>
            </div>
          </aside>

          {/* PANEL DERECHO: SOLO GRID DE MENÚ, SIN HEADER */}
          <section className="relative overflow-hidden rounded-3xl border border-white/10 bg-black/55 p-4 shadow-[0_24px_80px_-40px_rgba(0,0,0,0.85)] backdrop-blur-sm lg:p-6">
            {/* Dejo un ligero patrón para no perder el look de chalkboard */}
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.06),transparent_38%),radial-gradient(circle_at_80%_80%,rgba(0,0,0,0.55),transparent_45%)]" />
            <div
              className={`relative flex h-full w-full flex-col ${alignClassMap[alignItems]} ${justifyClassMap[justifyContent]}`}
            >
              {restSections.map((section, index) => (
                <div key={index} className="h-full w-full">
                  {section}
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
