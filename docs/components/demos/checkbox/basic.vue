<script setup lang="ts">
import { ref } from 'vue'
import { DanCheckbox, DanCheckboxGroup } from '@dan-ui/ui'

const checked = ref(true)
const list = ref(['vue'])
</script>

<template>
  <div style="display: grid; gap: 12px">
    <DanCheckbox v-model="checked">同意协议</DanCheckbox>
    <DanCheckboxGroup v-model="list">
      <DanCheckbox label="vue">Vue</DanCheckbox>
      <DanCheckbox label="react">React</DanCheckbox>
      <DanCheckbox label="svelte">Svelte</DanCheckbox>
    </DanCheckboxGroup>
  </div>
</template>
