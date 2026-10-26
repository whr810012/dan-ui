<script setup lang="ts">
import { useNamespace } from '../../hooks/useNamespace'
import './style.css'

defineOptions({ name: 'DanPrompt' })

defineProps<{
  title?: string
  description?: string
}>()

const emit = defineEmits<{
  click: []
}>()

const ns = useNamespace('prompt')
</script>

<template>
  <button type="button" :class="ns.b()" @click="emit('click')">
    <div :class="ns.e('title')">
      <slot name="title">{{ title }}</slot>
    </div>
    <div v-if="description || $slots.description" :class="ns.e('desc')">
      <slot name="description">{{ description }}</slot>
    </div>
  </button>
</template>
