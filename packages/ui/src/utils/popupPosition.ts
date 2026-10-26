export type PopupPlacement = 'top' | 'bottom' | 'left' | 'right'

export interface PopupPoint {
  top: number
  left: number
}

/** Compute fixed-position top/left for a popup relative to a trigger rect. */
export function calcPopupPosition(
  trigger: DOMRect,
  popupWidth: number,
  popupHeight: number,
  placement: PopupPlacement,
  offset = 8,
): PopupPoint {
  const centerX = trigger.left + trigger.width / 2
  const centerY = trigger.top + trigger.height / 2

  switch (placement) {
    case 'bottom':
      return {
        top: trigger.bottom + offset,
        left: centerX - popupWidth / 2,
      }
    case 'left':
      return {
        top: centerY - popupHeight / 2,
        left: trigger.left - popupWidth - offset,
      }
    case 'right':
      return {
        top: centerY - popupHeight / 2,
        left: trigger.right + offset,
      }
    case 'top':
    default:
      return {
        top: trigger.top - popupHeight - offset,
        left: centerX - popupWidth / 2,
      }
  }
}
