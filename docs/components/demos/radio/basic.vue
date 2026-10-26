<script setup lang="ts">
import { ref } from 'vue'
import { DanRadio, DanRadioGroup } from '@dan-ui/ui'

const value = ref('a')
</script>

<template>
  <DanRadioGroup v-model="value">
    <DanRadio label="a">选项 A</DanRadio>
    <DanRadio label="b">选项 B</DanRadio>
    <DanRadio label="c">选项 C</DanRadio>
  </DanRadioGroup>
</template>
