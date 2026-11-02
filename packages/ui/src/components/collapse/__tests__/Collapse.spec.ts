import { defineComponent, nextTick, ref } from 'vue'
import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import { DanCollapse, DanCollapseItem } from '../index'

describe('DanCollapse', () => {
  it('toggles panel by clicking header', async () => {
    const active = ref<string[]>([])
    const Comp = defineComponent({
      components: { DanCollapse, DanCollapseItem },
      setup() {
        return { active }
      },
      template: `
        <DanCollapse v-model="active">
          <DanCollapseItem title="A" name="a">content-a</DanCollapseItem>
        </DanCollapse>
      `,
    })

    const wrapper = mount(Comp)
    expect(wrapper.find('.dan-collapse-item').classes()).not.toContain(
      'is-active',
    )
    expect(
      wrapper.find('.dan-collapse-item__collapse').classes(),
    ).not.toContain('is-expanded')
    await wrapper.get('button').trigger('click')
    await nextTick()
    expect(active.value).toEqual(['a'])
    expect(wrapper.find('.dan-collapse-item').classes()).toContain('is-active')
    expect(wrapper.find('.dan-collapse-item__collapse').classes()).toContain(
      'is-expanded',
    )
  })

  it('supports custom icon slot and hideIcon', async () => {
    const active = ref<string[]>([])
    const Comp = defineComponent({
      components: { DanCollapse, DanCollapseItem },
      setup() {
        return { active }
      },
      template: `
        <DanCollapse v-model="active">
          <DanCollapseItem title="A" name="a">
            <template #icon="{ active: isActive }">
              <span class="custom-icon">{{ isActive ? 'on' : 'off' }}</span>
            </template>
            body
          </DanCollapseItem>
          <DanCollapseItem title="B" name="b" hide-icon>hidden</DanCollapseItem>
        </DanCollapse>
      `,
    })

    const wrapper = mount(Comp)
    expect(wrapper.get('.custom-icon').text()).toBe('off')
    const items = wrapper.findAll('.dan-collapse-item')
    expect(items[1]!.find('.dan-collapse-item__icon').exists()).toBe(false)
    await items[0]!.get('button').trigger('click')
    await nextTick()
    expect(wrapper.get('.custom-icon').text()).toBe('on')
  })
})
