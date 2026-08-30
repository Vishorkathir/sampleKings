import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (id.includes('/react/') || id.includes('/react-dom/') || id.includes('/react-router-dom/')) {
              return 'react-vendor'
            }
            if (id.includes('@mui/') || id.includes('@emotion/')) {
              return 'mui-vendor'
            }
            if (id.includes('@supabase/')) {
              return 'supabase-vendor'
            }
          }
          return undefined
        },
      },
    },
    sourcemap: false,
    target: 'esnext',
    cssCodeSplit: true,
    reportCompressedSize: true,
    chunkSizeWarningLimit: 500,
  },
  server: {
    port: 5173,
    strictPort: false,
  },
})
