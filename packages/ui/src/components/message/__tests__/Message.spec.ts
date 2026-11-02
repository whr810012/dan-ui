import { describe, expect, it } from 'vitest'
import { nextTick } from 'vue'
import { setMessageConfig } from '../config'
import { DanMessage } from '../index'

describe('DanMessage', () => {
  it('groups identical messages', async () => {
    DanMessage.closeAll()
    setMessageConfig(undefined)
    DanMessage.success('已保存', { duration: 0, offset: 40 })
    DanMessage.success('已保存', { duration: 0, offset: 40 })
    await nextTick()
    const items = document.querySelectorAll('.dan-message__item')
    expect(items.length).toBe(1)
    expect(document.body.textContent).toContain('已保存')
    expect(document.querySelector('.dan-message__badge')?.textContent).toBe('2')
    DanMessage.closeAll()
    await nextTick()
  })

  it('respects global max from message config', async () => {
    DanMessage.closeAll()
    setMessageConfig({ max: 2, duration: 0, offset: 20 })
    DanMessage.info('a', { duration: 0, grouping: false })
    DanMessage.info('b', { duration: 0, grouping: false })
    DanMessage.info('c', { duration: 0, grouping: false })
    await nextTick()
    const texts = Array.from(
      document.querySelectorAll('.dan-message__item'),
    ).map((el) => el.textContent || '')
    expect(texts.length).toBe(2)
    expect(texts.some((text) => text.includes('a'))).toBe(false)
    expect(texts.some((text) => text.includes('b'))).toBe(true)
    expect(texts.some((text) => text.includes('c'))).toBe(true)
    DanMessage.closeAll()
    setMessageConfig(undefined)
    await nextTick()
  })
})
