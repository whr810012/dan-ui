<script setup>
import { ref } from 'vue'
import { DanInputTag } from '@dandan-ui/ui'

const tags = ref(['vue', 'dan-ui'])
</script>

<template>
  <DanInputTag
    v-model="tags"
    clearable
    placeholder="输入后回车或逗号添加"
    style="max-width: 420px"
  />
</template>
