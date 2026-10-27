import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'node:path'

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@dandan-ui/ui': resolve(__dirname, '../packages/ui/src/index.ts'),
      '@dandan-ui/theme': resolve(__dirname, '../packages/theme/src/index.css'),
    },
  },
  server: {
    port: 5173,
  },
})
