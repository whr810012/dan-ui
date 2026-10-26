<script setup lang="ts">
import { computed } from 'vue'
import { useNamespace } from '../../hooks/useNamespace'
import { injectMenu } from './menuContext'
import './style.css'

defineOptions({ name: 'DanMenuItem' })

const props = withDefaults(
  defineProps<{
    index: string
    disabled?: boolean
  }>(),
  {
    disabled: false,
  },
)

const ns = useNamespace('menu-item')
const menu = injectMenu()
const active = computed(() => menu.active.value === props.index)

function onClick() {
  if (props.disabled) return
  menu.select(props.index)
}
</script>

<template>
  <li
    :class="[ns.b(), ns.is('active', active), ns.is('disabled', disabled)]"
    role="menuitem"
    :aria-disabled="disabled || undefined"
    @click="onClick"
  >
    <slot />
  </li>
</template>
