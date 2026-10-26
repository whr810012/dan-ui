<script setup lang="ts">
import { computed } from 'vue'
import { useNamespace } from '../../hooks/useNamespace'
import { injectRow } from '../row/rowContext'
import './style.css'

defineOptions({ name: 'DanCol' })

const props = withDefaults(
  defineProps<{
    span?: number
    offset?: number
  }>(),
  {
    span: 24,
    offset: 0,
  },
)

const ns = useNamespace('col')
const row = injectRow({
  gutter: computed(() => 0),
})

const style = computed(() => {
  const gutter = row.gutter.value
  if (!gutter) return undefined
  return {
    paddingLeft: `${gutter / 2}px`,
    paddingRight: `${gutter / 2}px`,
  }
})

const classes = computed(() => {
  const list = [ns.b()]
  if (props.span >= 0) list.push(ns.b(`span-${props.span}`))
  if (props.offset > 0) list.push(ns.b(`offset-${props.offset}`))
  return list
})
</script>

<template>
  <div :class="classes" :style="style">
    <slot />
  </div>
</template>
