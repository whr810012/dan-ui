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

const style = computed(() => ({
  '--dan-descriptions-columns': String(props.column),
}))
</script>

<template>
  <div
    :class="[ns.b(), ns.m(size), ns.m(direction), ns.is('bordered', border)]"
    :style="style"
  >
    <div v-if="title || $slots.title" :class="ns.e('header')">
      <slot name="title">{{ title }}</slot>
    </div>
    <div :class="ns.e('body')">
      <slot />
    </div>
  </div>
</template>
