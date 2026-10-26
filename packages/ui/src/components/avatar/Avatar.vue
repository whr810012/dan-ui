<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { useNamespace } from '../../hooks/useNamespace'
import './style.css'

defineOptions({ name: 'DanAvatar' })

const props = withDefaults(
  defineProps<{
    src?: string
    alt?: string
    size?: number | 'small' | 'default' | 'large'
    shape?: 'circle' | 'square'
    fit?: 'fill' | 'contain' | 'cover' | 'none' | 'scale-down'
  }>(),
  {
    alt: '',
    size: 'default',
    shape: 'circle',
    fit: 'cover',
  },
)

const ns = useNamespace('avatar')
const hasError = ref(false)

watch(
  () => props.src,
  () => {
    hasError.value = false
  },
)

const sizeStyle = computed(() => {
  if (typeof props.size === 'number') {
    return {
      width: `${props.size}px`,
      height: `${props.size}px`,
      fontSize: `${Math.max(12, Math.round(props.size / 2.4))}px`,
    }
  }
  return undefined
})

const sizeClass = computed(() =>
  typeof props.size === 'string' ? ns.m(props.size) : undefined,
)
</script>

<template>
  <span :class="[ns.b(), sizeClass, ns.m(shape)]" :style="sizeStyle">
    <img
      v-if="src && !hasError"
      :class="ns.e('image')"
      :src="src"
      :alt="alt"
      :style="{ objectFit: fit }"
      @error="hasError = true"
    />
    <span v-else :class="ns.e('fallback')">
      <slot>{{ alt ? alt.slice(0, 1).toUpperCase() : '?' }}</slot>
    </span>
  </span>
</template>
