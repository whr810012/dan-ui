<script setup lang="ts">
import { useNamespace } from '../../hooks/useNamespace'
import './style.css'

defineOptions({ name: 'DanParagraph' })

withDefaults(
  defineProps<{
    type?: 'default' | 'primary' | 'success' | 'warning' | 'danger' | 'info'
    spacing?: 'default' | 'tight' | 'loose'
  }>(),
  {
    type: 'default',
    spacing: 'default',
  },
)

const ns = useNamespace('paragraph')
</script>

<template>
  <p
    :class="[
      ns.b(),
      ns.m(type),
      ns.m(spacing),
    ]"
  >
    <slot />
  </p>
</template>
