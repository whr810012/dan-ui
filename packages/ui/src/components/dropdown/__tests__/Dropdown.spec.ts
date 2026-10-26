import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import { nextTick } from 'vue'
import { DanButton } from '../../button'
import { DanDropdown, DanDropdownItem, DanDropdownMenu } from '../index'

describe('DanDropdown', () => {
  it('opens on click and emits command', async () => {
    const wrapper = mount(
      {
        components: {
          DanDropdown,
          DanDropdownMenu,
          DanDropdownItem,
          DanButton,
        },
        template: `
          <DanDropdown @command="onCommand">
            <DanButton>菜单</DanButton>
            <template #dropdown>
              <DanDropdownMenu>
                <DanDropdownItem command="edit">编辑</DanDropdownItem>
                <DanDropdownItem command="del" disabled>删除</DanDropdownItem>
              </DanDropdownMenu>
            </template>
          </DanDropdown>
        `,
        setup() {
          const commands: Array<string | number | object> = []
          function onCommand(command: string | number | object) {
            commands.push(command)
          }
          return { onCommand, commands }
        },
      },
      { attachTo: document.body },
    )

    await wrapper.find('.dan-dropdown').trigger('click')
    await nextTick()
    const popper = document.querySelector(
      '.dan-dropdown__popper',
    ) as HTMLElement
    expect(popper.style.display).not.toBe('none')
    expect(popper.textContent).toContain('编辑')

    const items = popper.querySelectorAll('.dan-dropdown-item')
    await items[0].dispatchEvent(new MouseEvent('click', { bubbles: true }))
    await nextTick()
    expect(
      (wrapper.vm as unknown as { commands: string[] }).commands,
    ).toContain('edit')
    expect(popper.style.display).toBe('none')

    wrapper.unmount()
  })
})
