#!/usr/bin/env node
/**
 * 本地包体积报告：读取 packages/ui/dist 主要产物大小。
 * 用法：pnpm build && pnpm bundle:report
 */
import { readdir, stat } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const dist = path.join(root, 'packages/ui/dist')

function formatKb(bytes) {
  return `${(bytes / 1024).toFixed(2)} kB`
}

async function listFiles(dir, base = dir) {
  const entries = await readdir(dir, { withFileTypes: true })
  const files = []
  for (const entry of entries) {
    const full = path.join(dir, entry.name)
    if (entry.isDirectory()) {
      files.push(...(await listFiles(full, base)))
    } else if (/\.(js|cjs|css|mjs)$/.test(entry.name)) {
      const s = await stat(full)
      files.push({
        name: path.relative(base, full).replace(/\\/g, '/'),
        bytes: s.size,
      })
    }
  }
  return files
}

const files = (await listFiles(dist)).sort((a, b) => b.bytes - a.bytes)
const total = files.reduce((sum, f) => sum + f.bytes, 0)

console.log('dan-ui @dandan-ui/ui dist report')
console.log(`dir: ${dist}`)
console.log('─'.repeat(48))
for (const file of files.slice(0, 20)) {
  console.log(`${formatKb(file.bytes).padStart(12)}  ${file.name}`)
}
if (files.length > 20) {
  console.log(`… and ${files.length - 20} more files`)
}
console.log('─'.repeat(48))
console.log(`${formatKb(total).padStart(12)}  TOTAL (${files.length} files)`)
console.log('')
console.log('Tips: compare index.js / style.css across versions; prefer on-demand import for apps.')
