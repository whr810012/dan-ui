<script setup lang="ts">
import { useNamespace } from '../../hooks/useNamespace'
import './style.css'

defineOptions({ name: 'DanTimelineItem' })

withDefaults(
  defineProps<{
    timestamp?: string
    type?: 'primary' | 'success' | 'warning' | 'danger' | 'info'
    hollow?: boolean
  }>(),
  {
    timestamp: '',
    type: 'primary',
    hollow: false,
  },
)

const ns = useNamespace('timeline-item')
</script>

<template>
  <li :class="[ns.b(), ns.m(type), ns.is('hollow', hollow)]">
    <div :class="ns.e('tail')" />
    <div :class="ns.e('node')">
      <slot name="dot" />
    </div>
    <div :class="ns.e('wrapper')">
      <div :class="ns.e('content')">
        <slot />
      </div>
      <div v-if="timestamp || $slots.timestamp" :class="ns.e('timestamp')">
        <slot name="timestamp">{{ timestamp }}</slot>
      </div>
    </div>
  </li>
</template>
