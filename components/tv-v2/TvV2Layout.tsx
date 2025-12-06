import TvV2PageRotator from './TvV2PageRotator';
import TvV2SpecialsArea from './TvV2SpecialsArea';
import { DEFAULT_DISPLAY_CONFIG, DisplayConfig, MenuData } from '@/lib/menu';

export type TvV2LayoutProps = {
  menu: MenuData;
};

const getThemeColors = (config?: DisplayConfig) => {
  const primary = config?.themeOverrides?.primary ?? '#f97316';
  const secondary = config?.themeOverrides?.secondary ?? '#22c55e';
  const background = config?.themeOverrides?.background ?? '#050816';
  return { primary, secondary, background };
};

export default function TvV2Layout({ menu }: TvV2LayoutProps) {
  const { client, categories, items, specials } = menu;
  const displayConfig = menu.displayConfig ?? DEFAULT_DISPLAY_CONFIG;
  const { primary, secondary, background } = getThemeColors(displayConfig);

  const specialsArea = displayConfig.specialsArea ?? 'side';

  return (
    <main
      className="min-h-screen w-full bg-slate-950 text-slate-50"
      style={{ background: `radial-gradient(circle at 20% 20%, rgba(249,115,22,0.08), transparent 25%), ${background}` }}
    >
      <div className="mx-auto flex min-h-screen w-full max-w-[1920px] flex-col gap-6 px-6 py-6 lg:px-10 lg:py-8">
        <header className="flex items-center justify-between rounded-3xl border border-white/5 bg-white/5 px-6 py-4 shadow-lg shadow-black/40">
          <div className="flex items-center gap-4">
            <div
              className="flex h-16 w-16 items-center justify-center overflow-hidden rounded-full bg-white/10 ring-2 ring-white/15"
              style={{ boxShadow: `0 10px 40px -20px ${secondary}` }}
            >
              {client.logoUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={client.logoUrl} alt={`${client.name} logo`} className="h-full w-full object-cover" />
              ) : (
                <span className="text-2xl font-black text-white">{client.name.slice(0, 2).toUpperCase()}</span>
              )}
            </div>
            <div>
              <p
                className="text-xs uppercase tracking-[0.35em]"
                style={{ color: primary }}
              >
                Signature Menu
              </p>
              <h1 className="text-3xl font-extrabold leading-tight text-white drop-shadow-md">{client.name}</h1>
              {client.tagline ? <p className="text-sm text-slate-200">{client.tagline}</p> : null}
            </div>
          </div>
          <div className="flex items-center gap-3 text-sm text-slate-200">
            <span className="inline-flex h-2 w-2 rounded-full" style={{ backgroundColor: secondary }} />
            Freshly prepared · Rotating highlights
          </div>
        </header>

        {specialsArea === 'top' ? (
          <section className="grid grid-cols-1 gap-4">
            <TvV2SpecialsArea specials={specials} />
          </section>
        ) : null}

        <div
          className={`grid flex-1 gap-6 ${
            specialsArea === 'side' ? 'grid-cols-1 lg:grid-cols-[0.36fr_0.64fr]' : 'grid-cols-1'
          }`}
        >
          {specialsArea === 'side' ? (
            <div className="rounded-3xl border border-white/5 bg-white/5 p-4 shadow-lg shadow-black/40">
              <TvV2SpecialsArea specials={specials} />
            </div>
          ) : null}

          <div className="rounded-3xl border border-white/5 bg-gradient-to-b from-white/5 via-white/5 to-white/0 p-4 shadow-2xl shadow-black/50">
            <TvV2PageRotator categories={categories} items={items} displayConfig={displayConfig} />
          </div>
        </div>
      </div>
    </main>
  );
}
