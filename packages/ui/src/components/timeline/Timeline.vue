<script setup lang="ts">
import { useNamespace } from '../../hooks/useNamespace'
import type { TimelineMode } from './context'
import './style.css'

defineOptions({ name: 'DanTimeline' })

withDefaults(
  defineProps<{
    /** 时间轴排列：左 / 右 / 交替 */
    mode?: TimelineMode
  }>(),
  {
    mode: 'left',
  },
)

const ns = useNamespace('timeline')
</script>

<template>
  <ul :class="[ns.b(), ns.m(mode)]">
    <slot />
  </ul>
</template>
