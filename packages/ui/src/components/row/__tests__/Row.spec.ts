import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import { DanCol } from '../../col'
import { DanRow } from '../index'

describe('DanRow / DanCol', () => {
  it('applies span class and gutter padding', () => {
    const wrapper = mount({
      components: { DanRow, DanCol },
      template: `
        <DanRow :gutter="16">
          <DanCol :span="12">左</DanCol>
          <DanCol :span="12">右</DanCol>
        </DanRow>
      `,
    })

    expect(wrapper.find('.dan-row').attributes('style')).toContain(
      'margin-left: -8px',
    )
    const cols = wrapper.findAll('.dan-col')
    expect(cols[0].classes()).toContain('dan-col-span-12')
    expect(cols[0].attributes('style')).toContain('padding-left: 8px')
    expect(cols[1].text()).toBe('右')
  })
})
