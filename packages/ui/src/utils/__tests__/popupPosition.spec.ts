import { describe, expect, it } from 'vitest'
import { calcPopupPosition } from '../popupPosition'

describe('calcPopupPosition', () => {
  const trigger = {
    top: 100,
    left: 100,
    bottom: 140,
    right: 180,
    width: 80,
    height: 40,
    x: 100,
    y: 100,
    toJSON() {
      return this
    },
  } as DOMRect

  it('places popup above trigger for top', () => {
    const point = calcPopupPosition(trigger, 60, 20, 'top', 8)
    expect(point.top).toBe(72)
    expect(point.left).toBe(110)
  })

  it('places popup below trigger for bottom', () => {
    const point = calcPopupPosition(trigger, 60, 20, 'bottom', 8)
    expect(point.top).toBe(148)
    expect(point.left).toBe(110)
  })
})
