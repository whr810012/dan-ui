<script setup lang="ts">
import { computed, ref } from 'vue'
import { useNamespace } from '../../hooks/useNamespace'
import { DanIcon } from '../icon'
import type { IconName } from '../icon'
import './style.css'

defineOptions({ name: 'DanAlert' })

const props = withDefaults(
  defineProps<{
    title?: string
    type?: 'success' | 'warning' | 'info' | 'error'
    description?: string
    closable?: boolean
    /** 自定义关闭按钮文案；有值时显示文字而非图标 */
    closeText?: string
    showIcon?: boolean
    /** 标题与描述居中 */
    center?: boolean
    effect?: 'light' | 'dark'
  }>(),
  {
    type: 'info',
    closable: false,
    showIcon: true,
    center: false,
    effect: 'light',
  },
)

const emit = defineEmits<{
  close: [event: MouseEvent]
}>()

const ns = useNamespace('alert')
const visible = ref(true)

const iconName = computed<IconName>(() => {
  const map: Record<string, IconName> = {
    success: 'success',
    warning: 'warning',
    info: 'info',
    error: 'error',
  }
  return map[props.type] || 'info'
})

const showClose = computed(() => props.closable || !!props.closeText)

function onClose(event: MouseEvent) {
  visible.value = false
  emit('close', event)
}
</script>

<template>
  <div
    v-if="visible"
    role="alert"
    :class="[
      ns.b(),
      ns.m(type),
      ns.m(effect),
      ns.is('with-description', !!description || !!$slots.default),
      ns.is('center', center),
    ]"
  >
    <DanIcon v-if="showIcon" :name="iconName" :class="ns.e('icon')" />
    <div :class="ns.e('content')">
      <div v-if="title || $slots.title" :class="ns.e('title')">
        <slot name="title">{{ title }}</slot>
      </div>
      <div v-if="description || $slots.default" :class="ns.e('description')">
        <slot>{{ description }}</slot>
      </div>
    </div>
    <button
      v-if="showClose"
      type="button"
      :class="[ns.e('close'), ns.is('text', !!closeText)]"
      :aria-label="closeText || '关闭'"
      @click="onClose"
    >
      <template v-if="closeText">{{ closeText }}</template>
      <DanIcon v-else name="close" :size="14" />
    </button>
  </div>
</template>
