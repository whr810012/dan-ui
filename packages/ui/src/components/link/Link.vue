<script setup lang="ts">
import { computed } from 'vue'
import { useNamespace } from '../../hooks/useNamespace'
import './style.css'

defineOptions({ name: 'DanLink' })

const props = withDefaults(
  defineProps<{
    type?: 'default' | 'primary' | 'success' | 'warning' | 'danger' | 'info'
    href?: string
    target?: string
    disabled?: boolean
    underline?: boolean | 'hover'
  }>(),
  {
    type: 'default',
    disabled: false,
    underline: 'hover',
  },
)

const emit = defineEmits<{
  click: [event: MouseEvent]
}>()

const ns = useNamespace('link')

const underlineClass = computed(() => {
  if (props.underline === true) return ns.is('underline', true)
  if (props.underline === 'hover') return ns.is('underline-hover', true)
  return undefined
})

function onClick(event: MouseEvent) {
  if (props.disabled) {
    event.preventDefault()
    event.stopPropagation()
    return
  }
  emit('click', event)
}
</script>

<template>
  <a
    :class="[
      ns.b(),
      ns.m(type),
      underlineClass,
      ns.is('disabled', disabled),
    ]"
    :href="disabled ? undefined : href"
    :target="target"
    :rel="target === '_blank' ? 'noopener noreferrer' : undefined"
    :aria-disabled="disabled || undefined"
    :tabindex="disabled ? -1 : undefined"
    @click="onClick"
  >
    <slot />
  </a>
</template>
