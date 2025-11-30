import type { Metadata } from 'next';
import { Bebas_Neue, Inter } from 'next/font/google';
import ServiceWorkerRegister from '../components/ServiceWorkerRegister';
import './globals.css';

const displayFont = Bebas_Neue({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-heading'
});

const bodyFont = Inter({
  subsets: ['latin'],
  variable: '--font-body'
});

export const metadata: Metadata = {
  title: 'Menu Displays',
  description: 'Digital menu display system for restaurants',
  manifest: '/manifest.webmanifest'
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${bodyFont.variable} ${displayFont.variable} min-h-screen w-full bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-foreground antialiased font-sans`}
      >
        <ServiceWorkerRegister />
        {children}
      </body>
    </html>
  );
}
