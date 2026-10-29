import { ref } from 'vue'
import { mount } from '@vue/test-utils'
import { defineComponent } from 'vue'
import { describe, expect, it } from 'vitest'
import { DanCheckTag } from '../index'

describe('DanCheckTag', () => {
  it('toggles checked', async () => {
    const checked = ref(false)
    const Comp = defineComponent({
      components: { DanCheckTag },
      setup: () => ({ checked }),
      template: `<DanCheckTag v-model:checked="checked">标签</DanCheckTag>`,
    })
    const wrapper = mount(Comp)
    await wrapper.find('button').trigger('click')
    expect(checked.value).toBe(true)
  })
})
