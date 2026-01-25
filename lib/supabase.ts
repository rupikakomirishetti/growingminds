import { createClient } from '@supabase/supabase-js';

// Next.js environment variables
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const SUPABASE_KEY = process.env.NEXT_PUBLIC_SUPABASE_KEY || '';

export const isSupabaseConfigured = !!SUPABASE_URL && !!SUPABASE_KEY;

// Browser client
export const createBrowserClient = () => {
    if (!isSupabaseConfigured) return null;
    return createClient(SUPABASE_URL, SUPABASE_KEY);
};

export const supabase = createBrowserClient();