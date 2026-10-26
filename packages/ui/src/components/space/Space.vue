<script setup lang="ts">
import { computed } from 'vue'
import { useNamespace } from '../../hooks/useNamespace'
import './style.css'

defineOptions({ name: 'DanSpace' })

const props = withDefaults(
  defineProps<{
    direction?: 'horizontal' | 'vertical'
    size?: 'small' | 'default' | 'large' | number
    wrap?: boolean
    align?: 'start' | 'center' | 'end' | 'baseline' | 'stretch'
    justify?:
      | 'start'
      | 'end'
      | 'center'
      | 'space-around'
      | 'space-between'
      | 'space-evenly'
  }>(),
  {
    direction: 'horizontal',
    size: 'default',
    wrap: false,
    align: 'center',
    justify: 'start',
  },
)

const ns = useNamespace('space')

const gap = computed(() => {
  if (typeof props.size === 'number') return `${props.size}px`
  const map = { small: '8px', default: '12px', large: '16px' }
  return map[props.size]
})
</script>

<template>
  <div
    :class="[
      ns.b(),
      ns.m(direction),
      ns.is('wrap', wrap && direction === 'horizontal'),
    ]"
    :style="{
      gap,
      alignItems: align,
      justifyContent: justify,
    }"
  >
    <slot />
  </div>
</template>
