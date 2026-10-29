<script setup lang="ts">
import { computed } from 'vue'
import { useLocale } from '../../locale'
import { useNamespace } from '../../hooks/useNamespace'
import './style.css'

defineOptions({ name: 'DanEmpty' })

type EmptyType = 'default' | 'search' | 'network' | 'permission'

const props = withDefaults(
  defineProps<{
    description?: string
    imageSize?: number
    /** 自定义图片 URL；优先于内置插画 */
    image?: string
    /** 内置空态类型 */
    type?: EmptyType
  }>(),
  {
    description: undefined,
    imageSize: 96,
    image: '',
    type: 'default',
  },
)

const ns = useNamespace('empty')
const { t } = useLocale()

const typeDescription = computed(() => {
  const map: Record<EmptyType, string> = {
    default: t('empty.description'),
    search: '没有找到相关结果',
    network: '网络异常，请稍后重试',
    permission: '暂无访问权限',
  }
  return map[props.type] || map.default
})

const resolvedDescription = computed(
  () => props.description ?? typeDescription.value,
)
</script>

<template>
  <div :class="[ns.b(), ns.m(type)]">
    <div :class="ns.e('image')" :style="{ width: `${imageSize}px` }">
      <slot name="image">
        <img
          v-if="image"
          :src="image"
          alt=""
          :class="ns.e('img')"
        />
        <svg
          v-else-if="type === 'search'"
          viewBox="0 0 96 72"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <circle
            cx="40"
            cy="32"
            r="16"
            fill="none"
            stroke="var(--dan-color-border)"
            stroke-width="4"
          />
          <path
            d="M52 44 L68 58"
            stroke="var(--dan-color-border)"
            stroke-width="4"
            stroke-linecap="round"
          />
          <rect
            x="18"
            y="54"
            width="48"
            height="6"
            rx="3"
            fill="var(--dan-color-fill)"
          />
        </svg>
        <svg
          v-else-if="type === 'network'"
          viewBox="0 0 96 72"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <path
            d="M28 48 C20 40 20 28 32 24 C36 14 56 12 62 24 C74 26 78 40 68 48"
            fill="none"
            stroke="var(--dan-color-border)"
            stroke-width="4"
            stroke-linecap="round"
          />
          <path
            d="M36 36 L60 50 M60 36 L36 50"
            stroke="var(--dan-color-danger, #ef4444)"
            stroke-width="3"
            stroke-linecap="round"
          />
        </svg>
        <svg
          v-else-if="type === 'permission'"
          viewBox="0 0 96 72"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <rect
            x="30"
            y="30"
            width="36"
            height="28"
            rx="4"
            fill="var(--dan-color-fill)"
            stroke="var(--dan-color-border)"
          />
          <path
            d="M38 30 V24 C38 16 58 16 58 24 V30"
            fill="none"
            stroke="var(--dan-color-border)"
            stroke-width="4"
            stroke-linecap="round"
          />
          <circle cx="48" cy="44" r="3" fill="var(--dan-color-border)" />
        </svg>
        <svg
          v-else
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
