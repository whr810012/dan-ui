/// <reference types="vitest/config" />
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import dts from 'vite-plugin-dts'
import { resolve } from 'node:path'

const tiptapExternals = [
  '@tiptap/vue-3',
  '@tiptap/starter-kit',
  '@tiptap/extension-link',
  '@tiptap/extension-placeholder',
  '@tiptap/extension-image',
  '@tiptap/extension-underline',
  '@tiptap/pm',
  /^@tiptap\//,
]

export default defineConfig({
  plugins: [
    vue(),
    dts({
      include: ['src'],
      outDir: 'dist',
      rollupTypes: true,
      insertTypesEntry: true,
      entryRoot: 'src',
    }),
  ],
  build: {
    emptyOutDir: true,
    lib: {
      entry: {
        index: resolve(__dirname, 'src/index.ts'),
        resolver: resolve(__dirname, 'src/resolver.ts'),
      },
      name: 'DanUI',
      formats: ['es', 'cjs'],
      fileName: (format, entryName) => {
        const base = entryName === 'resolver' ? 'resolver' : 'index'
        return format === 'es' ? `${base}.js` : `${base}.cjs`
      },
      cssFileName: 'style',
    },
    rollupOptions: {
      external: ['vue', ...tiptapExternals],
      output: {
        globals: {
          vue: 'Vue',
        },
        exports: 'named',
      },
    },
  },
  test: {
    environment: 'jsdom',
    passWithNoTests: true,
  },
})
