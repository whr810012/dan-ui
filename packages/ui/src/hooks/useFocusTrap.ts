import {
  nextTick,
  onBeforeUnmount,
  watch,
  type MaybeRefOrGetter,
  type Ref,
  toValue,
} from 'vue'

const FOCUSABLE_SELECTOR = [
  'a[href]',
  'button:not([disabled])',
  'textarea:not([disabled])',
  'input:not([disabled]):not([type="hidden"])',
  'select:not([disabled])',
  '[tabindex]:not([tabindex="-1"])',
].join(',')

function listFocusable(container: HTMLElement | null): HTMLElement[] {
  if (!container) return []
  return Array.from(
    container.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR),
  ).filter((el) => {
    if (el.closest('[disabled], [aria-hidden="true"]')) return false
    const style =
      typeof window !== 'undefined' ? window.getComputedStyle(el) : null
    if (style && (style.visibility === 'hidden' || style.display === 'none')) {
      return false
    }
    return true
  })
}

/**
 * Trap Tab focus inside `containerRef` while `active` is true.
 * Restores previously focused element when deactivated.
 */
export function useFocusTrap(
  containerRef: Ref<HTMLElement | null | undefined>,
  active: MaybeRefOrGetter<boolean>,
) {
  let previous: HTMLElement | null = null

  function onKeydown(event: KeyboardEvent) {
    if (event.key !== 'Tab' || !toValue(active)) return
    const nodes = listFocusable(containerRef.value ?? null)
    if (!nodes.length) {
      event.preventDefault()
      containerRef.value?.focus()
      return
    }
    const first = nodes[0]
    const last = nodes[nodes.length - 1]
    const current = document.activeElement as HTMLElement | null
    if (event.shiftKey) {
      if (current === first || !containerRef.value?.contains(current)) {
        event.preventDefault()
        last.focus()
      }
    } else if (current === last || !containerRef.value?.contains(current)) {
      event.preventDefault()
      first.focus()
    }
  }

  watch(
    () => toValue(active),
    async (enabled) => {
      if (typeof document === 'undefined') return
      if (enabled) {
        previous = document.activeElement as HTMLElement | null
        document.addEventListener('keydown', onKeydown, true)
        await nextTick()
        const nodes = listFocusable(containerRef.value ?? null)
        ;(nodes[0] ?? containerRef.value)?.focus()
      } else {
        document.removeEventListener('keydown', onKeydown, true)
        if (previous && typeof previous.focus === 'function') {
          previous.focus()
        }
        previous = null
      }
    },
    { immediate: true },
  )

  onBeforeUnmount(() => {
    if (typeof document === 'undefined') return
    document.removeEventListener('keydown', onKeydown, true)
  })
}
