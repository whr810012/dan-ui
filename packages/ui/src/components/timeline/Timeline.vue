<script setup lang="ts">
import { useNamespace } from '../../hooks/useNamespace'
import './style.css'

defineOptions({ name: 'DanTimeline' })

const ns = useNamespace('timeline')
</script>

<template>
  <ul :class="ns.b()">
    <slot />
  </ul>
</template>
