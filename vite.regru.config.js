import { resolve } from 'node:path'
import { renameSync, rmSync } from 'node:fs'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { viteSingleFile } from 'vite-plugin-singlefile'

// Прод-сборка для хостинга reg.ru (нашедело23.рф): один самодостаточный
// index.html — JS, CSS и картинки инлайнятся внутрь файла. Рядом только og.jpg
// (превью для мессенджеров, его нельзя инлайнить — краулеру нужен реальный URL).
//
// Какой вариант лендинга собирать — переменная VARIANT (по умолчанию 33):
//   VARIANT=33 npx vite build --config vite.regru.config.js
//
// Результат: содержимое dist-regru/ = то, что должно лежать в корне сайта.
// og.jpg перегенерируется отдельно: node scripts/gen-og.mjs
const variant = process.env.VARIANT || '33'
const outDir = resolve(__dirname, 'dist-regru')

// Rollup кладёт результат в dist-regru/<variant>/index.html (сохраняет путь
// входного файла) — поднимаем его в корень dist-regru.
const flatten = {
  name: 'flatten-variant-dir',
  closeBundle() {
    renameSync(resolve(outDir, variant, 'index.html'), resolve(outDir, 'index.html'))
    rmSync(resolve(outDir, variant), { recursive: true, force: true })
  },
}

export default defineConfig({
  base: './',
  publicDir: resolve(__dirname, 'public-regru'), // og.jpg → в корень сборки
  plugins: [react(), tailwindcss(), viteSingleFile(), flatten],
  build: {
    outDir,
    emptyOutDir: true,
    // всё в один файл: картинки (webp) уходят в data-URI
    assetsInlineLimit: 100 * 1024 * 1024,
    cssCodeSplit: false,
    rollupOptions: {
      input: resolve(__dirname, `${variant}/index.html`),
    },
  },
})
