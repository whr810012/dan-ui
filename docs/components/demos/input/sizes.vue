<script setup lang="ts">
import { ref } from 'vue'
import { DanInput } from '@dan-ui/ui'

const value = ref('dan-ui')
</script>

<template>
  <div style="display: grid; gap: 12px; max-width: 420px">
    <DanInput v-model="value" size="small" placeholder="small" />
    <DanInput v-model="value" size="default" placeholder="default" />
    <DanInput v-model="value" size="large" placeholder="large" />
  </div>
</template>
