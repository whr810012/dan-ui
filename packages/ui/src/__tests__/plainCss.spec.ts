import { readFileSync, readdirSync, statSync } from 'node:fs'
import { dirname, join, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { describe, expect, it } from 'vitest'

const srcRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..')

function collectCss(dir: string): string[] {
  const result: string[] = []
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry)
    if (statSync(full).isDirectory()) {
      result.push(...collectCss(full))
    } else if (entry.endsWith('.css')) {
      result.push(full)
    }
  }
  return result
}

const plainCssFiles = [
  ...collectCss(resolve(srcRoot, 'components')),
  ...collectCss(resolve(srcRoot, 'styles')),
]

function read(relative: string) {
  return readFileSync(resolve(srcRoot, relative), 'utf8')
}

describe('plain CSS files', () => {
  it('never use Vue scoped-only syntax', () => {
    // 组件目录下的 style.css 是普通 CSS，由 script 里 import 引入，
    // :deep() 不会被编译，浏览器会把整条规则丢弃。
    const offenders = plainCssFiles.filter((file) =>
      readFileSync(file, 'utf8').includes(':deep('),
    )
    expect(offenders).toEqual([])
  })

  it('keep the descendant selectors that used to be :deep()', () => {
    expect(read('components/card/style.css')).toContain(
      '.dan-card__cover img {',
    )
    expect(read('components/carousel/style.css')).toContain(
      '.dan-carousel-item img {',
    )

    const space = read('components/space/style.css')
    expect(space).toContain('.dan-space.is-compact > * {')
    expect(space).toContain(
      '.dan-space.is-compact.dan-space--horizontal > *:first-child {',
    )
    expect(space).toContain(
      '.dan-space.is-compact.dan-space--horizontal > *:last-child {',
    )
  })
})
