<script setup>
import { ref } from 'vue'
import { DanUpload } from '@dandan-ui/ui'

const rejected = ref(0)

function beforeUpload(file) {
  if (file.size > 20 * 1024) {
    rejected.value += 1
    return false
  }
  return true
}
</script>

<template>
  <div>
    <DanUpload
      multiple
      :auto-upload="false"
      :before-upload="beforeUpload"
      tip="仅接受 20 KB 以内的文件"
    />
    <p style="margin: 8px 0 0; font-size: 13px; opacity: 0.72">
      已拦截 {{ rejected }} 个超出体积的文件
    </p>
  </div>
</template>
