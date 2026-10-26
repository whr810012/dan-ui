<script setup lang="ts">
import { computed, onBeforeUnmount, ref } from 'vue'
import { useNamespace } from '../../hooks/useNamespace'
import { provideLayout } from './layoutContext'
import './style.css'

defineOptions({ name: 'DanLayout' })

const props = defineProps<{
  /** Force vertical stacking (header / main / footer). */
  direction?: 'horizontal' | 'vertical'
}>()

const ns = useNamespace('layout')
const asideCount = ref(0)

function registerAside() {
  asideCount.value += 1
}

function unregisterAside() {
  asideCount.value = Math.max(0, asideCount.value - 1)
}

const hasAside = computed(() => asideCount.value > 0)

provideLayout({
  hasAside,
  registerAside,
  unregisterAside,
})

const isVertical = computed(() => {
  if (props.direction) return props.direction === 'vertical'
  return !hasAside.value
})

onBeforeUnmount(() => {
  asideCount.value = 0
})
</script>

<template>
  <section
    :class="[
      ns.b(),
      ns.is('vertical', isVertical),
      ns.is('horizontal', !isVertical),
    ]"
  >
    <slot />
  </section>
</template>
