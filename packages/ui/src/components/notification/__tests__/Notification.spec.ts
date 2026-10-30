import { describe, expect, it } from 'vitest'
import { nextTick } from 'vue'
import { DanNotification } from '../index'

describe('DanNotification', () => {
  it('shows notification content', async () => {
    const handler = DanNotification.success({
      title: '成功',
      message: '已保存',
      duration: 0,
    })
    await nextTick()
    expect(document.body.textContent).toContain('成功')
    expect(document.body.textContent).toContain('已保存')
    handler.close()
    await nextTick()
  })

  it('groups identical notifications', async () => {
    DanNotification.closeAll()
    DanNotification.info({
      title: '提示',
      message: '相同',
      duration: 0,
      offset: 24,
    })
    DanNotification.info({
      title: '提示',
      message: '相同',
      duration: 0,
      offset: 24,
    })
    await nextTick()
    expect(document.querySelectorAll('.dan-notification__item').length).toBe(1)
    expect(document.querySelector('.dan-notification__badge')?.textContent).toBe(
      '2',
    )
    DanNotification.closeAll()
    await nextTick()
  })
})

