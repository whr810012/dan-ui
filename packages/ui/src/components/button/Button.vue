<script setup lang="ts">
import { useNamespace } from '../../hooks/useNamespace'
import './style.css'

defineOptions({ name: 'DanButton' })

const ns = useNamespace('button')
</script>

<template>
  <div :class="ns.b()">
    <slot />
  </div>
</template>
