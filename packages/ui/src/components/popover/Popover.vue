<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { useNamespace } from '../../hooks/useNamespace'
import {
  calcPopupPosition,
  type PopupPlacement,
} from '../../utils/popupPosition'
import './style.css'

defineOptions({ name: 'DanPopover' })

const props = withDefaults(
  defineProps<{
    title?: string
    content?: string
    placement?: PopupPlacement
    trigger?: 'click' | 'hover'
    disabled?: boolean
    width?: string | number
    showAfter?: number
    hideAfter?: number
    offset?: number
    visible?: boolean
  }>(),
  {
    title: '',
    content: '',
    placement: 'bottom',
    trigger: 'click',
    disabled: false,
    width: 240,
    showAfter: 100,
    hideAfter: 100,
    offset: 8,
    visible: undefined,
  },
)

const emit = defineEmits<{
  'update:visible': [value: boolean]
  show: []
  hide: []
}>()

const ns = useNamespace('popover')
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

const panelWidth = computed(() =>
  typeof props.width === 'number' ? `${props.width}px` : props.width,
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
    width: panelWidth.value,
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

function onTriggerClick(event: MouseEvent) {
  if (props.trigger !== 'click') return
  event.preventDefault()
  if (resolvedVisible.value) close()
  else void open()
}

function onTriggerEnter() {
  if (props.trigger !== 'hover') return
  scheduleOpen()
}

function onTriggerLeave() {
  if (props.trigger !== 'hover') return
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

function onDocumentClick(event: MouseEvent) {
  if (!resolvedVisible.value || props.trigger !== 'click') return
  const target = event.target as Node
  if (triggerRef.value?.contains(target)) return
  if (popperRef.value?.contains(target)) return
  close()
}

function onKeydown(event: KeyboardEvent) {
  if (event.key === 'Escape' && resolvedVisible.value) close()
}

function onScrollOrResize() {
  if (resolvedVisible.value) updatePosition()
}

watch(resolvedVisible, async (value) => {
  if (value) {
    emit('show')
    await nextTick()
    updatePosition()
  } else {
    emit('hide')
  }
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

defineExpose({ show: open, hide: close })
</script>

<template>
  <span
    ref="triggerRef"
    :class="ns.b()"
    @click="onTriggerClick"
    @mouseenter="onTriggerEnter"
    @mouseleave="onTriggerLeave"
  >
    <slot />
  </span>
  <Teleport to="body">
    <div
      v-show="resolvedVisible && !disabled"
      ref="popperRef"
      :class="[ns.e('popper'), ns.m(placement)]"
      :style="popperStyle"
      role="dialog"
      @mouseenter="onPopperEnter"
      @mouseleave="onPopperLeave"
      @click.stop
    >
      <div v-if="title || $slots.title" :class="ns.e('title')">
        <slot name="title">{{ title }}</slot>
      </div>
      <div :class="ns.e('body')">
        <slot name="content">{{ content }}</slot>
      </div>
    </div>
  </Teleport>
</template>
