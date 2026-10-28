<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { useNamespace } from '../../hooks/useNamespace'
import {
  calcPopupPosition,
  type PopupPlacement,
} from '../../utils/popupPosition'
import { DanButton } from '../button'
import './style.css'

defineOptions({ name: 'DanPopconfirm' })

const props = withDefaults(
  defineProps<{
    title?: string
    confirmText?: string
    cancelText?: string
    confirmType?: 'primary' | 'success' | 'warning' | 'danger' | 'info'
    placement?: PopupPlacement
    disabled?: boolean
    width?: string | number
    offset?: number
    visible?: boolean
  }>(),
  {
    title: '确定执行此操作？',
    confirmText: '确定',
    cancelText: '取消',
    confirmType: 'primary',
    placement: 'top',
    disabled: false,
    width: 220,
    offset: 8,
    visible: undefined,
  },
)

const emit = defineEmits<{
  'update:visible': [value: boolean]
  confirm: [event: MouseEvent]
  cancel: [event: MouseEvent]
  show: []
  hide: []
}>()

const ns = useNamespace('popconfirm')
const triggerRef = ref<HTMLElement | null>(null)
const popperRef = ref<HTMLElement | null>(null)
const innerVisible = ref(false)
const popperStyle = ref<Record<string, string>>({})

const isControlled = computed(() => props.visible !== undefined)
const resolvedVisible = computed(() =>
  isControlled.value ? Boolean(props.visible) : innerVisible.value,
)

const panelWidth = computed(() =>
  typeof props.width === 'number' ? `${props.width}px` : props.width,
)

function setVisible(value: boolean) {
  if (props.disabled && value) return
  if (isControlled.value) emit('update:visible', value)
  else innerVisible.value = value
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

function onTriggerClick() {
  if (resolvedVisible.value) close()
  else void open()
}

function onConfirm(event: MouseEvent) {
  emit('confirm', event)
  close()
}

function onCancel(event: MouseEvent) {
  emit('cancel', event)
  close()
}

function onDocumentClick(event: MouseEvent) {
  if (!resolvedVisible.value) return
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
  document.removeEventListener('click', onDocumentClick, true)
  document.removeEventListener('keydown', onKeydown)
  window.removeEventListener('scroll', onScrollOrResize, true)
  window.removeEventListener('resize', onScrollOrResize)
})

defineExpose({ show: open, hide: close })
</script>

<template>
  <span ref="triggerRef" :class="ns.b()" @click.stop="onTriggerClick">
    <slot />
  </span>
  <Teleport to="body">
    <div
      v-show="resolvedVisible && !disabled"
      ref="popperRef"
      :class="[ns.e('popper'), ns.m(placement)]"
      :style="popperStyle"
      role="dialog"
      aria-modal="false"
      @click.stop
    >
      <div :class="ns.e('title')">
        <slot name="title">{{ title }}</slot>
      </div>
      <div :class="ns.e('actions')">
        <DanButton size="small" @click="onCancel">{{ cancelText }}</DanButton>
        <DanButton size="small" :type="confirmType" @click="onConfirm">
          {{ confirmText }}
        </DanButton>
      </div>
    </div>
  </Teleport>
</template>
