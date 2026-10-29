<script setup>
import { ref } from 'vue'
import { DanDatePicker } from '@dandan-ui/ui'

const month = ref(null)
const year = ref(null)
const week = ref(null)
</script>

<template>
  <div style="display: flex; flex-direction: column; gap: 12px">
    <div style="display: flex; flex-wrap: wrap; gap: 16px; align-items: center">
      <DanDatePicker v-model="month" type="month" clearable placeholder="选择月份" />
      <span style="color: var(--dan-color-text-secondary)">月：{{ month || '—' }}</span>
    </div>
    <div style="display: flex; flex-wrap: wrap; gap: 16px; align-items: center">
      <DanDatePicker v-model="year" type="year" clearable placeholder="选择年份" />
      <span style="color: var(--dan-color-text-secondary)">年：{{ year || '—' }}</span>
    </div>
    <div style="display: flex; flex-wrap: wrap; gap: 16px; align-items: center">
      <DanDatePicker v-model="week" type="week" clearable placeholder="选择周" />
      <span style="color: var(--dan-color-text-secondary)">周一起始：{{ week || '—' }}</span>
    </div>
  </div>
</template>
