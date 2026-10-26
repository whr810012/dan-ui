<script setup lang="ts">
import { computed, onBeforeUnmount, watch } from 'vue'
import { useNamespace } from '../../hooks/useNamespace'
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
    cancelText: '取消',
    confirmText: '确定',
    confirmLoading: false,
    destroyOnClose: false,
  },
)

const emit = defineEmits<{
  'update:modelValue': [value: boolean]
  open: []
  close: []
  cancel: []
  confirm: []
}>()

const ns = useNamespace('dialog')
const rendered = computed(() => props.modelValue || !props.destroyOnClose)

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
    <div v-if="rendered" v-show="modelValue" :class="ns.b()">
      <div :class="ns.e('mask')" @click="onMaskClick" />
      <div
        :class="ns.e('panel')"
        role="dialog"
        aria-modal="true"
        :style="{ width, marginTop: top }"
        @click.stop
      >
        <header :class="ns.e('header')">
          <span :class="ns.e('title')">
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
        <footer
          v-if="showCancel || showConfirm || $slots.footer"
          :class="ns.e('footer')"
        >
          <slot name="footer">
            <DanButton v-if="showCancel" @click="onCancel">{{
              cancelText
            }}</DanButton>
            <DanButton
              v-if="showConfirm"
              type="primary"
              :loading="confirmLoading"
              @click="onConfirm"
            >
              {{ confirmText }}
            </DanButton>
          </slot>
        </footer>
      </div>
    </div>
  </Teleport>
</template>
