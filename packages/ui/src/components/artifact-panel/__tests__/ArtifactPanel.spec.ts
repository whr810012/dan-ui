import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import { DanArtifactPanel } from '../index'

describe('DanArtifactPanel', () => {
  it('emits close and renders markdown content', async () => {
    const wrapper = mount(DanArtifactPanel, {
      props: {
        title: '结果',
        type: 'text',
        content: 'hello artifact',
      },
    })
    expect(wrapper.text()).toContain('结果')
    expect(wrapper.text()).toContain('hello artifact')
    await wrapper.findAll('button').at(-1)!.trigger('click')
    expect(wrapper.emitted('close')).toHaveLength(1)
  })
})
