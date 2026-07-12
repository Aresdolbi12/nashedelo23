import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  // base для GitHub Pages: каталог вариантов в корне, этот лендинг — вариант 1.
  // На своём домене сменить на '/'
  base: '/nashedelo23/1/',
  plugins: [react(), tailwindcss()],
  server: {
    host: '127.0.0.1',
    port: 5173,
    strictPort: true,
  },
})
