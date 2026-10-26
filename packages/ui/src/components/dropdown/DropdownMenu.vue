<script setup lang="ts">
import { useNamespace } from '../../hooks/useNamespace'
import './style.css'

defineOptions({ name: 'DanDropdownMenu' })

const ns = useNamespace('dropdown-menu')
</script>

<template>
  <ul :class="ns.b()" role="menu">
    <slot />
  </ul>
</template>
