<script setup lang="ts">
import { DanSelect } from '@dan-ui/ui'

const options = [
  { label: '选项 A', value: 'a' },
  { label: '选项 B', value: 'b' },
]
</script>

<template>
  <DanSelect
    model-value="a"
    :options="options"
    disabled
    style="max-width: 280px"
  />
</template>
