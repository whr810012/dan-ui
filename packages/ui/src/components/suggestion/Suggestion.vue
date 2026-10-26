<script setup lang="ts">
import { useNamespace } from '../../hooks/useNamespace'
import './style.css'

defineOptions({ name: 'DanSuggestion' })

withDefaults(
  defineProps<{
    items?: string[]
  }>(),
  {
    items: () => [],
  },
)

const emit = defineEmits<{
  select: [item: string]
}>()

const ns = useNamespace('suggestion')
</script>

<template>
  <div :class="ns.b()" role="list">
    <button
      v-for="item in items"
      :key="item"
      type="button"
      :class="ns.e('item')"
      role="listitem"
      @click="emit('select', item)"
    >
      {{ item }}
    </button>
    <slot />
  </div>
</template>
