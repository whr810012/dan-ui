<script setup lang="ts">
import { computed } from 'vue'
import { useNamespace } from '../../hooks/useNamespace'
import './style.css'

defineOptions({ name: 'DanHeader' })

const props = withDefaults(
  defineProps<{
    height?: string
  }>(),
  {
    height: '56px',
  },
)

const ns = useNamespace('header')
const style = computed(() => ({
  '--dan-header-height': props.height,
  height: props.height,
}))
</script>

<template>
  <header :class="ns.b()" :style="style">
    <slot />
  </header>
</template>
