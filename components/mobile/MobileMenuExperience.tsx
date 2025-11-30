'use client';

import { useMemo, useState } from 'react';
import MobileFloatingActions from './MobileFloatingActions';
import MobileLayout from './MobileLayout';
import MobileMenuContent from './MobileMenuContent';
import MobileMenuHeader from './MobileMenuHeader';
import { MobileMenuCategory } from './MobileMenuCategories';
import { MobileMenuItem } from './MobileMenuList';

type CartItem = {
  id: string;
  name: string;
  priceCents: number;
  quantity: number;
};

interface MobileMenuExperienceProps {
  clientSlug: string;
  client: {
    name: string;
    tagline: string | null;
    logoUrl: string | null;
  };
  categories: MobileMenuCategory[];
  items: MobileMenuItem[];
  phoneNumber?: string;
  directionsUrl?: string;
}

const formatPrice = (priceCents: number) => `$${(priceCents / 100).toFixed(2)}`;

export default function MobileMenuExperience({
  clientSlug,
  client,
  categories,
  items,
  phoneNumber,
  directionsUrl,
}: MobileMenuExperienceProps) {
  const [cart, setCart] = useState<Record<string, CartItem>>({});
  const [showCart, setShowCart] = useState(false);
  const [isCheckingOut, setIsCheckingOut] = useState(false);

  const cartItems = useMemo(() => Object.values(cart), [cart]);

  const totalCents = useMemo(
    () => cartItems.reduce((sum, item) => sum + item.priceCents * item.quantity, 0),
    [cartItems]
  );

  const handleAddItem = (item: MobileMenuItem) => {
    setCart((prev) => {
      const existing = prev[item.id];
      const quantity = existing ? existing.quantity + 1 : 1;
      return {
        ...prev,
        [item.id]: {
          id: item.id,
          name: item.name,
          priceCents: item.priceCents,
          quantity,
        },
      };
    });
  };

  const adjustQuantity = (id: string, delta: number) => {
    setCart((prev) => {
      const existing = prev[id];
      if (!existing) return prev;
      const nextQuantity = existing.quantity + delta;
      if (nextQuantity <= 0) {
        const { [id]: _removed, ...rest } = prev;
        return rest;
      }
      return {
        ...prev,
        [id]: { ...existing, quantity: nextQuantity },
      };
    });
  };

  const handleCheckout = async () => {
    if (cartItems.length === 0) return;
    try {
      setIsCheckingOut(true);
      const response = await fetch(`/api/checkout/${clientSlug}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items: cartItems.map((item) => ({ id: item.id, quantity: item.quantity })),
        }),
      });

      if (!response.ok) {
        const error = await response.json().catch(() => ({}));
        throw new Error(error?.error ?? 'Checkout failed');
      }

      const data = await response.json();
      if (data?.url) {
        window.location.href = data.url as string;
      } else {
        throw new Error('Checkout session could not be created');
      }
    } catch (error) {
      console.error('Checkout error', error);
      alert('Unable to start checkout. Please try again.');
    } finally {
      setIsCheckingOut(false);
    }
  };

  return (
    <MobileLayout
      header={<MobileMenuHeader name={client.name} tagline={client.tagline} logoUrl={client.logoUrl} />}
      floatingActions={
        <MobileFloatingActions
          totalCents={totalCents}
          onOpenCart={() => setShowCart(true)}
          hasItems={cartItems.length > 0}
          phoneNumber={phoneNumber}
          directionsUrl={directionsUrl}
        />
      }
    >
      <MobileMenuContent categories={categories} items={items} onAddItem={handleAddItem} />

      {showCart ? (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/60 px-4 pb-10 sm:items-center sm:pb-0">
          <div className="w-full max-w-md rounded-3xl bg-slate-900/95 p-5 shadow-2xl ring-1 ring-white/10 backdrop-blur">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="font-heading text-xl text-foreground">Your Order</h3>
              <button
                type="button"
                onClick={() => setShowCart(false)}
                className="rounded-full px-3 py-1 text-sm font-semibold text-slate-300 transition hover:bg-white/10"
              >
                Close
              </button>
            </div>

            {cartItems.length === 0 ? (
              <p className="text-sm text-slate-300">Your cart is empty.</p>
            ) : (
              <div className="space-y-3">
                {cartItems.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between rounded-2xl bg-white/5 px-4 py-3 ring-1 ring-white/10"
                  >
                    <div className="flex flex-col">
                      <span className="font-semibold text-foreground">{item.name}</span>
                      <span className="text-xs text-slate-400">{formatPrice(item.priceCents)}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-2 rounded-full bg-white/5 px-3 py-1 text-sm font-semibold text-foreground ring-1 ring-white/10">
                        <button
                          type="button"
                          onClick={() => adjustQuantity(item.id, -1)}
                          className="text-lg leading-none text-slate-300 transition hover:text-white"
                        >
                          −
                        </button>
                        <span>{item.quantity}</span>
                        <button
                          type="button"
                          onClick={() => adjustQuantity(item.id, 1)}
                          className="text-lg leading-none text-slate-300 transition hover:text-white"
                        >
                          +
                        </button>
                      </div>
                      <span className="font-semibold text-brand-accent">
                        {formatPrice(item.priceCents * item.quantity)}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}

            <div className="mt-6 flex items-center justify-between">
              <span className="text-sm text-slate-300">Total</span>
              <span className="text-lg font-bold text-brand-accent">{formatPrice(totalCents)}</span>
            </div>

            <button
              type="button"
              onClick={handleCheckout}
              disabled={cartItems.length === 0 || isCheckingOut}
              className="mt-4 w-full rounded-full bg-brand-primary px-5 py-3 text-center text-sm font-semibold text-slate-950 shadow-xl shadow-brand-primary/40 transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isCheckingOut ? 'Processing…' : 'Checkout with Card'}
            </button>
          </div>
        </div>
      ) : null}
    </MobileLayout>
  );
}
