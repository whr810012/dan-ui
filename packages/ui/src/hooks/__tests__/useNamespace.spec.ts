import { describe, expect, it } from 'vitest'
import { useNamespace } from '../useNamespace'

describe('useNamespace', () => {
  it('builds BEM class names with dan prefix', () => {
    const ns = useNamespace('button')
    expect(ns.b()).toBe('dan-button')
    expect(ns.e('text')).toBe('dan-button__text')
    expect(ns.m('primary')).toBe('dan-button--primary')
    expect(ns.is('disabled', true)).toBe('is-disabled')
    expect(ns.is('disabled', false)).toBe('')
  })

  it('exposes css variable helpers', () => {
    const ns = useNamespace('button')
    expect(ns.cssVar('color-primary')).toBe('--dan-color-primary')
    expect(ns.cssVarName('color-primary')).toBe('var(--dan-color-primary)')
    expect(ns.cssVarBlock('bg')).toBe('var(--dan-button-bg)')
  })
})
