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
    type?: 'primary' | 'success' | 'warning' | 'danger' | 'info'
  }>(),
  {
    max: 99,
    isDot: false,
    hidden: false,
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

const visible = computed(
  () => !props.hidden && (props.isDot || content.value !== ''),
)
</script>

<template>
  <div :class="ns.b()">
    <slot />
    <sup
      v-if="visible"
      :class="[ns.e('content'), ns.m(type), ns.is('dot', isDot)]"
    >
      {{ content }}
    </sup>
  </div>
</template>
