import { defineConfig } from 'vite'
import { resolve } from 'node:path'

export default defineConfig({
  build: {
    emptyOutDir: true,
    cssCodeSplit: false,
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'DanTheme',
      formats: ['es'],
      fileName: 'index',
    },
    rollupOptions: {
      output: {
        assetFileNames: 'index[extname]',
      },
    },
  },
})
