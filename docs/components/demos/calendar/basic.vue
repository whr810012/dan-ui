<script setup>
import { ref } from 'vue'
import { DanCalendar } from '@dan-ui/ui'

const value = ref('2026-10-27')
</script>

<template>
  <DanCalendar v-model="value" />
</template>
