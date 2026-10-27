<script setup lang="ts">
import { ref } from 'vue'
import { DanCheckbox, DanCheckboxGroup } from '@dandan-ui/ui'

const list = ref(['vue', 'ts'])
</script>

<template>
  <div style="display: grid; gap: 12px">
    <DanCheckboxGroup v-model="list">
      <DanCheckbox label="vue">Vue</DanCheckbox>
      <DanCheckbox label="react">React</DanCheckbox>
      <DanCheckbox label="ts">TypeScript</DanCheckbox>
      <DanCheckbox label="css" disabled>CSS（禁用）</DanCheckbox>
    </DanCheckboxGroup>
    <div style="font-size: 13px; color: var(--dan-color-text-secondary)">
      已选：{{ list.join(', ') || '无' }}
    </div>
  </div>
</template>
