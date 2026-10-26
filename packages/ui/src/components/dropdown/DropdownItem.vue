<script setup lang="ts">
import { useNamespace } from '../../hooks/useNamespace'
import { injectDropdown } from './dropdownContext'
import './style.css'

defineOptions({ name: 'DanDropdownItem' })

const props = withDefaults(
  defineProps<{
    command?: string | number | object
    disabled?: boolean
    divided?: boolean
  }>(),
  {
    command: '',
    disabled: false,
    divided: false,
  },
)

const ns = useNamespace('dropdown-item')
const dropdown = injectDropdown()

function onClick() {
  if (props.disabled) return
  dropdown.handleCommand(props.command)
}
</script>

<template>
  <li
    :class="[ns.b(), ns.is('disabled', disabled), ns.is('divided', divided)]"
    role="menuitem"
    :aria-disabled="disabled || undefined"
    @click="onClick"
  >
    <slot />
  </li>
</template>
