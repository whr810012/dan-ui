<script setup lang="ts">
import { computed } from 'vue'
import { useNamespace } from '../../hooks/useNamespace'
import './style.css'

defineOptions({ name: 'DanProgress' })

const props = withDefaults(
  defineProps<{
    percentage?: number
    type?: 'line' | 'circle'
    status?: 'normal' | 'success' | 'warning' | 'exception'
    strokeWidth?: number
    showText?: boolean
    color?: string
    width?: number
  }>(),
  {
    percentage: 0,
    type: 'line',
    status: 'normal',
    strokeWidth: 8,
    showText: true,
    width: 120,
  },
)

const ns = useNamespace('progress')

const pct = computed(() =>
  Math.min(100, Math.max(0, Number(props.percentage) || 0)),
)

const statusType = computed(() => {
  if (props.status !== 'normal') return props.status
  if (pct.value >= 100) return 'success'
  return 'normal'
})

const barColor = computed(() => {
  if (props.color) return props.color
  const map = {
    normal: 'var(--dan-color-primary)',
    success: 'var(--dan-color-success)',
    warning: 'var(--dan-color-warning)',
    exception: 'var(--dan-color-danger)',
  }
  return map[statusType.value]
})

const circleRadius = computed(() => (props.width - props.strokeWidth) / 2)
const circlePerimeter = computed(() => 2 * Math.PI * circleRadius.value)
const circleOffset = computed(
  () => circlePerimeter.value * (1 - pct.value / 100),
)
</script>

<template>
  <div
    :class="[ns.b(), ns.m(type), ns.m(statusType)]"
    role="progressbar"
    :aria-valuenow="pct"
    aria-valuemin="0"
    aria-valuemax="100"
  >
    <div v-if="type === 'line'" :class="ns.e('bar-wrap')">
      <div :class="ns.e('bar-outer')" :style="{ height: `${strokeWidth}px` }">
        <div
          :class="ns.e('bar-inner')"
          :style="{ width: `${pct}%`, background: barColor }"
        />
      </div>
      <span v-if="showText" :class="ns.e('text')">
        <slot>{{ pct }}%</slot>
      </span>
    </div>

    <div
      v-else
      :class="ns.e('circle')"
      :style="{ width: `${width}px`, height: `${width}px` }"
    >
      <svg :viewBox="`0 0 ${width} ${width}`">
        <circle
          :class="ns.e('circle-track')"
          :cx="width / 2"
          :cy="width / 2"
          :r="circleRadius"
          fill="none"
          :stroke-width="strokeWidth"
        />
        <circle
          :class="ns.e('circle-path')"
          :cx="width / 2"
          :cy="width / 2"
          :r="circleRadius"
          fill="none"
          :stroke="barColor"
          :stroke-width="strokeWidth"
          stroke-linecap="round"
          :stroke-dasharray="circlePerimeter"
          :stroke-dashoffset="circleOffset"
          :transform="`rotate(-90 ${width / 2} ${width / 2})`"
        />
      </svg>
      <span v-if="showText" :class="ns.e('circle-text')">
        <slot>{{ pct }}%</slot>
      </span>
    </div>
  </div>
</template>
