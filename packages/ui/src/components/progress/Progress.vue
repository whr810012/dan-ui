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
    /** 百分比文字显示在条内（仅 line） */
    textInside?: boolean
    /** 条纹进度条（仅 line） */
    striped?: boolean
    /** 条纹流动动画，需同时开启 striped */
    stripedFlow?: boolean
    /** 不确定进度动画 */
    indeterminate?: boolean
    color?: string
    width?: number
  }>(),
  {
    percentage: 0,
    type: 'line',
    status: 'normal',
    strokeWidth: 8,
    showText: true,
    textInside: false,
    striped: false,
    stripedFlow: false,
    indeterminate: false,
    width: 120,
  },
)

const ns = useNamespace('progress')

const pct = computed(() =>
  Math.min(100, Math.max(0, Number(props.percentage) || 0)),
)

const statusType = computed(() => {
  if (props.status !== 'normal') return props.status
  if (!props.indeterminate && pct.value >= 100) return 'success'
  return 'normal'
})

const lineStroke = computed(() => {
  if (props.textInside && !props.indeterminate) {
    return Math.max(props.strokeWidth, 18)
  }
  return props.strokeWidth
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
const circleOffset = computed(() => {
  if (props.indeterminate) return circlePerimeter.value * 0.75
  return circlePerimeter.value * (1 - pct.value / 100)
})

const showOutsideText = computed(
  () =>
    props.showText &&
    props.type === 'line' &&
    !props.textInside &&
    !props.indeterminate,
)

const showInsideText = computed(
  () =>
    props.showText &&
    props.type === 'line' &&
    props.textInside &&
    !props.indeterminate,
)
</script>

<template>
  <div
    :class="[
      ns.b(),
      ns.m(type),
      ns.m(statusType),
      ns.is('text-inside', textInside && type === 'line'),
      ns.is('indeterminate', indeterminate),
    ]"
    role="progressbar"
    :aria-valuenow="indeterminate ? undefined : pct"
    :aria-valuemin="indeterminate ? undefined : 0"
    :aria-valuemax="indeterminate ? undefined : 100"
    :aria-busy="indeterminate || undefined"
  >
    <div v-if="type === 'line'" :class="ns.e('bar-wrap')">
      <div
        :class="ns.e('bar-outer')"
        :style="{ height: `${lineStroke}px` }"
      >
        <div
          :class="[
            ns.e('bar-inner'),
            ns.is('striped', striped),
            ns.is('striped-flow', striped && stripedFlow),
          ]"
          :style="{
            width: indeterminate ? undefined : `${pct}%`,
            backgroundColor: barColor,
          }"
        >
          <span v-if="showInsideText" :class="ns.e('inner-text')">
            <slot>{{ pct }}%</slot>
          </span>
        </div>
      </div>
      <span v-if="showOutsideText" :class="ns.e('text')">
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
        <g
          :class="ns.is('circle-spin', indeterminate)"
          :style="{ transformOrigin: `${width / 2}px ${width / 2}px` }"
        >
          <g :transform="`rotate(-90 ${width / 2} ${width / 2})`">
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
            />
          </g>
        </g>
      </svg>
      <span v-if="showText && !indeterminate" :class="ns.e('circle-text')">
        <slot>{{ pct }}%</slot>
      </span>
    </div>
  </div>
</template>
