import { defineComponent, h, ref } from 'vue'
import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import { createContext } from '../createContext'

describe('createContext', () => {
  it('provides and injects typed context', () => {
    const [provideDemo, injectDemo] = createContext<{ count: number }>('Demo')

    const Child = defineComponent({
      setup() {
        const ctx = injectDemo()
        return () => h('span', String(ctx.count))
      },
    })

    const Parent = defineComponent({
      setup() {
        provideDemo({ count: 3 })
        return () => h(Child)
      },
    })

    const wrapper = mount(Parent)
    expect(wrapper.text()).toBe('3')
  })

  it('uses default value when not provided', () => {
    const fallback = { label: ref('ok') }
    const [, injectDemo] = createContext<{ label: { value: string } }>(
      'DemoDefault',
      fallback,
    )

    const Comp = defineComponent({
      setup() {
        const ctx = injectDemo()
        return () => h('span', ctx.label.value)
      },
    })

    expect(mount(Comp).text()).toBe('ok')
  })
})
