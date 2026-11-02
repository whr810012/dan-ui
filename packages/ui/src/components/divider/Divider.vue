<script setup lang="ts">
import { computed } from 'vue'
import { useNamespace } from '../../hooks/useNamespace'
import './style.css'

defineOptions({ name: 'DanDivider' })

const props = withDefaults(
  defineProps<{
    direction?: 'horizontal' | 'vertical'
    contentPosition?: 'left' | 'center' | 'right'
    /** @deprecated 请使用 borderStyle="dashed" */
    dashed?: boolean
    borderStyle?: 'solid' | 'dashed' | 'dotted'
  }>(),
  {
    direction: 'horizontal',
    contentPosition: 'center',
    dashed: false,
    borderStyle: 'solid',
  },
)

const ns = useNamespace('divider')

const resolvedBorderStyle = computed(() => {
  if (props.dashed && props.borderStyle === 'solid') return 'dashed'
  return props.borderStyle
})
</script>

<template>
  <div
    role="separator"
    :class="[
      ns.b(),
      ns.m(direction),
      ns.m(`content-${contentPosition}`),
      ns.m(`style-${resolvedBorderStyle}`),
      ns.is('dashed', resolvedBorderStyle === 'dashed'),
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
