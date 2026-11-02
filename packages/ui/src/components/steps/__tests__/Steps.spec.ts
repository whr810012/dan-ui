import { defineComponent, nextTick, ref } from 'vue'
import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import { DanStep, DanSteps } from '../index'

describe('DanSteps', () => {
  it('marks active and finished steps', async () => {
    const active = ref(1)
    const Comp = defineComponent({
      components: { DanSteps, DanStep },
      setup() {
        return { active }
      },
      template: `
        <DanSteps :active="active">
          <DanStep title="A" />
          <DanStep title="B" />
          <DanStep title="C" />
        </DanSteps>
      `,
    })

    const wrapper = mount(Comp)
    await nextTick()
    const steps = wrapper.findAll('.dan-step')
    expect(steps).toHaveLength(3)
    expect(steps[0]!.classes()).toContain('dan-step--finish')
    expect(steps[1]!.classes()).toContain('dan-step--process')
    expect(steps[2]!.classes()).toContain('dan-step--wait')

    active.value = 2
    await nextTick()
    expect(wrapper.findAll('.dan-step')[2]!.classes()).toContain(
      'dan-step--process',
    )
  })

  it('supports simple style and clickable v-model', async () => {
    const active = ref(0)
    const Comp = defineComponent({
      components: { DanSteps, DanStep },
      setup() {
        return { active }
      },
      template: `
        <DanSteps v-model:active="active" simple clickable>
          <DanStep title="A" />
          <DanStep title="B" />
          <DanStep title="C" />
        </DanSteps>
      `,
    })

    const wrapper = mount(Comp)
    await nextTick()
    expect(wrapper.find('.dan-steps.is-simple').exists()).toBe(true)
    expect(wrapper.findAll('.dan-step.is-clickable')).toHaveLength(3)

    await wrapper.findAll('.dan-step')[2]!.trigger('click')
    await nextTick()
    expect(active.value).toBe(2)
    expect(wrapper.findAll('.dan-step')[2]!.classes()).toContain(
      'dan-step--process',
    )
  })
})
