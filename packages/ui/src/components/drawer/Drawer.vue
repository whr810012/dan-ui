<script setup lang="ts">
import { computed, onBeforeUnmount, ref, watch } from 'vue'
import { useFocusTrap } from '../../hooks/useFocusTrap'
import { useNamespace } from '../../hooks/useNamespace'
import { DanIcon } from '../icon'
import './style.css'

defineOptions({ name: 'DanDrawer' })

const props = withDefaults(
  defineProps<{
    modelValue?: boolean
    title?: string
    size?: string
    direction?: 'rtl' | 'ltr' | 'ttb' | 'btt'
    showClose?: boolean
    closeOnClickModal?: boolean
    closeOnPressEscape?: boolean
    destroyOnClose?: boolean
    withHeader?: boolean
    /** 拖拽边缘调整宽/高 */
    resizable?: boolean
    minSize?: number
  }>(),
  {
    modelValue: false,
    title: '',
    size: '30%',
    direction: 'rtl',
    showClose: true,
    closeOnClickModal: true,
    closeOnPressEscape: true,
    destroyOnClose: false,
    withHeader: true,
    resizable: false,
    minSize: 200,
  },
)

const emit = defineEmits<{
  'update:modelValue': [value: boolean]
  'update:size': [value: string]
  open: []
  close: []
  'size-change': [value: string]
}>()

const ns = useNamespace('drawer')
const panelRef = ref<HTMLElement | null>(null)
const titleId = `dan-drawer-title-${Math.random().toString(36).slice(2, 9)}`
const rendered = computed(() => props.modelValue || !props.destroyOnClose)
const resizing = ref(false)
const sizePx = ref<number | null>(null)
useFocusTrap(panelRef, () => props.modelValue)

const isVertical = computed(
  () => props.direction === 'ttb' || props.direction === 'btt',
)

const resolvedSize = computed(() => {
  if (sizePx.value != null) return `${sizePx.value}px`
  return props.size
})

const panelStyle = computed(() =>
  isVertical.value
    ? { height: resolvedSize.value }
    : { width: resolvedSize.value },
)

watch(
  () => props.size,
  () => {
    sizePx.value = null
  },
)

function close() {
  emit('update:modelValue', false)
  emit('close')
}

function onMaskClick() {
  if (props.closeOnClickModal) close()
}

function onKeydown(event: KeyboardEvent) {
  if (event.key === 'Escape' && props.closeOnPressEscape && props.modelValue) {
    close()
  }
}

function clampSize(value: number) {
  const max = isVertical.value
    ? window.innerHeight - 48
    : window.innerWidth - 48
  return Math.min(Math.max(value, props.minSize), max)
}

function onResizePointerDown(event: PointerEvent) {
  if (!props.resizable || !props.modelValue) return
  const panel = panelRef.value
  if (!panel) return
  event.preventDefault()
  event.stopPropagation()

  const rect = panel.getBoundingClientRect()
  const startSize = isVertical.value ? rect.height : rect.width
  const startPos = isVertical.value ? event.clientY : event.clientX
  resizing.value = true

  const onMove = (ev: PointerEvent) => {
    const delta = isVertical.value
      ? ev.clientY - startPos
      : ev.clientX - startPos
    let next = startSize
    if (props.direction === 'rtl') next = startSize - delta
    else if (props.direction === 'ltr') next = startSize + delta
    else if (props.direction === 'ttb') next = startSize + delta
    else next = startSize - delta
    sizePx.value = clampSize(next)
  }

  const onUp = () => {
    resizing.value = false
    document.removeEventListener('pointermove', onMove)
    document.removeEventListener('pointerup', onUp)
    if (sizePx.value == null) return
    const next = `${sizePx.value}px`
    emit('update:size', next)
    emit('size-change', next)
  }

  document.addEventListener('pointermove', onMove)
  document.addEventListener('pointerup', onUp)
}

watch(
  () => props.modelValue,
  (value) => {
    if (typeof document === 'undefined') return
    if (value) {
      emit('open')
      document.addEventListener('keydown', onKeydown)
      document.body.style.overflow = 'hidden'
    } else {
      document.removeEventListener('keydown', onKeydown)
      document.body.style.overflow = ''
    }
  },
)

onBeforeUnmount(() => {
  if (typeof document === 'undefined') return
  document.removeEventListener('keydown', onKeydown)
  document.body.style.overflow = ''
})
</script>

<template>
  <Teleport to="body">
    <div
      v-if="rendered"
      v-show="modelValue"
      :class="[ns.b(), ns.m(direction), ns.is('resizing', resizing)]"
    >
      <div :class="ns.e('mask')" @click="onMaskClick" />
      <aside
        ref="panelRef"
        :class="ns.e('panel')"
        role="dialog"
        aria-modal="true"
        :aria-labelledby="withHeader ? titleId : undefined"
        tabindex="-1"
        :style="panelStyle"
        @click.stop
      >
        <div
          v-if="resizable"
          :class="ns.e('resizer')"
          role="separator"
          :aria-orientation="isVertical ? 'horizontal' : 'vertical'"
          aria-label="调整抽屉大小"
          @pointerdown="onResizePointerDown"
        />
        <header v-if="withHeader" :class="ns.e('header')">
          <span :id="titleId" :class="ns.e('title')">
            <slot name="title">{{ title }}</slot>
          </span>
          <button
            v-if="showClose"
            type="button"
            :class="ns.e('close')"
            aria-label="关闭"
            @click="close"
          >
            <DanIcon name="close" />
          </button>
        </header>
        <div :class="ns.e('body')">
          <slot />
        </div>
        <footer v-if="$slots.footer" :class="ns.e('footer')">
          <slot name="footer" />
        </footer>
      </aside>
    </div>
  </Teleport>
</template>
