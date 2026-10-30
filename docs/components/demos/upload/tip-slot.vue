<script setup>
import { ref } from 'vue'
import { DanUpload } from '@dandan-ui/ui'

const fileList = ref([])
</script>

<template>
  <DanUpload
    v-model:file-list="fileList"
    drag
    drag-text="把设计稿拖进来"
    accept=".fig,.sketch,.png"
    :limit="5"
  >
    <template #tip>
      也可用 <code>#tip</code> 插槽自定义底部说明；拖拽区主文案可用
      <code>drag-text</code> 覆盖。
    </template>
  </DanUpload>
</template>
