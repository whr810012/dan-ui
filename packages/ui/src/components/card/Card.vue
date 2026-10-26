<script setup lang="ts">
import { useNamespace } from '../../hooks/useNamespace'
import './style.css'

defineOptions({ name: 'DanCard' })

withDefaults(
  defineProps<{
    header?: string
    shadow?: 'always' | 'hover' | 'never'
    bodyStyle?: Record<string, string>
  }>(),
  {
    header: '',
    shadow: 'always',
    bodyStyle: () => ({}),
  },
)

const ns = useNamespace('card')
</script>

<template>
  <div :class="[ns.b(), ns.m(`shadow-${shadow}`)]">
    <div v-if="header || $slots.header" :class="ns.e('header')">
      <slot name="header">{{ header }}</slot>
    </div>
    <div v-if="$slots.cover" :class="ns.e('cover')">
      <slot name="cover" />
    </div>
    <div :class="ns.e('body')" :style="bodyStyle">
      <slot />
    </div>
    <div v-if="$slots.footer" :class="ns.e('footer')">
      <slot name="footer" />
    </div>
  </div>
</template>
