<script setup lang="ts">
import { computed } from 'vue'
import { useNamespace } from '../../hooks/useNamespace'
import './style.css'

defineOptions({ name: 'DanFooter' })

const props = withDefaults(
  defineProps<{
    height?: string
  }>(),
  {
    height: '48px',
  },
)

const ns = useNamespace('footer')
const style = computed(() => ({
  '--dan-footer-height': props.height,
  height: props.height,
}))
</script>

<template>
  <footer :class="ns.b()" :style="style">
    <slot />
  </footer>
</template>
