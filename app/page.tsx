import { BrandShell } from '../components/BrandShell';

export default function Home() {
  return (
    <BrandShell>
      <div className="mx-auto flex max-w-4xl flex-col items-center gap-5 text-center">
        <p className="font-heading text-sm uppercase tracking-[0.35em] text-brand-primary/80">
          Bako Business Branding
        </p>
        <h1 className="font-heading text-4xl tracking-tight text-white sm:text-5xl">
          Bako Business Branding – Menu Display System
        </h1>
        <p className="text-lg text-foreground/85 sm:text-xl">
          Centralized TV + Mobile menus for restaurants, built with Next.js.
        </p>
      </div>
    </BrandShell>
  );
}
