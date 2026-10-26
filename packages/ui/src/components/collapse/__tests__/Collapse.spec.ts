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
    expect(wrapper.text()).not.toContain('content-a')
    await wrapper.get('button').trigger('click')
    await nextTick()
    expect(active.value).toEqual(['a'])
    expect(wrapper.text()).toContain('content-a')
  })
})
