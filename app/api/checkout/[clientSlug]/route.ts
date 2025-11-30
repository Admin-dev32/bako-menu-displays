import { NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';
import { getMenuBySlug } from '@/lib/menu';
import Stripe from 'stripe';

interface CheckoutRequestItem {
  id: string;
  quantity: number;
}

export async function POST(req: Request, { params }: { params: { clientSlug: string } }) {
  try {
    const body = await req.json();
    const items: CheckoutRequestItem[] | undefined = body?.items;

    if (!Array.isArray(items) || items.length === 0) {
      return NextResponse.json({ error: 'No items provided' }, { status: 400 });
    }

    const invalidItem = items.find((item) => !item.id || typeof item.quantity !== 'number' || item.quantity <= 0);
    if (invalidItem) {
      return NextResponse.json({ error: 'Invalid item payload' }, { status: 400 });
    }

    const menuData = await getMenuBySlug(params.clientSlug);

    if (!menuData) {
      return NextResponse.json({ error: 'Client not found' }, { status: 404 });
    }

    const itemsMap = new Map(menuData.items.map((item) => [item.id, item]));

    const lineItems = items
      .map((payload) => {
        const item = itemsMap.get(payload.id);
        if (!item) return null;

        return {
          quantity: payload.quantity,
          price_data: {
            currency: 'usd',
            unit_amount: item.priceCents,
            product_data: {
              name: item.name,
              description: item.description ?? undefined,
            },
          },
        } satisfies Stripe.Checkout.SessionCreateParams.LineItem;
      })
      .filter(Boolean) as Stripe.Checkout.SessionCreateParams.LineItem[];

    if (lineItems.length === 0) {
      return NextResponse.json({ error: 'No valid items found' }, { status: 400 });
    }

    const successUrl = process.env.STRIPE_SUCCESS_URL;
    const cancelUrl = process.env.STRIPE_CANCEL_URL;

    if (!successUrl || !cancelUrl) {
      return NextResponse.json({ error: 'Stripe redirect URLs are not configured' }, { status: 500 });
    }

    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      line_items: lineItems,
      success_url: successUrl,
      cancel_url: cancelUrl,
    });

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error('Checkout error', error);
    return NextResponse.json({ error: 'Unable to create checkout session' }, { status: 500 });
  }
}
