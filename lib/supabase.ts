import { createClient } from '@supabase/supabase-js';

// Concept: In Next.js, keys without NEXT_PUBLIC_ are only available in Node.js
// We simulate this by checking if we are in a "server context" (mocked)
const isServer = typeof window === 'undefined';

// These would be process.env.SUPABASE_URL and process.env.SUPABASE_KEY
// In this environment, they are injected by the system.
const SUPABASE_URL = process.env.SUPABASE_URL || '';
const SUPABASE_KEY = process.env.SUPABASE_KEY || '';

export const isSupabaseConfigured = !!SUPABASE_URL && !!SUPABASE_KEY;

// Browser client uses the same keys but we wrap them in a check
export const createBrowserClient = () => {
    if (!isSupabaseConfigured) return null;
    return createClient(SUPABASE_URL, SUPABASE_KEY);
};

// Server-only client (Simulation)
// This would use a SERVICE_ROLE_KEY in a real production Next.js environment
export const createServerClient = () => {
    if (!isServer) {
        throw new Error("Cannot use Server Client on the browser!");
    }
    return createClient(SUPABASE_URL, SUPABASE_KEY);
};

export const supabase = createBrowserClient();