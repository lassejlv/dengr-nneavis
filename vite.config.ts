import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { TanStackRouterVite } from '@tanstack/router-plugin/vite'
import { resolve } from 'path'

// https://vite.dev/config/
export default defineConfig({
  server: { port: 3000 },
  plugins: [TanStackRouterVite({ target: 'react', autoCodeSplitting: true }), tailwindcss(), react()],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
  },
})
