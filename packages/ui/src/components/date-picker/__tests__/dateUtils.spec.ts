import { describe, expect, it } from 'vitest'
import {
  buildCalendarDays,
  formatDate,
  isSameDay,
  parseDate,
} from '../dateUtils'

describe('dateUtils', () => {
  it('parses and formats dates', () => {
    const date = parseDate('2026-10-27')
    expect(date).toBeTruthy()
    expect(formatDate(date!)).toBe('2026-10-27')
    expect(parseDate('2026-13-01')).toBeNull()
  })

  it('builds a 42-cell calendar grid', () => {
    const cells = buildCalendarDays(new Date(2026, 9, 1))
    expect(cells).toHaveLength(42)
    expect(cells.some((cell) => cell.inCurrentMonth)).toBe(true)
    expect(isSameDay(new Date(2026, 9, 27), new Date(2026, 9, 27))).toBe(true)
  })
})
