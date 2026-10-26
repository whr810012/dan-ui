<script setup lang="ts">
import { ref } from 'vue'
import { DanTextarea } from '@dan-ui/ui'

const value = ref('dan-ui 文本域示例')
</script>

<template>
  <DanTextarea
    v-model="value"
    :rows="4"
    maxlength="100"
    show-word-limit
    style="max-width: 480px"
  />
</template>
