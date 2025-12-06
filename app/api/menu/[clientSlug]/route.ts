import { NextResponse } from 'next/server';
import { getMenuBySlug } from '@/lib/menu';

interface MenuRouteContext {
  params: { clientSlug: string };
}

export async function GET(_request: Request, { params }: MenuRouteContext) {
  const menuData = await getMenuBySlug(params.clientSlug);

  if (!menuData) {
    return NextResponse.json({ error: 'Client not found' }, { status: 404 });
  }

  return NextResponse.json(menuData);
}
