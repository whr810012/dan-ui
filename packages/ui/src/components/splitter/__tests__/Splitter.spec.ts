import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import { DanSplitter, DanSplitterPanel } from '../index'

describe('DanSplitter', () => {
  it('renders panels', () => {
    const wrapper = mount({
      components: { DanSplitter, DanSplitterPanel },
      template: `
        <DanSplitter style="height: 200px">
          <DanSplitterPanel :size="30">A</DanSplitterPanel>
          <DanSplitterPanel :size="70">B</DanSplitterPanel>
        </DanSplitter>
      `,
    })
    expect(wrapper.findAll('.dan-splitter-panel')).toHaveLength(2)
    expect(wrapper.find('.dan-splitter-panel__bar').exists()).toBe(true)
  })
})
