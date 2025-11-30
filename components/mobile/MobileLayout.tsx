import { ReactNode } from 'react';

interface MobileLayoutProps {
  header: ReactNode;
  children: ReactNode;
  floatingActions?: ReactNode;
}

export default function MobileLayout({ header, children, floatingActions }: MobileLayoutProps) {
  return (
    <main className="min-h-screen w-full bg-brand-background text-foreground">
      <div className="relative mx-auto flex min-h-screen w-full max-w-md flex-col bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
        <div className="sticky top-0 z-30 border-b border-white/5 bg-brand-background/85 px-4 py-4 backdrop-blur sm:px-6">
          {header}
        </div>
        <div className="flex-1 px-4 pb-28 pt-4 sm:px-6 sm:pt-6">{children}</div>
        {floatingActions ? (
          <div className="pointer-events-none fixed inset-x-0 bottom-6 flex justify-center px-4 sm:px-6">
            <div className="pointer-events-auto w-full max-w-md">{floatingActions}</div>
          </div>
        ) : null}
      </div>
    </main>
  );
}
