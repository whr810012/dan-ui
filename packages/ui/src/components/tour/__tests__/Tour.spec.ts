import { nextTick, ref } from 'vue'
import { mount } from '@vue/test-utils'
import { defineComponent } from 'vue'
import { describe, expect, it } from 'vitest'
import { DanTour } from '../index'

describe('DanTour', () => {
  it('shows panel and advances steps', async () => {
    const open = ref(true)
    const current = ref(0)
    const Comp = defineComponent({
      components: { DanTour },
      setup: () => ({
        open,
        current,
        steps: [
          { title: '一步', description: 'A' },
          { title: '二步', description: 'B' },
        ],
      }),
      template: `
        <DanTour v-model="open" v-model:current="current" :steps="steps" />
      `,
    })
    const wrapper = mount(Comp, { attachTo: document.body })
    await nextTick()
    expect(document.body.textContent).toContain('一步')
    const nextBtn = Array.from(document.body.querySelectorAll('button')).find(
      (btn) => btn.textContent?.includes('下一步'),
    )
    nextBtn?.click()
    await nextTick()
    expect(current.value).toBe(1)
    wrapper.unmount()
  })
})
