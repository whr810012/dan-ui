<script setup>
import { ref } from 'vue'
import { DanTextarea } from '@dandan-ui/ui'

const value = ref('自动增高\n第二行')
</script>

<template>
  <DanTextarea
    v-model="value"
    :autosize="{ minRows: 2, maxRows: 6 }"
    placeholder="输入多行文本"
  />
</template>
