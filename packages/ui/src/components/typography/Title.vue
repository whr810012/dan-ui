<script setup lang="ts">
import { computed } from 'vue'
import { useNamespace } from '../../hooks/useNamespace'
import './style.css'

defineOptions({ name: 'DanTitle' })

const props = withDefaults(
  defineProps<{
    level?: 1 | 2 | 3 | 4 | 5 | 6
    type?: 'default' | 'primary' | 'success' | 'warning' | 'danger' | 'info'
    truncated?: boolean
  }>(),
  {
    level: 1,
    type: 'default',
    truncated: false,
  },
)

const ns = useNamespace('title')
const tag = computed(() => `h${props.level}`)
</script>

<template>
  <component
    :is="tag"
    :class="[
      ns.b(),
      ns.m(`h${level}`),
      ns.m(type),
      ns.is('truncated', truncated),
    ]"
  >
    <slot />
  </component>
</template>
