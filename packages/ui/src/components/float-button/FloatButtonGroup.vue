<script setup lang="ts">
import { computed, ref } from 'vue'
import { useNamespace } from '../../hooks/useNamespace'
import { DanIcon } from '../icon'
import './style.css'

defineOptions({ name: 'DanFloatButtonGroup' })

const props = withDefaults(
  defineProps<{
    shape?: 'circle' | 'square'
    bottom?: number | string
    right?: number | string
  }>(),
  {
    shape: 'circle',
    bottom: 40,
    right: 40,
  },
)

const ns = useNamespace('float-button-group')
const open = ref(false)

const style = computed(() => ({
  bottom: typeof props.bottom === 'number' ? `${props.bottom}px` : props.bottom,
  right: typeof props.right === 'number' ? `${props.right}px` : props.right,
}))
</script>

<template>
  <div
    :class="[ns.b(), ns.m(shape), ns.is('open', open)]"
    :style="style"
  >
    <div v-show="open" :class="ns.e('list')">
      <slot />
    </div>
    <button
      type="button"
      :class="ns.e('trigger')"
      aria-label="悬浮按钮组"
      :aria-expanded="open"
      @click="open = !open"
    >
      <DanIcon :name="open ? 'close' : 'plus'" />
    </button>
  </div>
</template>
