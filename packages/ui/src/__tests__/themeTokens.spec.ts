import { readFileSync, readdirSync, statSync } from 'node:fs'
import { dirname, join, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { describe, expect, it } from 'vitest'

const srcRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const themeCss = readFileSync(
  resolve(srcRoot, '../../theme/src/index.css'),
  'utf8',
)

function blockAfter(marker: string) {
  const start = themeCss.indexOf(marker)
  return start < 0 ? '' : themeCss.slice(start, themeCss.indexOf('}', start))
}

function tokensIn(block: string) {
  return new Set(
    [...block.matchAll(/(--dan-[a-z0-9-]+)\s*:/gi)].map((match) => match[1]),
  )
}

const lightTokens = tokensIn(blockAfter(':root {'))
const darkTokens = tokensIn(blockAfter('.dark,'))

function collectCss(dir: string): string[] {
  const files: string[] = []
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry)
    if (statSync(full).isDirectory()) files.push(...collectCss(full))
    else if (entry.endsWith('.css')) files.push(full)
  }
  return files
}

describe('theme tokens', () => {
  it('redefines every colour token in the dark block', () => {
    const colourTokens = [...lightTokens].filter((token) =>
      token.startsWith('--dan-color-'),
    )
    expect(colourTokens.length).toBeGreaterThan(40)
    const missing = colourTokens.filter((token) => !darkTokens.has(token))
    expect(missing).toEqual([])
  })

  it('resolves every var(--dan-*) used by component styles', () => {
    const css = collectCss(srcRoot)
      .map((file) => readFileSync(file, 'utf8'))
      .join('\n')
    const declaredInUi = tokensIn(css)

    const unresolved = new Set<string>()
    for (const match of css.matchAll(/var\((--dan-[a-z0-9-]+)([^)]*)/gi)) {
      const token = match[1]
      const fallback = match[2] ?? ''
      const known = lightTokens.has(token) || declaredInUi.has(token)
      if (!known && !fallback.trimStart().startsWith(',')) unresolved.add(token)
    }

    expect([...unresolved]).toEqual([])
  })
})
