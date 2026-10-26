<script setup lang="ts">
import { computed, onBeforeUnmount, watch } from 'vue'
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
  },
)

const emit = defineEmits<{
  'update:modelValue': [value: boolean]
  open: []
  close: []
}>()

const ns = useNamespace('drawer')
const rendered = computed(() => props.modelValue || !props.destroyOnClose)

const panelStyle = computed(() => {
  const isVertical = props.direction === 'ttb' || props.direction === 'btt'
  return isVertical ? { height: props.size } : { width: props.size }
})

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
    <div v-if="rendered" v-show="modelValue" :class="[ns.b(), ns.m(direction)]">
      <div :class="ns.e('mask')" @click="onMaskClick" />
      <aside
        :class="ns.e('panel')"
        role="dialog"
        aria-modal="true"
        :style="panelStyle"
        @click.stop
      >
        <header v-if="withHeader" :class="ns.e('header')">
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
        <footer v-if="$slots.footer" :class="ns.e('footer')">
          <slot name="footer" />
        </footer>
      </aside>
    </div>
  </Teleport>
</template>
