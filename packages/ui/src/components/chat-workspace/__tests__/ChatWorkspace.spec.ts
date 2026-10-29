import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import { DanChatWorkspace } from '../index'

describe('DanChatWorkspace', () => {
  it('renders sidebar main and artifact slots', () => {
    const wrapper = mount(DanChatWorkspace, {
      props: { showSidebar: true, showArtifact: true },
      slots: {
        sidebar: '<div class="side">side</div>',
        default: '<div class="body">body</div>',
        artifact: '<div class="art">art</div>',
        footer: '<div class="foot">foot</div>',
      },
    })
    expect(wrapper.find('.side').exists()).toBe(true)
    expect(wrapper.find('.body').exists()).toBe(true)
    expect(wrapper.find('.art').exists()).toBe(true)
    expect(wrapper.find('.foot').exists()).toBe(true)
  })
})
