export const ENV_CONFIG = {
  isProduction: import.meta.env.PROD,
  isDevelopment: import.meta.env.DEV,
  supabaseUrl: import.meta.env.VITE_SUPABASE_URL as string,
  supabaseKey: import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY as string,
  enableAnalytics: (import.meta.env as Record<string, string | undefined>).VITE_ENABLE_ANALYTICS === 'true',
  enableDevtools: import.meta.env.DEV,
  logLevel: (import.meta.env as Record<string, string | undefined>).VITE_LOG_LEVEL || (import.meta.env.PROD ? 'error' : 'debug'),
  secureCookies: import.meta.env.PROD,
  sameSiteCookie: import.meta.env.PROD ? 'Strict' : 'Lax',
  enableCaching: import.meta.env.PROD,
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
