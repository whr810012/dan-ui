import { defineComponent } from 'vue'
import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import { DanAgentSteps } from '../index'

describe('DanAgentSteps', () => {
  it('renders steps and emits select', async () => {
    const Comp = defineComponent({
      components: { DanAgentSteps },
      setup() {
        const steps = [
          { id: '1', title: '检索', status: 'done' as const },
          { id: '2', title: '生成', status: 'running' as const },
        ]
        return { steps }
      },
      template: `<DanAgentSteps :steps="steps" />`,
    })
    const wrapper = mount(Comp)
    expect(wrapper.text()).toContain('检索')
    expect(wrapper.text()).toContain('进行中')
    await wrapper.findAll('.dan-agent-steps__button')[1]!.trigger('click')
    expect(wrapper.findComponent(DanAgentSteps).emitted('select')?.[0]?.[0]).toMatchObject({
      id: '2',
    })
  })
})
