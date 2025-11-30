import { createClient, type SupabaseClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

const requireEnv = (value: string | undefined, name: string): string => {
  if (!value) {
    throw new Error(`Missing environment variable: ${name}`);
  }
  return value;
};

export const createServiceSupabaseClient = (): SupabaseClient => {
  const url = requireEnv(supabaseUrl, 'NEXT_PUBLIC_SUPABASE_URL');
  const key = requireEnv(supabaseServiceRoleKey, 'SUPABASE_SERVICE_ROLE_KEY');

  return createClient(url, key, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
      detectSessionInUrl: false
    }
  });
};

export const createSupabaseBrowserClient = (): SupabaseClient => {
  const url = requireEnv(supabaseUrl, 'NEXT_PUBLIC_SUPABASE_URL');
  const key = requireEnv(supabaseAnonKey, 'NEXT_PUBLIC_SUPABASE_ANON_KEY');

  return createClient(url, key, {
    auth: {
      autoRefreshToken: true,
      persistSession: true,
      detectSessionInUrl: true
    }
  });
};
