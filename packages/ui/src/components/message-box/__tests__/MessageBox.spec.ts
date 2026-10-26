import { describe, expect, it } from 'vitest'
import { nextTick } from 'vue'
import { DanMessageBox } from '../index'

describe('DanMessageBox', () => {
  it('resolves on confirm', async () => {
    const promise = DanMessageBox.confirm('确认删除？', '警告', {
      type: 'warning',
    })
    await nextTick()
    const panel = document.querySelector('.dan-message-box__panel')
    expect(panel?.textContent).toContain('确认删除？')

    const buttons = document.querySelectorAll('.dan-message-box__footer button')
    ;(buttons[buttons.length - 1] as HTMLButtonElement).click()
    await expect(promise).resolves.toBe('confirm')
  })
})
