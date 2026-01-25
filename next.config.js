/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    GEMINI_API_KEY: process.env.GEMINI_API_KEY || '',
    SUPABASE_URL: process.env.SUPABASE_URL || '',
    SUPABASE_KEY: process.env.SUPABASE_KEY || '',
  },
  images: {
    domains: ['picsum.photos'],
  },
}

module.exports = nextConfig
