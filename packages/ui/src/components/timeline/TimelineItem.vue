<script setup lang="ts">
import { useNamespace } from '../../hooks/useNamespace'
import './style.css'

defineOptions({ name: 'DanTimelineItem' })

withDefaults(
  defineProps<{
    timestamp?: string
    type?: 'primary' | 'success' | 'warning' | 'danger' | 'info'
    hollow?: boolean
    /** 时间戳相对内容的位置 */
    placement?: 'top' | 'bottom'
  }>(),
  {
    timestamp: '',
    type: 'primary',
    hollow: false,
    placement: 'bottom',
  },
)

const ns = useNamespace('timeline-item')
</script>

<template>
  <li
    :class="[
      ns.b(),
      ns.m(type),
      ns.m(`placement-${placement}`),
      ns.is('hollow', hollow),
    ]"
  >
    <div :class="ns.e('tail')" />
    <div :class="ns.e('node')">
      <slot name="dot" />
    </div>
    <div :class="ns.e('wrapper')">
      <div
        v-if="(timestamp || $slots.timestamp) && placement === 'top'"
        :class="ns.e('timestamp')"
      >
        <slot name="timestamp">{{ timestamp }}</slot>
      </div>
      <div :class="ns.e('content')">
        <slot />
      </div>
      <div
        v-if="(timestamp || $slots.timestamp) && placement === 'bottom'"
        :class="ns.e('timestamp')"
      >
        <slot name="timestamp">{{ timestamp }}</slot>
      </div>
    </div>
  </li>
</template>
