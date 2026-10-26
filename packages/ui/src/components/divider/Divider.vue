<script setup lang="ts">
import { useNamespace } from '../../hooks/useNamespace'
import './style.css'

defineOptions({ name: 'DanDivider' })

withDefaults(
  defineProps<{
    direction?: 'horizontal' | 'vertical'
    contentPosition?: 'left' | 'center' | 'right'
    dashed?: boolean
  }>(),
  {
    direction: 'horizontal',
    contentPosition: 'center',
    dashed: false,
  },
)

const ns = useNamespace('divider')
</script>

<template>
  <div
    role="separator"
    :class="[
      ns.b(),
      ns.m(direction),
      ns.m(`content-${contentPosition}`),
      ns.is('dashed', dashed),
    ]"
  >
    <span
      v-if="$slots.default && direction === 'horizontal'"
      :class="ns.e('text')"
    >
      <slot />
    </span>
  </div>
</template>
