import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    // Anything React requests under /api is forwarded to the Express server.
    proxy: {
      '/api': 'http://localhost:5001',
    },
  },
})
