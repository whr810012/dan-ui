<script setup>
import { ref } from 'vue'
import { DanMessage, DanUpload } from '@dan-ui/ui'

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
    :limit="2"
    @exceed="onExceed"
  />
</template>
