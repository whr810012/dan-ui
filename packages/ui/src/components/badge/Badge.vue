<script setup lang="ts">
import { computed } from 'vue'
import { useNamespace } from '../../hooks/useNamespace'
import './style.css'

defineOptions({ name: 'DanBadge' })

const props = withDefaults(
  defineProps<{
    value?: string | number
    max?: number
    isDot?: boolean
    hidden?: boolean
    /** 值为 0 时是否显示徽标 */
    showZero?: boolean
    /** 徽标相对右上角的偏移 [x, y]（px） */
    offset?: [number, number]
    type?: 'primary' | 'success' | 'warning' | 'danger' | 'info'
  }>(),
  {
    max: 99,
    isDot: false,
    hidden: false,
    showZero: false,
    offset: () => [0, 0],
    type: 'danger',
  },
)

const ns = useNamespace('badge')

const content = computed(() => {
  if (props.isDot) return ''
  if (props.value == null || props.value === '') return ''
  if (typeof props.value === 'number' && props.value > props.max) {
    return `${props.max}+`
  }
  return String(props.value)
})

const visible = computed(() => {
  if (props.hidden) return false
  if (props.isDot) return true
  if (props.value === 0 || props.value === '0') return props.showZero
  return content.value !== ''
})

const contentStyle = computed(() => {
  const [x = 0, y = 0] = props.offset || [0, 0]
  return {
    transform: `translate(calc(50% + ${x}px), calc(-50% + ${y}px))`,
  }
})
</script>

<template>
  <div :class="ns.b()">
    <slot />
    <sup
      v-if="visible"
      :class="[ns.e('content'), ns.m(type), ns.is('dot', isDot)]"
      :style="contentStyle"
    >
      {{ content }}
    </sup>
  </div>
</template>
