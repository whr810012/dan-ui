<script setup lang="ts">
import { useNamespace } from '../../hooks/useNamespace'
import { DanIcon } from '../icon'
import './style.css'

defineOptions({ name: 'DanLoading' })

withDefaults(
  defineProps<{
    loading?: boolean
    text?: string
    fullscreen?: boolean
    background?: string
  }>(),
  {
    loading: true,
    text: '',
    fullscreen: false,
    background: '',
  },
)

const ns = useNamespace('loading')
</script>

<template>
  <div :class="[ns.b(), ns.is('fullscreen', fullscreen)]">
    <div :class="ns.e('target')">
      <slot />
    </div>
    <div
      v-if="loading"
      :class="ns.e('mask')"
      :style="background ? { background } : undefined"
    >
      <div :class="ns.e('spinner')">
        <DanIcon name="loading" :size="28" spin />
        <p v-if="text" :class="ns.e('text')">{{ text }}</p>
      </div>
    </div>
  </div>
</template>
