<script setup lang="ts">
import { computed } from 'vue'
import { useNamespace } from '../../hooks/useNamespace'
import { iconMap, type IconName } from './icons'
import './style.css'

defineOptions({ name: 'DanIcon' })

const props = withDefaults(
  defineProps<{
    name?: IconName
    size?: number | string
    color?: string
    spin?: boolean
  }>(),
  {
    spin: false,
  },
)

const ns = useNamespace('icon')

const ResolvedIcon = computed(() =>
  props.name ? iconMap[props.name] : null,
)

const style = computed(() => {
  const result: Record<string, string> = {}
  if (props.size != null) {
    const size =
      typeof props.size === 'number' ? `${props.size}px` : props.size
    result.fontSize = size
    result.width = size
    result.height = size
  }
  if (props.color) {
    result.color = props.color
  }
  return result
})
</script>

<template>
  <i
    :class="[ns.b(), ns.is('spin', spin)]"
    :style="style"
    role="img"
  >
    <component :is="ResolvedIcon" v-if="ResolvedIcon" />
    <slot v-else />
  </i>
</template>
