<script setup lang="ts">
import { computed, toRef } from 'vue'
import { useNamespace } from '../../hooks/useNamespace'
import { provideRow } from './rowContext'
import './style.css'

defineOptions({ name: 'DanRow' })

const props = withDefaults(
  defineProps<{
    gutter?: number
    justify?:
      | 'start'
      | 'end'
      | 'center'
      | 'space-around'
      | 'space-between'
      | 'space-evenly'
    align?: 'top' | 'middle' | 'bottom' | 'stretch'
  }>(),
  {
    gutter: 0,
    justify: 'start',
    align: 'top',
  },
)

const ns = useNamespace('row')

provideRow({
  gutter: toRef(props, 'gutter'),
})

const style = computed(() => {
  if (!props.gutter) return undefined
  const margin = `-${props.gutter / 2}px`
  return {
    marginLeft: margin,
    marginRight: margin,
  }
})
</script>

<template>
  <div
    :class="[ns.b(), ns.is(`justify-${justify}`), ns.is(`align-${align}`)]"
    :style="style"
  >
    <slot />
  </div>
</template>
