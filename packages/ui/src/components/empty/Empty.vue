<script setup lang="ts">
import { computed } from 'vue'
import { useLocale } from '../../locale'
import { useNamespace } from '../../hooks/useNamespace'
import './style.css'

defineOptions({ name: 'DanEmpty' })

const props = withDefaults(
  defineProps<{
    description?: string
    imageSize?: number
  }>(),
  {
    description: undefined,
    imageSize: 96,
  },
)

const ns = useNamespace('empty')
const { t } = useLocale()
const resolvedDescription = computed(
  () => props.description ?? t('empty.description'),
)
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
      <slot name="description">{{ resolvedDescription }}</slot>
    </div>
    <div v-if="$slots.default" :class="ns.e('extra')">
      <slot />
    </div>
  </div>
</template>
