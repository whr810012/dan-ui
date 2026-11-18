import { defineComponent } from 'vue'
import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import { DanMenu, DanMenuItem, DanSubMenu } from '../index'

function makeMenu(props: Record<string, unknown> = {}) {
  const Comp = defineComponent({
    components: { DanMenu, DanMenuItem, DanSubMenu },
    setup: () => ({ config: props }),
    template: `
      <DanMenu v-bind="config">
        <DanMenuItem index="1">One</DanMenuItem>
        <DanMenuItem index="2" disabled>Two</DanMenuItem>
        <DanMenuItem index="3">Three</DanMenuItem>
        <DanSubMenu index="g" title="Group">
          <DanMenuItem index="g-1">Child</DanMenuItem>
        </DanSubMenu>
      </DanMenu>
    `,
  })
  return mount(Comp, { attachTo: document.body })
}

describe('DanMenu a11y', () => {
  it('exposes menu and menuitem roles', () => {
    const wrapper = makeMenu()
    const menu = wrapper.get('.dan-menu')
    expect(menu.attributes('role')).toBe('menu')
    expect(menu.attributes('aria-orientation')).toBe('vertical')

    const items = wrapper.findAll('[role="menuitem"]')
    expect(items.length).toBeGreaterThanOrEqual(3)
    expect(items[0]!.attributes('tabindex')).toBe('0')

    const disabled = items[1]!
    expect(disabled.attributes('aria-disabled')).toBe('true')
    expect(disabled.attributes('tabindex')).toBe('-1')
    wrapper.unmount()
  })

  it('marks submenu state and renders a nested menu', async () => {
    const wrapper = makeMenu()
    const title = wrapper.get('.dan-sub-menu__title')
    expect(title.attributes('role')).toBe('menuitem')
    expect(title.attributes('aria-expanded')).toBe('false')

    await title.trigger('click')
    expect(
      wrapper.get('.dan-sub-menu__title').attributes('aria-expanded'),
    ).toBe('true')
    expect(wrapper.find('.dan-sub-menu__list').attributes('role')).toBe('menu')
    wrapper.unmount()
  })

  it('wraps focus with arrows and supports Home / End', async () => {
    const wrapper = makeMenu()
    const items = wrapper
      .findAll('[role="menuitem"]')
      .filter((item) => item.attributes('aria-disabled') !== 'true')
    const menu = wrapper.get('.dan-menu')

    items[items.length - 1]!.element.focus()
    await menu.trigger('keydown', { key: 'ArrowDown' })
    expect(document.activeElement).toBe(items[0]!.element)

    await menu.trigger('keydown', { key: 'End' })
    expect(document.activeElement).toBe(items[items.length - 1]!.element)

    await menu.trigger('keydown', { key: 'Home' })
    expect(document.activeElement).toBe(items[0]!.element)
    wrapper.unmount()
  })

  it('selects a menu item with Enter and Space', async () => {
    const wrapper = makeMenu()
    const item = wrapper.findAll('[role="menuitem"]')[0]!
    await item.trigger('keydown', { key: 'Enter' })
    expect(
      wrapper.findComponent(DanMenu).emitted('update:modelValue')?.[0],
    ).toEqual(['1'])

    const third = wrapper.findAll('[role="menuitem"]')[2]!
    await third.trigger('keydown', { key: ' ' })
    expect(
      wrapper.findComponent(DanMenu).emitted('update:modelValue')?.[1],
    ).toEqual(['3'])
    wrapper.unmount()
  })
})
