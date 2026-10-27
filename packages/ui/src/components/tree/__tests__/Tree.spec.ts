import { defineComponent, nextTick, ref } from 'vue'
import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import { DanTree } from '../index'

describe('DanTree', () => {
  it('checks node', async () => {
    const checkedKeys = ref<Array<string | number>>([])
    const Comp = defineComponent({
      components: { DanTree },
      setup: () => ({
        checkedKeys,
        data: [{ id: 1, label: 'A', children: [{ id: 11, label: 'A1' }] }],
      }),
      template: `
        <DanTree
          v-model:checked-keys="checkedKeys"
          :data="data"
          show-checkbox
          default-expand-all
        />
      `,
    })
    const wrapper = mount(Comp)
    await nextTick()
    const boxes = wrapper.findAll('input[type="checkbox"]')
    await boxes[0]!.setValue(true)
    expect(checkedKeys.value).toContain(1)
  })
})
