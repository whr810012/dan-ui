<script setup lang="ts">
import { ref } from 'vue'
import { DanSpace, DanTextarea } from '@dandan-ui/ui'

const value = ref('dan-ui 文本域示例')
const note = ref('hello world')
</script>

<template>
  <DanSpace direction="vertical" style="width: 100%; max-width: 480px">
    <DanTextarea
      v-model="value"
      :rows="4"
      maxlength="100"
      show-word-limit
      placeholder="普通字数统计"
    />
    <DanTextarea
      v-model="note"
      :rows="3"
      maxlength="40"
      show-word-limit
      placeholder="大写展示 / 小写入库"
      :formatter="(v) => v.toUpperCase()"
      :parser="(v) => v.toLowerCase()"
    />
  </DanSpace>
</template>
