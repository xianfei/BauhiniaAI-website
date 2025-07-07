import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import Font from 'vite-plugin-font';

import { resolve } from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue(), Font.vite()],
  resolve: {
    alias: {
      '@assets': resolve(__dirname, 'src/assets'),
    },
  },
})
