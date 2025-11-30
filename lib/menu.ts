import { createServiceSupabaseClient } from './db';

export type MenuClient = {
  id: string;
  slug: string;
  name: string;
  logoUrl: string | null;
  tagline: string | null;
  themePrimary?: string | null;
  themeSecondary?: string | null;
};

export type MenuCategory = {
  id: string;
  name: string;
  position: number;
};

export type MenuItem = {
  id: string;
  categoryId: string | null;
  name: string;
  description: string | null;
  priceCents: number;
  imageUrl: string | null;
  isSpecial: boolean;
};

export type MenuData = {
  client: MenuClient;
  categories: MenuCategory[];
  items: MenuItem[];
  specials: MenuItem[];
};

type ClientRow = {
  id: string;
  slug: string;
  name: string;
  logo_url: string | null;
  tagline: string | null;
  theme_primary: string | null;
  theme_secondary: string | null;
};

type CategoryRow = {
  id: string;
  client_id: string;
  name: string;
  position: number;
};

type MenuItemRow = {
  id: string;
  client_id: string;
  category_id: string | null;
  name: string;
  description: string | null;
  price_cents: number;
  image_url: string | null;
  is_special: boolean;
};

export const getMenuBySlug = async (clientSlug: string): Promise<MenuData | null> => {
  const supabase = createServiceSupabaseClient();

  const { data: client, error: clientError } = await supabase
    .from<ClientRow>('clients')
    .select('id, slug, name, logo_url, tagline, theme_primary, theme_secondary')
    .eq('slug', clientSlug)
    .single();

  if (clientError || !client) {
    console.error('Failed to load client for slug', clientSlug, clientError);
    return null;
  }

  const { data: categoriesData, error: categoriesError } = await supabase
    .from<CategoryRow>('menu_categories')
    .select('id, name, position')
    .eq('client_id', client.id)
    .order('position', { ascending: true });

  if (categoriesError) {
    console.error('Failed to load categories for client', client.id, categoriesError);
  }

  const { data: itemsData, error: itemsError } = await supabase
    .from<MenuItemRow>('menu_items')
    .select('id, category_id, name, description, price_cents, image_url, is_special')
    .eq('client_id', client.id)
    .eq('is_visible', true)
    .order('created_at', { ascending: true });

  if (itemsError) {
    console.error('Failed to load menu items for client', client.id, itemsError);
  }

  const categories: MenuCategory[] = (categoriesData || []).map(({ id, name, position }) => ({
    id,
    name,
    position
  }));

  const items: MenuItem[] = (itemsData || []).map(
    ({ id, category_id, name, description, price_cents, image_url, is_special }) => ({
      id,
      categoryId: category_id,
      name,
      description,
      priceCents: price_cents,
      imageUrl: image_url,
      isSpecial: is_special
    })
  );

  const specials: MenuItem[] = items.filter((item) => item.isSpecial);

  return {
    client: {
      id: client.id,
      slug: client.slug,
      name: client.name,
      logoUrl: client.logo_url,
      tagline: client.tagline,
      themePrimary: client.theme_primary,
      themeSecondary: client.theme_secondary
    },
    categories,
    items,
    specials
  };
};
