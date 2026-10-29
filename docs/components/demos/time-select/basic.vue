<script setup>
import { ref } from 'vue'
import { DanTimeSelect } from '@dandan-ui/ui'

const value = ref('09:30')
</script>

<template>
  <DanTimeSelect
    v-model="value"
    clearable
    start="09:00"
    end="18:00"
    step="00:30"
  />
</template>
