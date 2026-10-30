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

  it('supports jumper and page size change', async () => {
    const page = ref(1)
    const size = ref(10)
    const Comp = defineComponent({
      components: { DanPagination },
      setup() {
        return { page, size }
      },
      template: `
        <DanPagination
          v-model:current-page="page"
          v-model:page-size="size"
          :total="200"
          :page-sizes="[10, 20, 50]"
          layout="sizes, prev, pager, next, jumper"
          background
        />
      `,
    })

    const wrapper = mount(Comp)
    const jumper = wrapper.get('.dan-pagination__jumper-input')
    await jumper.setValue('4')
    await jumper.trigger('keydown', { key: 'Enter' })
    await nextTick()
    expect(page.value).toBe(4)

    const select = wrapper.get('.dan-pagination__sizes-select')
    await select.setValue('20')
    await select.trigger('change')
    await nextTick()
    expect(size.value).toBe(20)
  })
})
