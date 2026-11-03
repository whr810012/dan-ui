import { readFileSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { describe, expect, it } from 'vitest'

const css = readFileSync(
  resolve(
    dirname(fileURLToPath(import.meta.url)),
    '../../../theme/src/index.css',
  ),
  'utf8',
)

describe('dark theme tokens', () => {
  it('keeps elevated / overlay / mask tokens for dark overlays', () => {
    expect(css).toMatch(/\[data-theme='dark'\]/)
    expect(css).toContain('--dan-color-bg-elevated:')
    expect(css).toContain('--dan-color-mask:')
    expect(css).toContain('--dan-color-loading-mask:')
    expect(css).toContain('--dan-color-bg-overlay:')
  })
})
