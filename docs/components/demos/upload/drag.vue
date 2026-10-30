<script setup>
import { ref } from 'vue'
import { DanMessage, DanUpload } from '@dandan-ui/ui'

const fileList = ref([])

function onExceed() {
  DanMessage.warning('最多上传 2 个文件')
}
</script>

<template>
  <DanUpload
    v-model:file-list="fileList"
    drag
    multiple
    accept=".png,.jpg,.jpeg,.pdf"
    :limit="2"
    tip="单个文件建议不超过 10MB；仅作演示，实际上传由 http-request 接入。"
    @exceed="onExceed"
  />
</template>
