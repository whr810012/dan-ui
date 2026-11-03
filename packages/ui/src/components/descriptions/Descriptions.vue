<script setup lang="ts">
import { computed, provide, toRef } from 'vue'
import { useNamespace } from '../../hooks/useNamespace'
import { descriptionsContextKey } from './context'
import './style.css'

defineOptions({ name: 'DanDescriptions' })

const props = withDefaults(
  defineProps<{
    title?: string
    column?: number
    border?: boolean
    direction?: 'horizontal' | 'vertical'
    size?: 'small' | 'default' | 'large'
    /** 统一标签列宽，如 `120px` */
    labelWidth?: string | number
  }>(),
  {
    title: '',
    column: 3,
    border: false,
    direction: 'horizontal',
    size: 'default',
  },
)

const ns = useNamespace('descriptions')

provide(descriptionsContextKey, {
  border: toRef(props, 'border'),
  direction: toRef(props, 'direction'),
  column: toRef(props, 'column'),
})

const style = computed(() => {
  const result: Record<string, string> = {
    '--dan-descriptions-columns': String(props.column),
  }
  if (props.labelWidth != null) {
    result['--dan-descriptions-label-width'] =
      typeof props.labelWidth === 'number'
        ? `${props.labelWidth}px`
        : props.labelWidth
  }
  return result
})
</script>

<template>
  <div
    :class="[ns.b(), ns.m(size), ns.m(direction), ns.is('bordered', border)]"
    :style="style"
  >
    <div v-if="title || $slots.title || $slots.extra" :class="ns.e('header')">
      <div :class="ns.e('title')">
        <slot name="title">{{ title }}</slot>
      </div>
      <div v-if="$slots.extra" :class="ns.e('extra')">
        <slot name="extra" />
      </div>
    </div>
    <div :class="ns.e('body')">
      <slot />
    </div>
  </div>
</template>
