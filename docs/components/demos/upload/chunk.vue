<script setup lang="ts">
import { ref } from 'vue'
import { DanUpload } from '@dandan-ui/ui'
import type {
  DanUploadInstance,
  UploadChunkInfo,
  UploadFile,
  UploadRequestOptions,
} from '@dandan-ui/ui'

const fileList = ref<UploadFile[]>([])
const uploadRef = ref<DanUploadInstance>()

/**
 * 自定义直传 / 分片示例（伪代码，不绑定任何云厂商 SDK）。
 * 真实场景可在此对接任意对象存储的预签名 URL 或后端分片接口。
 */
function httpRequest(options: UploadRequestOptions) {
  const { file, chunk, onProgress, onSuccess, onError } = options
  let aborted = false
  let percent = 0
  const body = chunk?.blob ?? file
  const timer = window.setInterval(() => {
    if (aborted) {
      window.clearInterval(timer)
      return
    }
    percent = Math.min(100, percent + 40)
    onProgress(percent)
    if (percent >= 100) {
      window.clearInterval(timer)
      onSuccess({
        ok: true,
        name: file.name,
        chunkIndex: chunk?.index,
        size: body.size,
      })
    }
  }, 60)

  return {
    abort: () => {
      aborted = true
      window.clearInterval(timer)
      onError(new Error('aborted'))
    },
  }
}

function beforeChunkUpload(chunk: UploadChunkInfo) {
  console.info('chunk', chunk.index + 1, '/', chunk.total)
  return true
}
</script>

<template>
  <div style="display: flex; flex-direction: column; gap: 12px; max-width: 420px">
    <DanUpload
      ref="uploadRef"
      v-model:file-list="fileList"
      multiple
      :chunk-size="1024"
      :before-chunk-upload="beforeChunkUpload"
      :http-request="httpRequest"
    />
    <div style="display: flex; gap: 8px">
      <button type="button" @click="uploadRef?.abortAll()">中断全部</button>
      <button
        type="button"
        @click="fileList[0] && uploadRef?.retry(fileList[0])"
      >
        重试首个
      </button>
    </div>
  </div>
</template>
