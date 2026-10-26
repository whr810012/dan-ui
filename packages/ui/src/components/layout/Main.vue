<script setup lang="ts">
import { useNamespace } from '../../hooks/useNamespace'
import './style.css'

defineOptions({ name: 'DanMain' })

const ns = useNamespace('main')
</script>

<template>
  <main :class="ns.b()">
    <slot />
  </main>
</template>
