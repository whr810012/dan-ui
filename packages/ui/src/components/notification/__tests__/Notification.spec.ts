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
})
