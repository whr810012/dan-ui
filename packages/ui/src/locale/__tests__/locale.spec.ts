import { describe, expect, it } from 'vitest'
import en from '../en'
import zhCN from '../zh-CN'
import type { LocaleMessages } from '../types'

function keysOf(obj: Record<string, unknown>, prefix = ''): string[] {
  const keys: string[] = []
  for (const [key, value] of Object.entries(obj)) {
    const path = prefix ? `${prefix}.${key}` : key
    if (value && typeof value === 'object' && !Array.isArray(value)) {
      keys.push(...keysOf(value as Record<string, unknown>, path))
    } else {
      keys.push(path)
    }
  }
  return keys
}

describe('locale packs', () => {
  it('zhCN and en share the same leaf keys', () => {
    const zhKeys = keysOf(zhCN as unknown as Record<string, unknown>).sort()
    const enKeys = keysOf(en as unknown as Record<string, unknown>).sort()
    expect(enKeys).toEqual(zhKeys)
  })

  it('covers dialog / datePicker / agentSteps namespaces', () => {
    const sample: LocaleMessages = zhCN
    expect(sample.dialog.confirm).toBeTruthy()
    expect(sample.datePicker.placeholder).toBeTruthy()
    expect(sample.agentSteps.running).toBeTruthy()
    expect(en.dialog.confirm).toBeTruthy()
  })
})
