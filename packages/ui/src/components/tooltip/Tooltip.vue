<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { useNamespace } from '../../hooks/useNamespace'
import {
  calcPopupPosition,
  type PopupPlacement,
} from '../../utils/popupPosition'
import './style.css'

defineOptions({ name: 'DanTooltip' })

const props = withDefaults(
  defineProps<{
    content?: string
    placement?: PopupPlacement
    trigger?: 'hover' | 'focus'
    disabled?: boolean
    showAfter?: number
    hideAfter?: number
    offset?: number
    visible?: boolean
  }>(),
  {
    content: '',
    placement: 'top',
    trigger: 'hover',
    disabled: false,
    showAfter: 100,
    hideAfter: 100,
    offset: 8,
    visible: undefined,
  },
)

const emit = defineEmits<{
  'update:visible': [value: boolean]
}>()

const ns = useNamespace('tooltip')
const triggerRef = ref<HTMLElement | null>(null)
const popperRef = ref<HTMLElement | null>(null)
const innerVisible = ref(false)
const popperStyle = ref<Record<string, string>>({})

let showTimer: ReturnType<typeof setTimeout> | null = null
let hideTimer: ReturnType<typeof setTimeout> | null = null

const isControlled = computed(() => props.visible !== undefined)
const resolvedVisible = computed(() =>
  isControlled.value ? Boolean(props.visible) : innerVisible.value,
)

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

function setVisible(value: boolean) {
  if (props.disabled && value) return
  if (isControlled.value) {
    emit('update:visible', value)
  } else {
    innerVisible.value = value
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
    top: `${Math.max(0, point.top)}px`,
    left: `${Math.max(0, point.left)}px`,
  }
}

async function open() {
  if (props.disabled) return
  setVisible(true)
  await nextTick()
  updatePosition()
}

function close() {
  setVisible(false)
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

function onScrollOrResize() {
  if (resolvedVisible.value) updatePosition()
}

watch(resolvedVisible, async (value) => {
  if (value) {
    await nextTick()
    updatePosition()
  }
})

onMounted(() => {
  window.addEventListener('scroll', onScrollOrResize, true)
  window.addEventListener('resize', onScrollOrResize)
})

onBeforeUnmount(() => {
  clearTimers()
  window.removeEventListener('scroll', onScrollOrResize, true)
  window.removeEventListener('resize', onScrollOrResize)
})

defineExpose({
  show: open,
  hide: close,
  updatePosition,
})
</script>

<template>
  <span
    ref="triggerRef"
    :class="ns.b()"
    @mouseenter="onTriggerEnter"
    @mouseleave="onTriggerLeave"
    @focusin="onTriggerFocus"
    @focusout="onTriggerBlur"
  >
    <slot />
  </span>
  <Teleport to="body">
    <div
      v-show="resolvedVisible && !disabled"
      ref="popperRef"
      :class="[ns.e('popper'), ns.m(placement)]"
      :style="popperStyle"
      role="tooltip"
      @mouseenter="onPopperEnter"
      @mouseleave="onPopperLeave"
    >
      <slot name="content">{{ content }}</slot>
    </div>
  </Teleport>
</template>
