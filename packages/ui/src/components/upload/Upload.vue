<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { useFormItem } from '../../hooks/useFormItem'
import { useNamespace } from '../../hooks/useNamespace'
import type {
  UploadBeforeChunkHook,
  UploadChunkInfo,
  UploadFile,
  UploadGetUploadedChunks,
  UploadRawFile,
  UploadRequestHandler,
  UploadUserFile,
} from './types'
import './style.css'

defineOptions({ name: 'DanUpload' })

const props = withDefaults(
  defineProps<{
    fileList?: UploadUserFile[]
    accept?: string
    multiple?: boolean
    disabled?: boolean
    limit?: number
    drag?: boolean
    autoUpload?: boolean
    httpRequest?: UploadRequestHandler
    listType?: 'text'
    /** 分片大小（字节）；>0 时启用分片上传 */
    chunkSize?: number
    beforeChunkUpload?: UploadBeforeChunkHook
    /** 查询已上传分片 index，用于断点续传 */
    getUploadedChunks?: UploadGetUploadedChunks
  }>(),
  {
    fileList: () => [],
    accept: '',
    multiple: false,
    disabled: false,
    drag: false,
    autoUpload: true,
    listType: 'text',
    chunkSize: 0,
  },
)

const emit = defineEmits<{
  'update:fileList': [files: UploadFile[]]
  change: [file: UploadFile, fileList: UploadFile[]]
  remove: [file: UploadFile, fileList: UploadFile[]]
  exceed: [files: File[], fileList: UploadFile[]]
  success: [response: unknown, file: UploadFile, fileList: UploadFile[]]
  error: [error: unknown, file: UploadFile, fileList: UploadFile[]]
  progress: [percent: number, file: UploadFile, fileList: UploadFile[]]
}>()

const ns = useNamespace('upload')
const { form, emitChange } = useFormItem()
const inputRef = ref<HTMLInputElement | null>(null)
const dragOver = ref(false)
let seed = Date.now()
const abortMap = new Map<number, () => void>()

const isDisabled = computed(
  () => props.disabled || form?.disabled.value === true,
)

const files = ref<UploadFile[]>(normalizeList(props.fileList))
let syncingFromInner = false

watch(
  () => props.fileList,
  (list) => {
    if (syncingFromInner) return
    files.value = normalizeList(list)
  },
  { deep: true },
)

function normalizeList(list: UploadUserFile[] = []): UploadFile[] {
  return list.map((item) => ({
    name: item.name,
    size: item.size,
    percentage: item.percentage ?? 0,
    status: item.status ?? 'success',
    uid: item.uid ?? ++seed,
    raw: item.raw,
    url: item.url,
    response: item.response,
  }))
}

function formatSize(size?: number) {
  if (size == null) return ''
  if (size < 1024) return `${size} B`
  if (size < 1024 * 1024) return `${(size / 1024).toFixed(1)} KB`
  return `${(size / 1024 / 1024).toFixed(1)} MB`
}

function syncList(next: UploadFile[]) {
  syncingFromInner = true
  files.value = next
  emit('update:fileList', next)
  queueMicrotask(() => {
    syncingFromInner = false
  })
}

function openFileDialog() {
  if (isDisabled.value) return
  inputRef.value?.click()
}

function handleFiles(fileList: FileList | File[]) {
  const selected = Array.from(fileList)
  if (!selected.length) return

  if (
    props.limit != null &&
    files.value.length + selected.length > props.limit
  ) {
    emit('exceed', selected, files.value)
    return
  }

  for (const file of selected) {
    addFile(file)
  }
}

function addFile(file: File) {
  const raw = file as UploadRawFile
  raw.uid = ++seed
  const uploadFile: UploadFile = {
    name: raw.name,
    size: raw.size,
    percentage: 0,
    status: 'ready',
    uid: raw.uid,
    raw,
  }

  const next = props.multiple ? [...files.value, uploadFile] : [uploadFile]
  syncList(next)
  emit('change', uploadFile, next)
  emitChange('change')

  if (props.autoUpload) {
    upload(uploadFile)
  }
}

function defaultRequest({
  onProgress,
  onSuccess,
}: {
  file: UploadRawFile
  chunk?: UploadChunkInfo
  onProgress: (percent: number) => void
  onSuccess: (response?: unknown) => void
  onError: (error?: unknown) => void
}) {
  let percent = 0
  let aborted = false
  const timer = window.setInterval(() => {
    if (aborted) {
      window.clearInterval(timer)
      return
    }
    percent += 34
    onProgress(Math.min(percent, 100))
    if (percent >= 100) {
      window.clearInterval(timer)
      onSuccess({ name: 'mock' })
    }
  }, 80)
  return {
    abort: () => {
      aborted = true
      window.clearInterval(timer)
    },
  }
}

function registerAbort(uid: number, abort?: () => void) {
  if (abort) abortMap.set(uid, abort)
}

function clearAbort(uid: number) {
  abortMap.delete(uid)
}

function buildChunks(file: File, size: number): UploadChunkInfo[] {
  const chunks: UploadChunkInfo[] = []
  const total = Math.ceil(file.size / size) || 1
  for (let index = 0; index < total; index += 1) {
    const start = index * size
    const end = Math.min(file.size, start + size)
    chunks.push({
      index,
      start,
      end,
      total,
      blob: file.slice(start, end),
    })
  }
  return chunks
}

async function runRequest(
  file: UploadFile,
  options: {
    file: UploadRawFile
    chunk?: UploadChunkInfo
    onProgress: (percent: number) => void
  },
) {
  const request = props.httpRequest ?? defaultRequest
  return await new Promise<unknown>((resolve, reject) => {
    let settled = false
    const settle = (fn: () => void) => {
      if (settled) return
      settled = true
      clearAbort(file.uid)
      fn()
    }

    const result = request({
      ...options,
      onProgress: options.onProgress,
      onSuccess: (response) => settle(() => resolve(response)),
      onError: (error) =>
        settle(() => reject(error ?? new Error('upload failed'))),
    })

    const abortFn =
      result && typeof result === 'object' && 'abort' in result
        ? (result as { abort?: () => void }).abort
        : undefined

    registerAbort(file.uid, () => {
      abortFn?.()
      settle(() => reject(new Error('aborted')))
    })

    if (result && typeof (result as Promise<unknown>).then === 'function') {
      void (result as Promise<unknown>).then(
        (response) => settle(() => resolve(response)),
        (error) => settle(() => reject(error)),
      )
    }
  })
}

async function upload(file: UploadFile) {
  if (!file.raw) return
  file.status = 'uploading'
  file.percentage = 0
  syncList([...files.value])

  try {
    const chunkSize = props.chunkSize ?? 0
    if (chunkSize > 0 && file.raw.size > chunkSize) {
      const chunks = buildChunks(file.raw, chunkSize)
      const uploaded = new Set(
        props.getUploadedChunks
          ? await props.getUploadedChunks(file)
          : [],
      )
      const responses: unknown[] = []
      for (const chunk of chunks) {
        if (uploaded.has(chunk.index)) {
          responses.push({ index: chunk.index, skipped: true })
          file.percentage = Math.min(
            100,
            Math.round(((chunk.index + 1) / chunk.total) * 100),
          )
          syncList([...files.value])
          continue
        }
        if (props.beforeChunkUpload) {
          const ok = await props.beforeChunkUpload(chunk, file)
          if (!ok) throw new Error('chunk upload cancelled')
        }
        const response = await runRequest(file, {
          file: file.raw,
          chunk,
          onProgress: (percent) => {
            const overall =
              ((chunk.index + percent / 100) / chunk.total) * 100
            file.percentage = Math.min(100, Math.round(overall))
            file.status = 'uploading'
            syncList([...files.value])
            emit('progress', file.percentage, file, files.value)
          },
        })
        responses.push(
          response && typeof response === 'object'
            ? { index: chunk.index, ...(response as object) }
            : { index: chunk.index, response },
        )
      }
      file.status = 'success'
      file.percentage = 100
      file.response = responses
    } else {
      const response = await runRequest(file, {
        file: file.raw,
        onProgress: (percent) => {
          file.percentage = percent
          file.status = 'uploading'
          syncList([...files.value])
          emit('progress', percent, file, files.value)
        },
      })
      file.status = 'success'
      file.percentage = 100
      file.response = response
    }
    syncList([...files.value])
    emit('success', file.response, file, files.value)
    emit('change', file, files.value)
    emitChange('change')
  } catch (error) {
    file.status = 'fail'
    syncList([...files.value])
    emit('error', error, file, files.value)
    emit('change', file, files.value)
    emitChange('change')
  } finally {
    clearAbort(file.uid)
  }
}

function abort(file?: UploadFile) {
  if (file) {
    abortMap.get(file.uid)?.()
    clearAbort(file.uid)
    if (file.status === 'uploading') {
      file.status = 'fail'
      syncList([...files.value])
    }
    return
  }
  abortAll()
}

function abortAll() {
  for (const [uid, fn] of abortMap) {
    fn()
    clearAbort(uid)
  }
  files.value = files.value.map((item) =>
    item.status === 'uploading' ? { ...item, status: 'fail' as const } : item,
  )
  syncList([...files.value])
}

function retry(file: UploadFile) {
  if (!file.raw) return
  file.status = 'ready'
  file.percentage = 0
  syncList([...files.value])
  void upload(file)
}

function remove(file: UploadFile) {
  if (isDisabled.value) return
  abort(file)
  const next = files.value.filter((item) => item.uid !== file.uid)
  syncList(next)
  emit('remove', file, next)
  emit('change', file, next)
  emitChange('change')
}

function onInputChange(event: Event) {
  const input = event.target as HTMLInputElement
  if (input.files) handleFiles(input.files)
  input.value = ''
}

function onDragOver(event: DragEvent) {
  event.preventDefault()
  if (!isDisabled.value) dragOver.value = true
}

function onDragLeave(event: DragEvent) {
  event.preventDefault()
  dragOver.value = false
}

function onDrop(event: DragEvent) {
  event.preventDefault()
  dragOver.value = false
  if (isDisabled.value || !props.drag) return
  const dropped = event.dataTransfer?.files
  if (dropped) handleFiles(dropped)
}

function submit() {
  files.value
    .filter((file) => file.status === 'ready')
    .forEach((file) => upload(file))
}

function clearFiles() {
  syncList([])
}

defineExpose({
  submit,
  clearFiles,
  openFileDialog,
  abort,
  abortAll,
  retry,
})
</script>

<template>
  <div :class="[ns.b(), ns.is('disabled', isDisabled), ns.is('drag', drag)]">
    <input
      ref="inputRef"
      type="file"
      :class="ns.e('input')"
      :accept="accept"
      :multiple="multiple"
      :disabled="isDisabled"
      @change="onInputChange"
    />

    <div
      v-if="drag"
      :class="[ns.e('dragger'), ns.is('dragover', dragOver)]"
      role="button"
      tabindex="0"
      @click="openFileDialog"
      @keydown.enter.prevent="openFileDialog"
      @keydown.space.prevent="openFileDialog"
      @dragover="onDragOver"
      @dragleave="onDragLeave"
      @drop="onDrop"
    >
      <slot>
        <div :class="ns.e('tip')">
          <p :class="ns.e('tip-title')">将文件拖到此处，或点击上传</p>
          <p v-if="limit" :class="ns.e('tip-sub')">
            最多上传 {{ limit }} 个文件
          </p>
        </div>
      </slot>
    </div>

    <div v-else :class="ns.e('trigger')" @click="openFileDialog">
      <slot>
        <button type="button" :class="ns.e('button')" :disabled="isDisabled">
          选择文件
        </button>
      </slot>
    </div>

    <ul v-if="files.length" :class="ns.e('list')">
      <li v-for="file in files" :key="file.uid" :class="ns.e('item')">
        <div :class="ns.e('item-info')">
          <span :class="ns.e('item-name')" :title="file.name">{{
            file.name
          }}</span>
          <span v-if="file.size != null" :class="ns.e('item-size')">{{
            formatSize(file.size)
          }}</span>
          <span :class="[ns.e('item-status'), ns.is(file.status, true)]">
            {{
              file.status === 'uploading'
                ? `${file.percentage ?? 0}%`
                : file.status === 'success'
                  ? '完成'
                  : file.status === 'fail'
                    ? '失败'
                    : '待上传'
            }}
          </span>
        </div>
        <button
          type="button"
          :class="ns.e('item-remove')"
          :disabled="isDisabled"
          aria-label="移除文件"
          @click="remove(file)"
        >
          ×
        </button>
      </li>
    </ul>
  </div>
</template>
