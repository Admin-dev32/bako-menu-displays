-- Enable UUID generation for primary keys
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Clients represent restaurants or venues using the menu displays
CREATE TABLE IF NOT EXISTS clients (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  slug text UNIQUE NOT NULL,
  name text NOT NULL,
  logo_url text,
  tagline text,
  theme_primary text,
  theme_secondary text,
  created_at timestamptz DEFAULT now()
);

-- Categories allow grouping menu items and controlling their order
CREATE TABLE IF NOT EXISTS menu_categories (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  client_id uuid NOT NULL REFERENCES clients(id) ON DELETE CASCADE,
  name text NOT NULL,
  position integer NOT NULL DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

-- Menu items belong to a client and optionally a category
CREATE TABLE IF NOT EXISTS menu_items (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  client_id uuid NOT NULL REFERENCES clients(id) ON DELETE CASCADE,
  category_id uuid REFERENCES menu_categories(id) ON DELETE SET NULL,
  name text NOT NULL,
  description text,
  price_cents integer NOT NULL,
  image_url text,
  is_visible boolean NOT NULL DEFAULT true,
  is_special boolean NOT NULL DEFAULT false,
  created_at timestamptz DEFAULT now()
);

-- Optional sample insert for quick testing (commented out by default)
-- INSERT INTO clients (slug, name, tagline) VALUES ('demo-client', 'El Taco Fuego', 'Street Food · Fresh · Authentic');
-- INSERT INTO menu_categories (client_id, name, position)
--   SELECT id, 'Tacos', 1 FROM clients WHERE slug = 'demo-client';
-- INSERT INTO menu_items (client_id, category_id, name, description, price_cents, is_special)
--   SELECT c.id, mc.id, 'Carne Asada Taco', 'Soft tortilla, cilantro & onion', 275, true
--   FROM clients c JOIN menu_categories mc ON mc.client_id = c.id AND mc.name = 'Tacos' WHERE c.slug = 'demo-client';
