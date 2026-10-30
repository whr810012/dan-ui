<script setup lang="ts">
import { nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { useNamespace } from '../../hooks/useNamespace'
import {
  calcPopupPosition,
  type PopupPlacement,
} from '../../utils/popupPosition'
import { provideDropdown } from './dropdownContext'
import './style.css'

defineOptions({ name: 'DanDropdown' })

const props = withDefaults(
  defineProps<{
    trigger?: 'click' | 'hover' | 'focus' | 'contextmenu'
    placement?: PopupPlacement
    disabled?: boolean
    hideOnClick?: boolean
    showAfter?: number
    hideAfter?: number
    offset?: number
  }>(),
  {
    trigger: 'click',
    placement: 'bottom',
    disabled: false,
    hideOnClick: true,
    showAfter: 100,
    hideAfter: 100,
    offset: 8,
  },
)

const emit = defineEmits<{
  command: [command: string | number | object]
  visibleChange: [visible: boolean]
}>()

const ns = useNamespace('dropdown')
const triggerRef = ref<HTMLElement | null>(null)
const popperRef = ref<HTMLElement | null>(null)
const visible = ref(false)
const highlightIndex = ref(-1)
const popperStyle = ref<Record<string, string>>({})

let showTimer: ReturnType<typeof setTimeout> | null = null
let hideTimer: ReturnType<typeof setTimeout> | null = null

function listItems() {
  if (!popperRef.value) return [] as HTMLElement[]
  return Array.from(
    popperRef.value.querySelectorAll<HTMLElement>(
      '.dan-dropdown-item:not(.is-disabled)',
    ),
  )
}

function syncItemHighlight() {
  const items = listItems()
  items.forEach((el, index) => {
    el.classList.toggle('is-highlighted', index === highlightIndex.value)
  })
  items[highlightIndex.value]?.scrollIntoView?.({ block: 'nearest' })
}

function moveHighlight(step: 1 | -1) {
  const items = listItems()
  if (!items.length) return
  const next =
    highlightIndex.value < 0
      ? step > 0
        ? 0
        : items.length - 1
      : (highlightIndex.value + step + items.length) % items.length
  highlightIndex.value = next
  syncItemHighlight()
}

function activateHighlighted() {
  const item = listItems()[highlightIndex.value]
  item?.click()
}

function clearTimers() {
  if (showTimer != null) {
    clearTimeout(showTimer)
    showTimer = null
  }
  if (hideTimer != null) {
    clearTimeout(hideTimer)
    hideTimer = null
  }
}

function updatePosition() {
  const trigger = triggerRef.value
  const popper = popperRef.value
  if (!trigger || !popper) return
  const triggerRect = trigger.getBoundingClientRect()
  const popupRect = popper.getBoundingClientRect()
  const point = calcPopupPosition(
    triggerRect,
    popupRect.width,
    popupRect.height,
    props.placement,
    props.offset,
  )
  popperStyle.value = {
    top: `${point.top}px`,
    left: `${point.left}px`,
  }
}

async function open() {
  if (props.disabled) return
  visible.value = true
  highlightIndex.value = 0
  await nextTick()
  updatePosition()
  syncItemHighlight()
}

function close() {
  visible.value = false
  highlightIndex.value = -1
}

function scheduleOpen() {
  clearTimers()
  showTimer = setTimeout(() => {
    void open()
  }, props.showAfter)
}

function scheduleClose() {
  clearTimers()
  hideTimer = setTimeout(() => {
    close()
  }, props.hideAfter)
}

function toggle() {
  if (props.disabled) return
  if (visible.value) close()
  else void open()
}

function onTriggerClick(event: MouseEvent) {
  if (props.trigger !== 'click') return
  event.stopPropagation()
  toggle()
}

function onContextMenu(event: MouseEvent) {
  if (props.trigger !== 'contextmenu') return
  event.preventDefault()
  event.stopPropagation()
  void open()
}

function onTriggerEnter() {
  if (props.trigger !== 'hover') return
  scheduleOpen()
}

function onTriggerLeave() {
  if (props.trigger !== 'hover') return
  scheduleClose()
}

function onTriggerFocus() {
  if (props.trigger !== 'focus') return
  scheduleOpen()
}

function onTriggerBlur() {
  if (props.trigger !== 'focus') return
  scheduleClose()
}

function onPopperEnter() {
  if (props.trigger !== 'hover') return
  clearTimers()
}

function onPopperLeave() {
  if (props.trigger !== 'hover') return
  scheduleClose()
}

function handleCommand(command: string | number | object) {
  emit('command', command)
  if (props.hideOnClick) close()
}

function onDocumentClick(event: MouseEvent) {
  if (!visible.value) return
  if (props.trigger !== 'click' && props.trigger !== 'contextmenu') return
  const target = event.target as Node
  if (triggerRef.value?.contains(target)) return
  if (popperRef.value?.contains(target)) return
  close()
}

function onKeydown(event: KeyboardEvent) {
  if (props.disabled) return
  const key = event.key
  if (key === 'Escape' && visible.value) {
    event.preventDefault()
    close()
    return
  }
  if (!visible.value) return
  if (key === 'ArrowDown' || key === 'ArrowUp') {
    event.preventDefault()
    moveHighlight(key === 'ArrowDown' ? 1 : -1)
    return
  }
  if (key === 'Enter' || key === ' ') {
    event.preventDefault()
    activateHighlighted()
  }
}

function onScrollOrResize() {
  if (visible.value) updatePosition()
}

watch(visible, (value) => {
  emit('visibleChange', value)
})

provideDropdown({
  visible,
  handleCommand,
  close,
})

onMounted(() => {
  document.addEventListener('click', onDocumentClick, true)
  document.addEventListener('keydown', onKeydown)
  window.addEventListener('scroll', onScrollOrResize, true)
  window.addEventListener('resize', onScrollOrResize)
})

onBeforeUnmount(() => {
  clearTimers()
  document.removeEventListener('click', onDocumentClick, true)
  document.removeEventListener('keydown', onKeydown)
  window.removeEventListener('scroll', onScrollOrResize, true)
  window.removeEventListener('resize', onScrollOrResize)
})

defineExpose({ open, close, toggle })
</script>

<template>
  <div
    ref="triggerRef"
    :class="[ns.b(), ns.is('disabled', disabled), ns.is('opened', visible)]"
    @click="onTriggerClick"
    @contextmenu="onContextMenu"
    @mouseenter="onTriggerEnter"
    @mouseleave="onTriggerLeave"
    @focusin="onTriggerFocus"
    @focusout="onTriggerBlur"
  >
    <slot />
  </div>
  <Teleport to="body">
    <div
      v-show="visible"
      ref="popperRef"
      :class="ns.e('popper')"
      :style="popperStyle"
      role="menu"
      @mouseenter="onPopperEnter"
      @mouseleave="onPopperLeave"
      @click.stop
    >
      <slot name="dropdown" />
    </div>
  </Teleport>
</template>
