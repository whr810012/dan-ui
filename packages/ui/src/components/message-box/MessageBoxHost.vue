<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, onMounted, ref } from 'vue'
import { useFocusTrap } from '../../hooks/useFocusTrap'
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
const panelRef = ref<HTMLElement | null>(null)
const titleId = `dan-message-box-title-${Math.random().toString(36).slice(2, 9)}`
const bodyId = `dan-message-box-body-${Math.random().toString(36).slice(2, 9)}`
const trapActive = computed(() => props.visible !== false)

useFocusTrap(panelRef, trapActive)

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
  void nextTick(() => {
    const confirm = panelRef.value?.querySelector<HTMLElement>(
      '.dan-message-box__footer .dan-button--primary',
    )
    ;(confirm ?? panelRef.value)?.focus()
  })
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
      ref="panelRef"
      :class="ns.e('panel')"
      role="alertdialog"
      aria-modal="true"
      :aria-labelledby="titleId"
      :aria-describedby="bodyId"
      tabindex="-1"
      @click.stop
    >
      <header :class="ns.e('header')">
        <span :class="[ns.e('icon'), ns.em('icon', type)]" aria-hidden="true" />
        <span :id="titleId" :class="ns.e('title')">{{ title }}</span>
        <button
          type="button"
          :class="ns.e('close')"
          aria-label="关闭"
          @click="done('close')"
        >
          <DanIcon name="close" />
        </button>
      </header>
      <div :id="bodyId" :class="ns.e('body')">{{ message }}</div>
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
