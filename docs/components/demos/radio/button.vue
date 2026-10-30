<script setup>
import { ref } from 'vue'
import { DanRadio, DanRadioGroup, DanSpace } from '@dandan-ui/ui'

const borderValue = ref('a')
const buttonValue = ref('vue')
</script>

<template>
  <DanSpace direction="vertical">
    <DanRadioGroup v-model="borderValue" border>
      <DanRadio label="a">选项 A</DanRadio>
      <DanRadio label="b">选项 B</DanRadio>
      <DanRadio label="c" disabled>选项 C</DanRadio>
    </DanRadioGroup>
    <DanRadioGroup v-model="buttonValue" button>
      <DanRadio label="vue">Vue</DanRadio>
      <DanRadio label="react">React</DanRadio>
      <DanRadio label="svelte">Svelte</DanRadio>
    </DanRadioGroup>
  </DanSpace>
</template>
