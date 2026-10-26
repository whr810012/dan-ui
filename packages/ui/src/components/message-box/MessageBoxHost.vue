<script setup lang="ts">
import { onBeforeUnmount, onMounted } from 'vue'
import { useNamespace } from '../../hooks/useNamespace'
import { DanButton } from '../button'
import { DanIcon } from '../icon'
import type { MessageBoxAction, MessageBoxOptions } from './types'
import './style.css'

defineOptions({ name: 'DanMessageBoxHost' })

const props = withDefaults(
  defineProps<
    MessageBoxOptions & {
      visible?: boolean
      boxType?: 'alert' | 'confirm'
    }
  >(),
  {
    title: '提示',
    message: '',
    type: 'info',
    confirmText: '确定',
    cancelText: '取消',
    showCancel: false,
    showConfirm: true,
    closeOnClickModal: false,
    closeOnPressEscape: true,
    visible: true,
    boxType: 'alert',
  },
)

const emit = defineEmits<{
  action: [action: MessageBoxAction]
}>()

const ns = useNamespace('message-box')

function done(action: MessageBoxAction) {
  emit('action', action)
}

function onMaskClick() {
  if (props.closeOnClickModal) done('close')
}

function onKeydown(event: KeyboardEvent) {
  if (event.key === 'Escape' && props.closeOnPressEscape) done('close')
}

onMounted(() => {
  document.addEventListener('keydown', onKeydown)
  document.body.style.overflow = 'hidden'
})

onBeforeUnmount(() => {
  document.removeEventListener('keydown', onKeydown)
  document.body.style.overflow = ''
})
</script>

<template>
  <div :class="ns.b()">
    <div :class="ns.e('mask')" @click="onMaskClick" />
    <div
      :class="ns.e('panel')"
      role="alertdialog"
      aria-modal="true"
      @click.stop
    >
      <header :class="ns.e('header')">
        <span :class="[ns.e('icon'), ns.em('icon', type)]" aria-hidden="true" />
        <span :class="ns.e('title')">{{ title }}</span>
        <button
          type="button"
          :class="ns.e('close')"
          aria-label="关闭"
          @click="done('close')"
        >
          <DanIcon name="close" />
        </button>
      </header>
      <div :class="ns.e('body')">{{ message }}</div>
      <footer :class="ns.e('footer')">
        <DanButton
          v-if="showCancel || boxType === 'confirm'"
          @click="done('cancel')"
        >
          {{ cancelText }}
        </DanButton>
        <DanButton v-if="showConfirm" type="primary" @click="done('confirm')">
          {{ confirmText }}
        </DanButton>
      </footer>
    </div>
  </div>
</template>
