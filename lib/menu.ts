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
  kind?: 'single' | 'combo' | 'addon';
  variantLabel?: string | null;
};

export type DisplayConfig = {
  rows: number;
  cols: number;
  rotateMs?: number;
  specialsArea?: 'top' | 'side' | 'none';
  itemsPerPage?: number;
  themeOverrides?: {
    primary?: string;
    secondary?: string;
    background?: string;
  };
};

export const DEFAULT_DISPLAY_CONFIG: DisplayConfig = {
  rows: 3,
  cols: 3,
  rotateMs: 12000,
  specialsArea: 'side'
};

export type MenuData = {
  client: MenuClient;
  categories: MenuCategory[];
  items: MenuItem[];
  specials: MenuItem[];
  displayConfig?: DisplayConfig;
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
  kind: string | null;
  variant_label: string | null;
  is_special: boolean;
};

type DisplayConfigRow = {
  layout_config: unknown;
};

const parseSpecialsArea = (value: unknown): DisplayConfig['specialsArea'] => {
  if (value === 'top' || value === 'side' || value === 'none') {
    return value;
  }
  return DEFAULT_DISPLAY_CONFIG.specialsArea;
};

const toPositiveInteger = (value: unknown, fallback: number): number => {
  const parsed = Number(value);
  if (Number.isInteger(parsed) && parsed > 0) {
    return parsed;
  }
  return fallback;
};

const mergeDisplayConfig = (layoutConfig: unknown): DisplayConfig => {
  if (!layoutConfig || typeof layoutConfig !== 'object') {
    return DEFAULT_DISPLAY_CONFIG;
  }

  const config = layoutConfig as Partial<DisplayConfig & { itemsPerPage?: unknown; rows?: unknown; cols?: unknown }>; // allow unknown inputs

  const rows = toPositiveInteger(config.rows, DEFAULT_DISPLAY_CONFIG.rows);
  const cols = toPositiveInteger(config.cols, DEFAULT_DISPLAY_CONFIG.cols);
  const rotateMs = config.rotateMs && toPositiveInteger(config.rotateMs, DEFAULT_DISPLAY_CONFIG.rotateMs ?? 0);
  const itemsPerPage = config.itemsPerPage && toPositiveInteger(config.itemsPerPage, rows * cols);

  const themeOverrides =
    config.themeOverrides && typeof config.themeOverrides === 'object'
      ? {
          primary: (config.themeOverrides as Record<string, unknown>).primary as string | undefined,
          secondary: (config.themeOverrides as Record<string, unknown>).secondary as string | undefined,
          background: (config.themeOverrides as Record<string, unknown>).background as string | undefined
        }
      : undefined;

  return {
    ...DEFAULT_DISPLAY_CONFIG,
    rows,
    cols,
    rotateMs: rotateMs || DEFAULT_DISPLAY_CONFIG.rotateMs,
    itemsPerPage: itemsPerPage || undefined,
    specialsArea: parseSpecialsArea(config.specialsArea),
    themeOverrides: themeOverrides || DEFAULT_DISPLAY_CONFIG.themeOverrides
  };
};

const normalizeMenuItemKind = (value: string | null): MenuItem['kind'] => {
  if (value === 'single' || value === 'combo' || value === 'addon') {
    return value;
  }
  return undefined;
};

export const getMenuBySlug = async (clientSlug: string): Promise<MenuData | null> => {
  const supabase = createServiceSupabaseClient();

  const { data: client, error: clientError } = await supabase
    .from('clients')
    .select('id, slug, name, logo_url, tagline, theme_primary, theme_secondary')
    .eq('slug', clientSlug)
    .single();

  if (clientError || !client) {
    console.error('Failed to load client for slug', clientSlug, clientError);
    return null;
  }

  const { data: categoriesData, error: categoriesError } = await supabase
    .from('menu_categories')
    .select('id, name, position')
    .eq('client_id', client.id)
    .order('position', { ascending: true });

  if (categoriesError) {
    console.error('Failed to load categories for client', client.id, categoriesError);
  }

  const { data: itemsData, error: itemsError } = await supabase
    .from('menu_items')
    .select('id, category_id, name, description, price_cents, image_url, is_special, kind, variant_label')
    .eq('client_id', client.id)
    .eq('is_visible', true)
    .order('created_at', { ascending: true });

  if (itemsError) {
    console.error('Failed to load menu items for client', client.id, itemsError);
  }

  const { data: displayConfigData, error: displayConfigError } = await supabase
    .from('display_configs')
    .select('layout_config')
    .eq('client_id', client.id)
    .order('created_at', { ascending: true })
    .limit(1)
    .maybeSingle();

  if (displayConfigError) {
    console.error('Failed to load display config for client', client.id, displayConfigError);
  }

  const categories: MenuCategory[] = (categoriesData || []).map(({ id, name, position }) => ({
    id,
    name,
    position
  }));

  const items: MenuItem[] = (itemsData || []).map(
    ({ id, category_id, name, description, price_cents, image_url, is_special, kind, variant_label }) => ({
      id,
      categoryId: category_id,
      name,
      description,
      priceCents: price_cents,
      imageUrl: image_url,
      isSpecial: is_special,
      kind: normalizeMenuItemKind(kind),
      variantLabel: variant_label
    })
  );

  const specials: MenuItem[] = items.filter((item) => item.isSpecial);

  const displayConfig: DisplayConfig = mergeDisplayConfig((displayConfigData as DisplayConfigRow | null)?.layout_config);

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
    specials,
    displayConfig
  };
};
