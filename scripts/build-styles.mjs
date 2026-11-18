/**
 * Emit per-component stylesheets so consumers can load only what they use.
 *
 * Component styles live in `src/components/<name>/style.css` (plain CSS, no
 * @import), so a copy is enough — the consumer's bundler still minifies and
 * scopes it. The bundled `dist/style.css` keeps working unchanged.
 *
 * Usage: node scripts/build-styles.mjs
 */
import {
  copyFileSync,
  existsSync,
  mkdirSync,
  readdirSync,
  statSync,
} from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const srcDir = join(root, 'packages', 'ui', 'src')
const outDir = join(root, 'packages', 'ui', 'dist', 'styles')

function cssFilesIn(dir) {
  if (!existsSync(dir)) return []
  return readdirSync(dir)
    .filter((name) => name.endsWith('.css'))
    .map((name) => ({
      name: name.replace(/\.css$/, ''),
      file: join(dir, name),
    }))
}

const entries = []
const componentsDir = join(srcDir, 'components')
for (const dir of readdirSync(componentsDir)) {
  const file = join(componentsDir, dir, 'style.css')
  if (!existsSync(file) || !statSync(file).isFile()) continue
  entries.push({ name: dir, file })
}
entries.push(...cssFilesIn(join(srcDir, 'styles')))

mkdirSync(outDir, { recursive: true })
for (const { name, file } of entries) {
  copyFileSync(file, join(outDir, `${name}.css`))
}

console.log(`styles: wrote ${entries.length} files to packages/ui/dist/styles`)
