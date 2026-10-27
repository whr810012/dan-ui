<script setup lang="ts">
import { ref } from 'vue'
import { DanInput } from '@dandan-ui/ui'

const value = ref('可清空内容')
</script>

<template>
  <DanInput
    v-model="value"
    clearable
    placeholder="输入后显示清空按钮"
    style="max-width: 360px"
  />
</template>
