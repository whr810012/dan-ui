<script setup lang="ts">
import { computed, ref } from 'vue'
import { useNamespace } from '../../hooks/useNamespace'
import { provideSplitter } from './splitterContext'
import './style.css'

defineOptions({ name: 'DanSplitter' })

const props = withDefaults(
  defineProps<{
    layout?: 'horizontal' | 'vertical'
  }>(),
  {
    layout: 'horizontal',
  },
)

const ns = useNamespace('splitter')
const rootRef = ref<HTMLElement | null>(null)
const sizes = ref<number[]>([])
const dragging = ref(false)
let nextIndex = 0

function register(defaultSize: number) {
  const index = nextIndex
  nextIndex += 1
  const next = [...sizes.value]
  next[index] = defaultSize
  sizes.value = next
  return index
}

function startResize(index: number, event: MouseEvent) {
  event.preventDefault()
  const root = rootRef.value
  if (!root) return
  dragging.value = true
  const startPos = props.layout === 'horizontal' ? event.clientX : event.clientY
  const startSizes = [...sizes.value]
  const total =
    props.layout === 'horizontal' ? root.clientWidth : root.clientHeight

  function onMove(e: MouseEvent) {
    const current = props.layout === 'horizontal' ? e.clientX : e.clientY
    const deltaPct = ((current - startPos) / total) * 100
    const leftBase = startSizes[index] ?? 50
    const rightBase = startSizes[index + 1] ?? 50
    const pair = leftBase + rightBase
    let left = leftBase + deltaPct
    left = Math.min(pair - 10, Math.max(10, left))
    const next = [...startSizes]
    next[index] = left
    next[index + 1] = pair - left
    sizes.value = next
  }

  function onUp() {
    dragging.value = false
    document.removeEventListener('mousemove', onMove)
    document.removeEventListener('mouseup', onUp)
  }

  document.addEventListener('mousemove', onMove)
  document.addEventListener('mouseup', onUp)
}

provideSplitter({
  layout: computed(() => props.layout),
  sizes,
  register,
  startResize,
})
</script>

<template>
  <div
    ref="rootRef"
    :class="[ns.b(), ns.m(layout), ns.is('dragging', dragging)]"
  >
    <slot />
  </div>
</template>
