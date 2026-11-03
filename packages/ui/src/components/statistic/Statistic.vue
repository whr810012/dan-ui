<script setup lang="ts">
import { computed } from 'vue'
import { useNamespace } from '../../hooks/useNamespace'
import './style.css'

defineOptions({ name: 'DanStatistic' })

const props = withDefaults(
  defineProps<{
    title?: string
    value?: string | number
    prefix?: string
    suffix?: string
    precision?: number
    /** 千分位分隔符，传空字符串可关闭 */
    groupSeparator?: string
    /** 小数点字符 */
    decimalSeparator?: string
    /** 自定义格式化；优先于分隔符逻辑 */
    formatter?: (value: string | number) => string
    valueStyle?: Record<string, string>
  }>(),
  {
    title: '',
    value: 0,
    prefix: '',
    suffix: '',
    precision: 0,
    groupSeparator: ',',
    decimalSeparator: '.',
  },
)

const ns = useNamespace('statistic')

function formatNumber(value: number): string {
  const fixed = value.toFixed(props.precision)
  const [intPart, fracPart] = fixed.split('.')
  const negative = intPart.startsWith('-')
  const digits = negative ? intPart.slice(1) : intPart
  const grouped = props.groupSeparator
    ? digits.replace(/\B(?=(\d{3})+(?!\d))/g, props.groupSeparator)
    : digits
  const signed = negative ? `-${grouped}` : grouped
  if (fracPart == null) return signed
  return `${signed}${props.decimalSeparator}${fracPart}`
}

const displayValue = computed(() => {
  if (props.formatter) return props.formatter(props.value)
  if (typeof props.value === 'number') return formatNumber(props.value)
  return props.value
})
</script>

<template>
  <div :class="ns.b()">
    <div v-if="title || $slots.title" :class="ns.e('title')">
      <slot name="title">{{ title }}</slot>
    </div>
    <div :class="ns.e('content')" :style="valueStyle">
      <span v-if="prefix || $slots.prefix" :class="ns.e('prefix')">
        <slot name="prefix">{{ prefix }}</slot>
      </span>
      <span :class="ns.e('value')">
        <slot>{{ displayValue }}</slot>
      </span>
      <span v-if="suffix || $slots.suffix" :class="ns.e('suffix')">
        <slot name="suffix">{{ suffix }}</slot>
      </span>
    </div>
  </div>
</template>
