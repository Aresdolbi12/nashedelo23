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
        v3: resolve(__dirname, '3/index.html'),
        v4: resolve(__dirname, '4/index.html'),
        v5: resolve(__dirname, '5/index.html'),
        v6: resolve(__dirname, '6/index.html'),
        v7: resolve(__dirname, '7/index.html'),
      },
    },
  },
  server: {
    host: '127.0.0.1',
    port: 5173,
    strictPort: true,
  },
})
