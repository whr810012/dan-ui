<script setup>
import { ref } from 'vue'
import { DanCheckbox, DanCheckboxGroup, DanSpace } from '@dandan-ui/ui'

const borderValue = ref(['a'])
const buttonValue = ref(['vue'])
</script>

<template>
  <DanSpace direction="vertical">
    <DanCheckboxGroup v-model="borderValue" border>
      <DanCheckbox label="a">选项 A</DanCheckbox>
      <DanCheckbox label="b">选项 B</DanCheckbox>
      <DanCheckbox label="c" disabled>选项 C</DanCheckbox>
    </DanCheckboxGroup>
    <DanCheckboxGroup v-model="buttonValue" button>
      <DanCheckbox label="vue">Vue</DanCheckbox>
      <DanCheckbox label="react">React</DanCheckbox>
      <DanCheckbox label="svelte">Svelte</DanCheckbox>
    </DanCheckboxGroup>
  </DanSpace>
</template>
