import { describe, expect, it } from 'vitest'
import { nextTick } from 'vue'
import { DanMessage } from '../index'

describe('DanMessage', () => {
  it('groups identical messages', async () => {
    DanMessage.closeAll()
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
})
