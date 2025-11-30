# Bako Menu Display System

## Description
Bako Menu Display System delivers a digital-first restaurant experience with two primary surfaces: a full-screen TV display optimized for Android TV boxes and a mobile QR menu for guests. Menus are centrally stored in Supabase (PostgreSQL), enabling consistent, client-specific content across TV and mobile views. Optional Stripe Checkout powers online orders, while the TV view uses a service worker to cache the last known menu for reliable offline playback.

## Tech Stack
- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- Framer Motion
- Supabase (PostgreSQL)
- Stripe
- PWA / Service Worker

## Features
- **TV display:** Non-interactive, full-screen layout with animated specials banner and menu grid designed for readability at distance.
- **Mobile menu:** Interactive QR experience with category browsing, scrollable items, and cart/checkout flow.
- **Centralized menu data:** Client-specific menus resolved by slug via Supabase.
- **Offline caching:** Service worker caches `/display/[clientSlug]` and related menu JSON for last-known offline viewing.
- **Stripe checkout:** Optional card payments for mobile orders via Stripe Checkout sessions.

## Setup Instructions
1. Create a Supabase project and run `supabase-schema.sql` to create tables.
2. Create a `.env.local` file based on `.env.example` and fill in Supabase + Stripe keys.
3. Install dependencies: `npm install`.
4. Run the dev server: `npm run dev`.
5. Insert a demo client and menu in Supabase with slug `demo-client`.
6. Test locally:
   - TV display: `http://localhost:3000/display/demo-client`
   - Mobile menu: `http://localhost:3000/m/demo-client`

## Deployment
- Vercel is the primary deployment target; set required environment variables in the Vercel dashboard.
- The PWA manifest and service worker live in `public/` and enable offline caching for the TV display.
