import { ReactNode } from 'react';

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
  return (
    <main className="relative isolate flex min-h-screen w-full flex-col overflow-hidden bg-brand-background text-foreground">
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-slate-900/50 to-slate-950/80" />
      <div className="relative z-10 flex h-full w-full flex-col gap-10 px-10 py-10 lg:px-16">
        <header className="flex items-center gap-6">
          <div className="flex h-20 w-20 items-center justify-center overflow-hidden rounded-2xl bg-slate-800/50 ring-2 ring-brand-primary/40">
            {restaurant.logoUrl ? (
              <img
                src={restaurant.logoUrl}
                alt={`${restaurant.name} logo`}
                className="h-full w-full object-cover"
              />
            ) : (
              <span className="text-2xl font-bold text-brand-primary">{restaurant.name.charAt(0)}</span>
            )}
          </div>
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-brand-primary">Since 2010</p>
            <h1 className="font-heading text-5xl md:text-6xl lg:text-7xl">{restaurant.name}</h1>
            {restaurant.tagline ? <p className="text-lg text-slate-300 md:text-xl">{restaurant.tagline}</p> : null}
          </div>
        </header>

        <div
          className={`flex h-full w-full flex-col gap-8 ${alignClassMap[alignItems]} ${justifyClassMap[justifyContent]}`}
        >
          {children}
        </div>
      </div>
    </main>
  );
}
