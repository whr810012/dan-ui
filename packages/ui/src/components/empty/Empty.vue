<script setup lang="ts">
import { useNamespace } from '../../hooks/useNamespace'
import './style.css'

defineOptions({ name: 'DanEmpty' })

withDefaults(
  defineProps<{
    description?: string
    imageSize?: number
  }>(),
  {
    description: '暂无数据',
    imageSize: 96,
  },
)

const ns = useNamespace('empty')
</script>

<template>
  <div :class="ns.b()">
    <div :class="ns.e('image')" :style="{ width: `${imageSize}px` }">
      <slot name="image">
        <svg
          viewBox="0 0 96 72"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <rect
            x="12"
            y="16"
            width="72"
            height="44"
            rx="6"
            fill="var(--dan-color-fill)"
            stroke="var(--dan-color-border)"
          />
          <path
            d="M24 48 L40 32 L52 42 L64 28 L72 48 Z"
            fill="var(--dan-color-border-light)"
            stroke="var(--dan-color-border)"
            stroke-linejoin="round"
          />
          <circle cx="34" cy="28" r="4" fill="var(--dan-color-border)" />
        </svg>
      </slot>
    </div>
    <div :class="ns.e('description')">
      <slot name="description">{{ description }}</slot>
    </div>
    <div v-if="$slots.default" :class="ns.e('extra')">
      <slot />
    </div>
  </div>
</template>
