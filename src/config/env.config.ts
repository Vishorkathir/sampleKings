'use client';
export const ENV_CONFIG = {
  isProduction: (process.env.NODE_ENV === "production"),
  isDevelopment: process.env.DEV,
  supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL as string,
  supabaseKey: process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY as string,
  enableAnalytics: (process.env as Record<string, string | undefined>).VITE_ENABLE_ANALYTICS === 'true',
  enableDevtools: process.env.DEV,
  logLevel: (process.env as Record<string, string | undefined>).VITE_LOG_LEVEL || ((process.env.NODE_ENV === "production") ? 'error' : 'debug'),
  secureCookies: (process.env.NODE_ENV === "production"),
  sameSiteCookie: (process.env.NODE_ENV === "production") ? 'Strict' : 'Lax',
  enableCaching: (process.env.NODE_ENV === "production"),
  cacheExpiry: 3600000,
  requestTimeout: 30000,
  endpoints: {
    auth: '/auth',
    admin: '/admin',
    student: '/student',
    scoring: '/scoring',
    health: '/health',
  },
}

export default ENV_CONFIG