import { ref } from 'vue'
import { mount } from '@vue/test-utils'
import { defineComponent, nextTick } from 'vue'
import { describe, expect, it } from 'vitest'
import { DanInputTag } from '../index'

describe('DanInputTag', () => {
  it('adds tag on Enter', async () => {
    const value = ref<string[]>([])
    const Comp = defineComponent({
      components: { DanInputTag },
      setup: () => ({ value }),
      template: `<DanInputTag v-model="value" />`,
    })
    const wrapper = mount(Comp)
    const input = wrapper.find('.dan-input-tag__input')
    await input.setValue('vue')
    await input.trigger('keydown', { key: 'Enter' })
    expect(value.value).toEqual(['vue'])
  })

  it('adds tag on delimiter and removes on close', async () => {
    const value = ref<string[]>([])
    const Comp = defineComponent({
      components: { DanInputTag },
      setup: () => ({ value }),
      template: `<DanInputTag v-model="value" />`,
    })
    const wrapper = mount(Comp)
    const input = wrapper.find('.dan-input-tag__input')
    await input.setValue('a,b')
    await nextTick()
    expect(value.value).toEqual(['a'])
    expect((input.element as HTMLInputElement).value).toBe('b')
    await input.trigger('keydown', { key: 'Enter' })
    expect(value.value).toEqual(['a', 'b'])

    await wrapper.find('.dan-tag__close').trigger('click')
    expect(value.value).toEqual(['b'])
  })

  it('respects max and clearable', async () => {
    const value = ref<string[]>(['one'])
    const Comp = defineComponent({
      components: { DanInputTag },
      setup: () => ({ value }),
      template: `<DanInputTag v-model="value" :max="1" clearable />`,
    })
    const wrapper = mount(Comp)
    const input = wrapper.find('.dan-input-tag__input')
    expect((input.element as HTMLInputElement).disabled).toBe(true)
    await wrapper.find('.dan-input-tag__clear').trigger('click')
    expect(value.value).toEqual([])
  })
})
