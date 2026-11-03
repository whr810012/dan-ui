/**
 * Capture README screenshots from local docs preview.
 * Usage: node scripts/capture-readme-shots.mjs [baseUrl]
 */
import { chromium } from 'playwright'
import { mkdirSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const outDir = join(root, 'docs', 'public', 'readme')
mkdirSync(outDir, { recursive: true })

const base = (process.argv[2] || 'http://127.0.0.1:4173/dan-ui').replace(/\/$/, '')

/** @type {{ name: string, path: string, dark?: boolean, prep?: (page: import('playwright').Page) => Promise<void> }[]} */
const shots = [
  { name: 'home', path: '/' },
  {
    name: 'dark',
    path: '/',
    dark: true,
  },
  { name: 'button', path: '/components/button' },
  { name: 'form', path: '/components/form' },
  { name: 'select', path: '/components/select' },
  { name: 'date-picker', path: '/components/date-picker' },
  { name: 'upload', path: '/components/upload' },
  { name: 'layout', path: '/components/layout' },
  {
    name: 'dialog',
    path: '/components/dialog',
    prep: async (page) => {
      const btn = page.getByRole('button', { name: '打开对话框' }).first()
      if (await btn.count()) await btn.click()
      else {
        await page.getByRole('button', { name: /打开/ }).first().click().catch(() => {})
      }
      await page.waitForTimeout(500)
    },
  },
  { name: 'table', path: '/components/table' },
  { name: 'tree', path: '/components/tree' },
  { name: 'image', path: '/components/image' },
  { name: 'avatar', path: '/components/avatar' },
  { name: 'skeleton', path: '/components/skeleton' },
  { name: 'timeline', path: '/components/timeline' },
  { name: 'statistic', path: '/components/statistic' },
  { name: 'chat', path: '/ai/overview' },
  { name: 'workspace', path: '/ai/chat-workspace' },
  { name: 'rich-text', path: '/editor/rich-text' },
]

const browser = await chromium.launch({ headless: true })
const context = await browser.newContext({
  viewport: { width: 1280, height: 800 },
  deviceScaleFactor: 1,
})
const page = await context.newPage()

for (const shot of shots) {
  const url = `${base}${shot.path === '/' ? '/' : shot.path}`
  console.log('capture', shot.name, url)
  await page.goto(url, { waitUntil: 'networkidle', timeout: 60000 })
  await page.waitForTimeout(500)

  if (shot.dark) {
    await page.evaluate(() => {
      localStorage.setItem('vitepress-theme-appearance', 'dark')
      document.documentElement.classList.add('dark')
      document.documentElement.setAttribute('data-theme', 'dark')
    })
    await page.waitForTimeout(400)
  } else {
    await page.evaluate(() => {
      localStorage.setItem('vitepress-theme-appearance', 'light')
      document.documentElement.classList.remove('dark')
      document.documentElement.removeAttribute('data-theme')
    })
  }

  if (shot.prep) await shot.prep(page)

  await page.screenshot({
    path: join(outDir, `${shot.name}.png`),
    type: 'png',
  })
}

await browser.close()
console.log('done', outDir)
