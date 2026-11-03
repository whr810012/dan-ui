/**
 * Capture README / docs gallery screenshots from local docs preview.
 * Usage:
 *   node scripts/capture-readme-shots.mjs [baseUrl]
 *   node scripts/capture-readme-shots.mjs [baseUrl] cascader,transfer,drawer
 */
import { chromium } from 'playwright'
import { mkdirSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const outDir = join(root, 'docs', 'public', 'readme')
mkdirSync(outDir, { recursive: true })

const base = (process.argv[2] || 'http://127.0.0.1:4173/dan-ui').replace(/\/$/, '')
const only = new Set(
  (process.argv[3] || '')
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean),
)

/** @type {{ name: string, path: string, dark?: boolean, prep?: (page: import('playwright').Page) => Promise<void> }[]} */
const shots = [
  { name: 'home', path: '/' },
  { name: 'dark', path: '/', dark: true },
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
        await page
          .getByRole('button', { name: /打开/ })
          .first()
          .click()
          .catch(() => {})
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

  // 重点补拍
  { name: 'cascader', path: '/components/cascader' },
  { name: 'transfer', path: '/components/transfer' },
  { name: 'tree-select', path: '/components/tree-select' },
  { name: 'mentions', path: '/components/mentions' },
  { name: 'descriptions', path: '/components/descriptions' },
  { name: 'carousel', path: '/components/carousel' },
  { name: 'progress', path: '/components/progress' },
  { name: 'empty', path: '/components/empty' },
  { name: 'steps', path: '/components/steps' },
  { name: 'menu', path: '/components/menu' },
  { name: 'tabs', path: '/components/tabs' },
  { name: 'pagination', path: '/components/pagination' },
  {
    name: 'drawer',
    path: '/components/drawer',
    prep: async (page) => {
      const btn = page.getByRole('button', { name: /打开/ }).first()
      if (await btn.count()) await btn.click()
      await page.waitForTimeout(500)
    },
  },
  { name: 'tour', path: '/components/tour' },
  { name: 'float-button', path: '/components/float-button' },
  { name: 'watermark', path: '/components/watermark' },
  { name: 'segmented', path: '/components/segmented' },
  { name: 'splitter', path: '/components/splitter' },
  { name: 'badge', path: '/components/badge' },
  { name: 'tool-call-card', path: '/ai/tool-call-card' },
  { name: 'conversation-list', path: '/ai/conversation-list' },
]

const selected = only.size
  ? shots.filter((shot) => only.has(shot.name))
  : shots

if (!selected.length) {
  console.error('No matching shots. Known names:', shots.map((s) => s.name).join(','))
  process.exit(1)
}

const browser = await chromium.launch({ headless: true })
const context = await browser.newContext({
  viewport: { width: 1280, height: 800 },
  deviceScaleFactor: 1,
})
const page = await context.newPage()

for (const shot of selected) {
  const url = `${base}${shot.path === '/' ? '/' : shot.path}`
  console.log('capture', shot.name, url)
  await page.addInitScript((appearance) => {
    localStorage.setItem('vitepress-theme-appearance', appearance)
  }, shot.dark ? 'dark' : 'light')

  await page.goto(url, { waitUntil: 'networkidle', timeout: 60000 })
  await page.waitForTimeout(500)

  if (shot.dark) {
    await page.evaluate(() => {
      document.documentElement.classList.add('dark')
      document.documentElement.setAttribute('data-theme', 'dark')
      document.documentElement.style.colorScheme = 'dark'
    })
  } else {
    await page.evaluate(() => {
      document.documentElement.classList.remove('dark')
      document.documentElement.removeAttribute('data-theme')
      document.documentElement.style.colorScheme = 'light'
    })
  }
  await page.waitForTimeout(200)

  if (shot.prep) await shot.prep(page)

  await page.screenshot({
    path: join(outDir, `${shot.name}.png`),
    type: 'png',
  })
}

await browser.close()
console.log('done', selected.length, '→', outDir)
