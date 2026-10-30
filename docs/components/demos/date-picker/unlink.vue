<script setup>
import { ref } from 'vue'
import { DanDatePicker } from '@dandan-ui/ui'

const value = ref(null)
</script>

<template>
  <DanDatePicker
    v-model="value"
    type="daterange"
    unlink-panels
    clearable
    start-placeholder="开始"
    end-placeholder="结束"
  />
</template>
