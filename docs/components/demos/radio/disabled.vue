<script setup lang="ts">
import { ref } from 'vue'
import { DanRadio, DanRadioGroup } from '@dan-ui/ui'

const value = ref('a')
</script>

<template>
  <div style="display: grid; gap: 12px">
    <DanRadioGroup v-model="value">
      <DanRadio label="a">可选</DanRadio>
      <DanRadio label="b" disabled>禁用项</DanRadio>
      <DanRadio label="c">可选</DanRadio>
    </DanRadioGroup>
    <DanRadioGroup v-model="value" disabled>
      <DanRadio label="a">整组禁用 A</DanRadio>
      <DanRadio label="b">整组禁用 B</DanRadio>
    </DanRadioGroup>
  </div>
</template>
