import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
import * as compiler from 'vue/compiler-sfc';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue({
      compiler: { ...compiler, version: '3.4.2' },
    }),
    vueDevTools(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },
  build: {
    outDir: '../mb-api/public/',
    emptyOutDir: true
  }
})
