<script setup lang="ts">
import { computed, onBeforeUnmount, ref, watch } from 'vue'
import { useFocusTrap } from '../../hooks/useFocusTrap'
import { useNamespace } from '../../hooks/useNamespace'
import { useLocale } from '../../locale'
import { DanButton } from '../button'
import { DanIcon } from '../icon'
import './style.css'

defineOptions({ name: 'DanDialog' })

const props = withDefaults(
  defineProps<{
    modelValue?: boolean
    title?: string
    width?: string
    top?: string
    showClose?: boolean
    closeOnClickModal?: boolean
    closeOnPressEscape?: boolean
    showCancel?: boolean
    showConfirm?: boolean
    cancelText?: string
    confirmText?: string
    confirmLoading?: boolean
    destroyOnClose?: boolean
    /** 垂直居中（忽略 top） */
    alignCenter?: boolean
    /** 拖拽标题栏移动 */
    draggable?: boolean
  }>(),
  {
    modelValue: false,
    title: '',
    width: '480px',
    top: '15vh',
    showClose: true,
    closeOnClickModal: true,
    closeOnPressEscape: true,
    showCancel: true,
    showConfirm: true,
    confirmLoading: false,
    destroyOnClose: false,
    alignCenter: false,
    draggable: false,
  },
)

const { t } = useLocale()
const resolvedCancelText = computed(
  () => props.cancelText ?? t('dialog.cancel'),
)
const resolvedConfirmText = computed(
  () => props.confirmText ?? t('dialog.confirm'),
)

const emit = defineEmits<{
  'update:modelValue': [value: boolean]
  open: []
  close: []
  cancel: []
  confirm: []
}>()

const ns = useNamespace('dialog')
const panelRef = ref<HTMLElement | null>(null)
const titleId = `dan-dialog-title-${Math.random().toString(36).slice(2, 9)}`
const rendered = computed(() => props.modelValue || !props.destroyOnClose)
const dragging = ref(false)
const offset = ref({ x: 0, y: 0 })
useFocusTrap(panelRef, () => props.modelValue)

const panelStyle = computed(() => {
  const style: Record<string, string> = {
    width: props.width,
    transform: `translate(${offset.value.x}px, ${offset.value.y}px)`,
  }
  if (!props.alignCenter) {
    style.marginTop = props.top
  }
  return style
})

function close() {
  emit('update:modelValue', false)
  emit('close')
}

function onCancel() {
  emit('cancel')
  close()
}

function onConfirm() {
  emit('confirm')
}

function onMaskClick() {
  if (props.closeOnClickModal) close()
}

function onKeydown(event: KeyboardEvent) {
  if (event.key === 'Escape' && props.closeOnPressEscape && props.modelValue) {
    close()
  }
}

function onDragPointerDown(event: PointerEvent) {
  if (!props.draggable || !props.modelValue) return
  const target = event.target as HTMLElement | null
  if (target?.closest('button, a, input, textarea, select')) return
  event.preventDefault()

  const startX = event.clientX
  const startY = event.clientY
  const origin = { ...offset.value }
  dragging.value = true

  const onMove = (ev: PointerEvent) => {
    offset.value = {
      x: origin.x + (ev.clientX - startX),
      y: origin.y + (ev.clientY - startY),
    }
  }

  const onUp = () => {
    dragging.value = false
    document.removeEventListener('pointermove', onMove)
    document.removeEventListener('pointerup', onUp)
  }

  document.addEventListener('pointermove', onMove)
  document.addEventListener('pointerup', onUp)
}

watch(
  () => props.modelValue,
  (value) => {
    if (typeof document === 'undefined') return
    if (value) {
      offset.value = { x: 0, y: 0 }
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
      :class="[
        ns.b(),
        ns.is('align-center', alignCenter),
        ns.is('dragging', dragging),
      ]"
    >
      <div :class="ns.e('mask')" @click="onMaskClick" />
      <div
        ref="panelRef"
        :class="[ns.e('panel'), ns.is('draggable', draggable)]"
        role="dialog"
        aria-modal="true"
        :aria-labelledby="titleId"
        tabindex="-1"
        :style="panelStyle"
        @click.stop
      >
        <header
          :class="[ns.e('header'), ns.is('draggable', draggable)]"
          @pointerdown="onDragPointerDown"
        >
          <span :id="titleId" :class="ns.e('title')">
            <slot name="title">{{ title }}</slot>
          </span>
          <button
            v-if="showClose"
            type="button"
            :class="ns.e('close')"
            :aria-label="t('common.close')"
            @click="close"
          >
            <DanIcon name="close" />
          </button>
        </header>
        <div :class="ns.e('body')">
          <slot />
        </div>
        <footer
          v-if="showCancel || showConfirm || $slots.footer"
          :class="ns.e('footer')"
        >
          <slot name="footer">
            <DanButton v-if="showCancel" @click="onCancel">
              {{ resolvedCancelText }}
            </DanButton>
            <DanButton
              v-if="showConfirm"
              type="primary"
              :loading="confirmLoading"
              @click="onConfirm"
            >
              {{ resolvedConfirmText }}
            </DanButton>
          </slot>
        </footer>
      </div>
    </div>
  </Teleport>
</template>
