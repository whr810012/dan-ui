<script setup lang="ts">
import { computed } from 'vue'
import { useNamespace } from '../../hooks/useNamespace'
import { DanIcon } from '../icon'
import type { IconName } from '../icon'
import './style.css'

defineOptions({ name: 'DanResult' })

const props = withDefaults(
  defineProps<{
    title?: string
    subTitle?: string
    status?: 'success' | 'warning' | 'info' | 'error' | '404' | '403' | '500'
  }>(),
  {
    title: '',
    subTitle: '',
    status: 'info',
  },
)

const ns = useNamespace('result')

const iconName = computed<IconName>(() => {
  const map: Record<string, IconName> = {
    success: 'success',
    warning: 'warning',
    info: 'info',
    error: 'error',
    '404': 'search',
    '403': 'warning',
    '500': 'error',
  }
  return map[props.status] || 'info'
})

const statusClass = computed(() => {
  if (['404', '403', '500'].includes(props.status)) return 'error'
  return props.status
})
</script>

<template>
  <div :class="[ns.b(), ns.m(statusClass)]">
    <div :class="ns.e('icon')">
      <slot name="icon">
        <DanIcon :name="iconName" :size="56" />
      </slot>
    </div>
    <div v-if="title || $slots.title" :class="ns.e('title')">
      <slot name="title">{{ title }}</slot>
    </div>
    <div v-if="subTitle || $slots.subTitle" :class="ns.e('subtitle')">
      <slot name="subTitle">{{ subTitle }}</slot>
    </div>
    <div v-if="$slots.default" :class="ns.e('extra')">
      <slot />
    </div>
  </div>
</template>
