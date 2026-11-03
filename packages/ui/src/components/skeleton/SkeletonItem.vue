<script setup lang="ts">
import { computed, inject } from 'vue'
import { useNamespace } from '../../hooks/useNamespace'
import { skeletonContextKey } from './context'
import './style.css'

defineOptions({ name: 'DanSkeletonItem' })

const props = withDefaults(
  defineProps<{
    variant?: 'text' | 'circle' | 'rect' | 'button' | 'image' | 'caption'
    width?: string | number
    height?: string | number
    animated?: boolean
  }>(),
  {
    variant: 'text',
  },
)

const ns = useNamespace('skeleton-item')
const ctx = inject(skeletonContextKey, undefined)

const isAnimated = computed(() => props.animated ?? ctx?.animated.value ?? true)

const style = computed(() => {
  const result: Record<string, string> = {}
  if (props.width != null) {
    result.width =
      typeof props.width === 'number' ? `${props.width}px` : props.width
  }
  if (props.height != null) {
    result.height =
      typeof props.height === 'number' ? `${props.height}px` : props.height
  }
  return result
})
</script>

<template>
  <div
    :class="[ns.b(), ns.m(variant), ns.is('animated', isAnimated)]"
    :style="style"
  />
</template>
