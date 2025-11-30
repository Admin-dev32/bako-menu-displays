interface MobileMenuHeaderProps {
  name: string;
  tagline: string | null;
  logoUrl: string | null;
}

export default function MobileMenuHeader({ name, tagline, logoUrl }: MobileMenuHeaderProps) {
  return (
    <div className="flex items-center gap-3">
      <div className="flex h-12 w-12 items-center justify-center overflow-hidden rounded-2xl bg-slate-800/60 ring-2 ring-brand-primary/50">
        {logoUrl ? (
          <img src={logoUrl} alt={`${name} logo`} className="h-full w-full object-cover" />
        ) : (
          <span className="text-base font-bold text-brand-primary">{name.charAt(0)}</span>
        )}
      </div>
      <div className="flex flex-col">
        <span className="text-xs font-semibold uppercase tracking-[0.25em] text-brand-primary">QR Menu</span>
        <h1 className="font-heading text-2xl leading-tight text-foreground">{name}</h1>
        {tagline ? <p className="text-sm text-slate-300">{tagline}</p> : null}
      </div>
    </div>
  );
}
