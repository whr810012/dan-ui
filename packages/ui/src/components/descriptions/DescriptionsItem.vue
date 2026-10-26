<script setup lang="ts">
import { computed, inject } from 'vue'
import { useNamespace } from '../../hooks/useNamespace'
import { descriptionsContextKey } from './context'
import './style.css'

defineOptions({ name: 'DanDescriptionsItem' })

const props = withDefaults(
  defineProps<{
    label?: string
    span?: number
  }>(),
  {
    label: '',
    span: 1,
  },
)

const ns = useNamespace('descriptions')
const ctx = inject(descriptionsContextKey, undefined)

const style = computed(() => {
  const columns = ctx?.column.value ?? 3
  const span = Math.min(props.span, columns)
  return {
    gridColumn: `span ${span}`,
  }
})
</script>

<template>
  <div :class="ns.e('item')" :style="style">
    <div :class="ns.e('label')">
      <slot name="label">{{ label }}</slot>
    </div>
    <div :class="ns.e('content')">
      <slot />
    </div>
  </div>
</template>
