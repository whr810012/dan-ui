<script setup lang="ts">
import { computed } from 'vue'
import { useNamespace } from '../../hooks/useNamespace'
import { injectSplitter } from './splitterContext'
import './style.css'

defineOptions({ name: 'DanSplitterPanel' })

const props = withDefaults(
  defineProps<{
    size?: number
    min?: number
  }>(),
  {
    size: 50,
    min: 10,
  },
)

const ns = useNamespace('splitter-panel')
const splitter = injectSplitter()
const index = splitter.register(props.size)

const panelStyle = computed(() => {
  const pct = splitter.sizes.value[index] ?? props.size
  if (splitter.layout.value === 'horizontal') {
    return { width: `${pct}%`, minWidth: `${props.min}%` }
  }
  return { height: `${pct}%`, minHeight: `${props.min}%` }
})
</script>

<template>
  <div
    v-if="index > 0"
    :class="ns.e('bar')"
    role="separator"
    :aria-orientation="
      splitter.layout.value === 'horizontal' ? 'vertical' : 'horizontal'
    "
    @mousedown="splitter.startResize(index - 1, $event)"
  />
  <div :class="ns.b()" :style="panelStyle">
    <slot />
  </div>
</template>
