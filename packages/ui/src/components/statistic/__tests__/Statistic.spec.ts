import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import { DanStatistic } from '../index'

describe('DanStatistic', () => {
  it('formats number with group separator and precision', () => {
    const wrapper = mount(DanStatistic, {
      props: { value: 1234567.8, precision: 2 },
    })
    expect(wrapper.find('.dan-statistic__value').text()).toBe('1,234,567.80')
  })

  it('supports custom separators and formatter', () => {
    const withSep = mount(DanStatistic, {
      props: {
        value: 1234.5,
        precision: 1,
        groupSeparator: ' ',
        decimalSeparator: ',',
      },
    })
    expect(withSep.find('.dan-statistic__value').text()).toBe('1 234,5')

    const withFmt = mount(DanStatistic, {
      props: {
        value: 12,
        formatter: (value) => `#${value}`,
      },
    })
    expect(withFmt.find('.dan-statistic__value').text()).toBe('#12')
  })
})
