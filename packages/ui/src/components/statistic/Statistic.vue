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
    valueStyle?: Record<string, string>
  }>(),
  {
    title: '',
    value: 0,
    prefix: '',
    suffix: '',
    precision: 0,
  },
)

const ns = useNamespace('statistic')

const displayValue = computed(() => {
  if (typeof props.value === 'number') {
    return props.value.toFixed(props.precision)
  }
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
