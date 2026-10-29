import { describe, expect, it } from 'vitest'
import { normalizeCascaderPaths } from '../types'

describe('normalizeCascaderPaths', () => {
  it('returns empty for null / empty array', () => {
    expect(normalizeCascaderPaths(null, false)).toEqual([])
    expect(normalizeCascaderPaths([], false)).toEqual([])
    expect(normalizeCascaderPaths([], true)).toEqual([])
  })

  it('normalizes single path', () => {
    expect(normalizeCascaderPaths(['a', 'b'], false)).toEqual([['a', 'b']])
  })

  it('rejects nested path in single mode', () => {
    expect(normalizeCascaderPaths([['a', 'b']], false)).toEqual([])
  })

  it('normalizes multiple paths', () => {
    expect(
      normalizeCascaderPaths(
        [
          ['a', 'a1'],
          ['b', 'b1'],
        ],
        true,
      ),
    ).toEqual([
      ['a', 'a1'],
      ['b', 'b1'],
    ])
  })

  it('rejects flat path in multiple mode', () => {
    expect(normalizeCascaderPaths(['a', 'b'], true)).toEqual([])
  })
})
