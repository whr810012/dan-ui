/**
 * VitePress `base: '/dan-ui/'` only prefixes asset URLs; files stay at dist root.
 * Nest them under dist/dan-ui/ so Cloudflare Pages can serve
 * https://dan-ui.pages.dev/dan-ui/ (and Hub proxy /dan-ui/*).
 */
import {
  cpSync,
  mkdirSync,
  readdirSync,
  readFileSync,
  rmSync,
  writeFileSync,
  existsSync,
} from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const candidates = [
  join(root, 'docs', '.vitepress', 'dist'),
  join(process.cwd(), '.vitepress', 'dist'),
  join(process.cwd(), 'docs', '.vitepress', 'dist'),
]
const dist = candidates.find((path) => existsSync(path))
if (!dist) {
  console.error('Missing docs/.vitepress/dist — run vitepress build first')
  process.exit(1)
}
const nested = join(dist, 'dan-ui')

const entries = readdirSync(dist).filter((name) => name !== 'dan-ui')
if (entries.length === 0) {
  console.log('Nothing to nest')
  process.exit(0)
}

mkdirSync(nested, { recursive: true })
for (const name of entries) {
  cpSync(join(dist, name), join(nested, name), { recursive: true })
  rmSync(join(dist, name), { recursive: true, force: true })
}

// Root convenience redirect → /dan-ui/
writeFileSync(
  join(dist, 'index.html'),
  `<!doctype html><meta http-equiv="refresh" content="0;url=/dan-ui/"><link rel="canonical" href="/dan-ui/"><script>location.replace('/dan-ui/'+location.search+location.hash)</script>`,
)
writeFileSync(join(dist, '_redirects'), '/ /dan-ui/ 302\n')

// VitePress sitemap hostname ignores base; rewrite locs under /dan-ui/
const sitemapPath = join(nested, 'sitemap.xml')
if (existsSync(sitemapPath)) {
  const xml = readFileSync(sitemapPath, 'utf8').replace(
    /<loc>https:\/\/dandanhub\.vip\//g,
    '<loc>https://dandanhub.vip/dan-ui/',
  )
  writeFileSync(sitemapPath, xml)
  console.log('Rewrote sitemap.xml locs to include /dan-ui/')
}

console.log(`Nested ${entries.length} entries into docs/.vitepress/dist/dan-ui/`)
