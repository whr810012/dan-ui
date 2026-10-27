import { defineComponent, nextTick, ref } from 'vue'
import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import { DanMenu, DanMenuItem, DanSubMenu } from '../index'

describe('DanMenu', () => {
  it('selects menu item', async () => {
    const active = ref('')
    const Comp = defineComponent({
      components: { DanMenu, DanMenuItem, DanSubMenu },
      setup() {
        return { active }
      },
      template: `
        <DanMenu v-model="active">
          <DanMenuItem index="1">Item 1</DanMenuItem>
          <DanSubMenu index="2" title="Group">
            <DanMenuItem index="2-1">Item 2-1</DanMenuItem>
          </DanSubMenu>
        </DanMenu>
      `,
    })

    const wrapper = mount(Comp)
    await wrapper.get('.dan-menu-item').trigger('click')
    expect(active.value).toBe('1')
  })

  it('toggles submenu', async () => {
    const Comp = defineComponent({
      components: { DanMenu, DanMenuItem, DanSubMenu },
      template: `
        <DanMenu>
          <DanSubMenu index="g" title="Group">
            <DanMenuItem index="g-1">Child</DanMenuItem>
          </DanSubMenu>
        </DanMenu>
      `,
    })

    const wrapper = mount(Comp)
    expect(wrapper.find('.dan-sub-menu').classes()).not.toContain('is-opened')
    await wrapper.get('.dan-sub-menu__title').trigger('click')
    await nextTick()
    expect(wrapper.find('.dan-sub-menu').classes()).toContain('is-opened')
    expect(wrapper.find('.dan-sub-menu__list').isVisible()).toBe(true)
  })

  it('moves focus with arrow keys', async () => {
    const Comp = defineComponent({
      components: { DanMenu, DanMenuItem },
      template: `
        <DanMenu>
          <DanMenuItem index="1">One</DanMenuItem>
          <DanMenuItem index="2">Two</DanMenuItem>
        </DanMenu>
      `,
    })
    const wrapper = mount(Comp, { attachTo: document.body })
    const items = wrapper.findAll('.dan-menu-item')
    ;(items[0]!.element as HTMLElement).focus()
    await wrapper.get('.dan-menu').trigger('keydown', { key: 'ArrowDown' })
    expect(document.activeElement).toBe(items[1]!.element)
    wrapper.unmount()
  })
})
