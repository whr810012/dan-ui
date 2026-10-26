export type PopupPlacement = 'top' | 'bottom' | 'left' | 'right'

export interface PopupPoint {
  top: number
  left: number
}

/** Compute fixed-position top/left for a popup relative to a trigger rect. */
function clamp(value: number, min: number, max: number) {
  if (max < min) return min
  return Math.min(Math.max(value, min), max)
}

/** Keep popup inside the viewport with a small edge padding. */
export function calcPopupPosition(
  trigger: DOMRect,
  popupWidth: number,
  popupHeight: number,
  placement: PopupPlacement,
  offset = 8,
  padding = 4,
): PopupPoint {
  const centerX = trigger.left + trigger.width / 2
  const centerY = trigger.top + trigger.height / 2
  const viewW = typeof window !== 'undefined' ? window.innerWidth : 0
  const viewH = typeof window !== 'undefined' ? window.innerHeight : 0

  let top: number
  let left: number

  switch (placement) {
    case 'bottom':
      top = trigger.bottom + offset
      left = centerX - popupWidth / 2
      break
    case 'left':
      top = centerY - popupHeight / 2
      left = trigger.left - popupWidth - offset
      break
    case 'right':
      top = centerY - popupHeight / 2
      left = trigger.right + offset
      break
    case 'top':
    default:
      top = trigger.top - popupHeight - offset
      left = centerX - popupWidth / 2
      break
  }

  if (viewW > 0) {
    left = clamp(left, padding, Math.max(padding, viewW - popupWidth - padding))
  }
  if (viewH > 0) {
    top = clamp(top, padding, Math.max(padding, viewH - popupHeight - padding))
  }

  return { top, left }
}
