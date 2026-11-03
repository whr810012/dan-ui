<script setup lang="ts">
import { computed, inject, ref, watch } from 'vue'
import { useNamespace } from '../../hooks/useNamespace'
import {
  avatarGroupContextKey,
  type AvatarShape,
  type AvatarSize,
} from './context'
import './style.css'

defineOptions({ name: 'DanAvatar' })

const props = withDefaults(
  defineProps<{
    src?: string
    alt?: string
    size?: AvatarSize
    shape?: AvatarShape
    fit?: 'fill' | 'contain' | 'cover' | 'none' | 'scale-down'
  }>(),
  {
    alt: '',
    size: undefined,
    shape: undefined,
    fit: 'cover',
  },
)

const ns = useNamespace('avatar')
const group = inject(avatarGroupContextKey, undefined)
const hasError = ref(false)

watch(
  () => props.src,
  () => {
    hasError.value = false
  },
)

const resolvedSize = computed<AvatarSize>(
  () => props.size ?? group?.size.value ?? 'default',
)
const resolvedShape = computed<AvatarShape>(
  () => props.shape ?? group?.shape.value ?? 'circle',
)

const sizeStyle = computed(() => {
  if (typeof resolvedSize.value === 'number') {
    return {
      width: `${resolvedSize.value}px`,
      height: `${resolvedSize.value}px`,
      fontSize: `${Math.max(12, Math.round(resolvedSize.value / 2.4))}px`,
    }
  }
  return undefined
})

const sizeClass = computed(() =>
  typeof resolvedSize.value === 'string' ? ns.m(resolvedSize.value) : undefined,
)
</script>

<template>
  <span
    :class="[ns.b(), sizeClass, ns.m(resolvedShape)]"
    :style="sizeStyle"
  >
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
