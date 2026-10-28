<script setup lang="ts">
import { computed } from 'vue'
import { useNamespace } from '../../hooks/useNamespace'
import { DanBadge } from '../badge'
import { DanIcon } from '../icon'
import type { IconName } from '../icon'
import './style.css'

defineOptions({ name: 'DanFloatButton' })

const props = withDefaults(
  defineProps<{
    type?: 'default' | 'primary'
    shape?: 'circle' | 'square'
    href?: string
    target?: string
    description?: string
    badge?: number | string
    icon?: IconName
    bottom?: number | string
    right?: number | string
  }>(),
  {
    type: 'default',
    shape: 'circle',
    description: '',
    icon: 'plus',
    bottom: 40,
    right: 40,
  },
)

const emit = defineEmits<{
  click: [event: MouseEvent]
}>()

const ns = useNamespace('float-button')

const style = computed(() => ({
  bottom: typeof props.bottom === 'number' ? `${props.bottom}px` : props.bottom,
  right: typeof props.right === 'number' ? `${props.right}px` : props.right,
}))

function onClick(event: MouseEvent) {
  emit('click', event)
}
</script>

<template>
  <component
    :is="href ? 'a' : 'button'"
    :class="[ns.b(), ns.m(type), ns.m(shape)]"
    :style="style"
    :href="href"
    :target="target"
    :type="href ? undefined : 'button'"
    @click="onClick"
  >
    <DanBadge v-if="badge != null && badge !== ''" :value="badge">
      <span :class="ns.e('icon')">
        <slot name="icon"><DanIcon :name="icon" /></slot>
      </span>
    </DanBadge>
    <span v-else :class="ns.e('icon')">
      <slot name="icon"><DanIcon :name="icon" /></slot>
    </span>
    <span v-if="description || $slots.default" :class="ns.e('desc')">
      <slot>{{ description }}</slot>
    </span>
  </component>
</template>
