<script setup lang="ts">
import {
  Comment,
  Fragment,
  Text,
  computed,
  provide,
  toRef,
  useSlots,
  type VNode,
} from 'vue'
import { useNamespace } from '../../hooks/useNamespace'
import {
  avatarGroupContextKey,
  type AvatarShape,
  type AvatarSize,
} from './context'
import './style.css'

defineOptions({ name: 'DanAvatarGroup' })

const props = withDefaults(
  defineProps<{
    max?: number
    size?: AvatarSize
    shape?: AvatarShape
  }>(),
  {
    size: 'default',
    shape: 'circle',
  },
)

const ns = useNamespace('avatar-group')
const avatarNs = useNamespace('avatar')
const slots = useSlots()

provide(avatarGroupContextKey, {
  size: toRef(props, 'size'),
  shape: toRef(props, 'shape'),
})

function flatten(nodes: VNode[]): VNode[] {
  const result: VNode[] = []
  for (const node of nodes) {
    if (!node) continue
    if (node.type === Comment || node.type === Text) continue
    if (node.type === Fragment && Array.isArray(node.children)) {
      result.push(...flatten(node.children as VNode[]))
      continue
    }
    result.push(node)
  }
  return result
}

const allAvatars = computed(() => flatten(slots.default?.() ?? []))

const visibleAvatars = computed(() => {
  if (props.max == null || props.max <= 0) return allAvatars.value
  return allAvatars.value.slice(0, props.max)
})

const restCount = computed(() => {
  if (props.max == null || props.max <= 0) return 0
  return Math.max(0, allAvatars.value.length - props.max)
})

const restStyle = computed(() => {
  if (typeof props.size === 'number') {
    return {
      width: `${props.size}px`,
      height: `${props.size}px`,
      fontSize: `${Math.max(12, Math.round(props.size / 2.4))}px`,
    }
  }
  return undefined
})

const restSizeClass = computed(() =>
  typeof props.size === 'string' ? avatarNs.m(props.size) : undefined,
)
</script>

<template>
  <div :class="ns.b()">
    <component
      :is="node"
      v-for="(node, index) in visibleAvatars"
      :key="index"
    />
    <span
      v-if="restCount > 0"
      :class="[avatarNs.b(), restSizeClass, avatarNs.m(shape), ns.e('more')]"
      :style="restStyle"
    >
      +{{ restCount }}
    </span>
  </div>
</template>
