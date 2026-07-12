import { resolve } from 'node:path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// MPA: каталог вариантов в корне, варианты лендинга в /1/, /2/, ...
// На своём домене (нашедело23.рф) base сменить на '/'
export default defineConfig({
  base: '/nashedelo23/',
  plugins: [react(), tailwindcss()],
  build: {
    rollupOptions: {
      input: {
        catalog: resolve(__dirname, 'index.html'),
        v1: resolve(__dirname, '1/index.html'),
        v2: resolve(__dirname, '2/index.html'),
      },
    },
  },
  server: {
    host: '127.0.0.1',
    port: 5173,
    strictPort: true,
  },
})
