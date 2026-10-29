<script setup lang="ts">
import { computed } from 'vue'
import { useNamespace } from '../../hooks/useNamespace'
import './style.css'

defineOptions({ name: 'DanText' })

const props = withDefaults(
  defineProps<{
    type?: 'default' | 'primary' | 'success' | 'warning' | 'danger' | 'info'
    size?: 'small' | 'default' | 'large'
    truncated?: boolean
    strong?: boolean
    italic?: boolean
    underline?: boolean
    delete?: boolean
    code?: boolean
    mark?: boolean
    disabled?: boolean
    tag?: string
  }>(),
  {
    type: 'default',
    size: 'default',
    truncated: false,
    strong: false,
    italic: false,
    underline: false,
    delete: false,
    code: false,
    mark: false,
    disabled: false,
    tag: 'span',
  },
)

const ns = useNamespace('text')

const componentTag = computed(() => {
  if (props.code) return 'code'
  if (props.mark) return 'mark'
  if (props.delete) return 'del'
  return props.tag
})
</script>

<template>
  <component
    :is="componentTag"
    :class="[
      ns.b(),
      ns.m(type),
      ns.m(size),
      ns.is('truncated', truncated),
      ns.is('strong', strong),
      ns.is('italic', italic),
      ns.is('underline', underline),
      ns.is('disabled', disabled),
      ns.is('code', code),
      ns.is('mark', mark),
    ]"
  >
    <slot />
  </component>
</template>
