import { defineComponent, nextTick, ref } from 'vue'
import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import { DanPagination } from '../index'

describe('DanPagination', () => {
  it('changes current page', async () => {
    const page = ref(1)
    const Comp = defineComponent({
      components: { DanPagination },
      setup() {
        return { page }
      },
      template: `
        <DanPagination
          v-model:current-page="page"
          :total="50"
          :page-size="10"
        />
      `,
    })

    const wrapper = mount(Comp)
    const numbers = wrapper.findAll('.dan-pagination__number')
    await numbers[2]!.trigger('click')
    await nextTick()
    expect(page.value).toBe(3)
  })

  it('respects disabled state', async () => {
    const page = ref(1)
    const Comp = defineComponent({
      components: { DanPagination },
      setup() {
        return { page }
      },
      template: `
        <DanPagination
          v-model:current-page="page"
          :total="30"
          :page-size="10"
          disabled
        />
      `,
    })

    const wrapper = mount(Comp)
    await wrapper.findAll('.dan-pagination__number')[1]!.trigger('click')
    expect(page.value).toBe(1)
  })
})
