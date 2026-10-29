<script setup lang="ts">
import { useNamespace } from '../../hooks/useNamespace'
import './style.css'

defineOptions({ name: 'DanCheckTag' })

const props = withDefaults(
  defineProps<{
    checked?: boolean
    disabled?: boolean
    type?: 'primary' | 'success' | 'warning' | 'danger' | 'info'
  }>(),
  {
    checked: false,
    disabled: false,
    type: 'primary',
  },
)

const emit = defineEmits<{
  'update:checked': [value: boolean]
  change: [value: boolean]
}>()

const ns = useNamespace('check-tag')

function toggle() {
  if (props.disabled) return
  const next = !props.checked
  emit('update:checked', next)
  emit('change', next)
}
</script>

<template>
  <button
    type="button"
    :class="[
      ns.b(),
      ns.m(type),
      ns.is('checked', checked),
      ns.is('disabled', disabled),
    ]"
    :aria-pressed="checked"
    :disabled="disabled"
    @click="toggle"
  >
    <slot />
  </button>
</template>
