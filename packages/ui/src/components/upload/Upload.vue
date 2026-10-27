<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { useFormItem } from '../../hooks/useFormItem'
import { useNamespace } from '../../hooks/useNamespace'
import type {
  UploadFile,
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
  }>(),
  {
    fileList: () => [],
    accept: '',
    multiple: false,
    disabled: false,
    drag: false,
    autoUpload: true,
    listType: 'text',
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

const isDisabled = computed(
  () => props.disabled || form?.disabled.value === true,
)

const files = ref<UploadFile[]>(normalizeList(props.fileList))

watch(
  () => props.fileList,
  (list) => {
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
  files.value = next
  emit('update:fileList', next)
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
  onProgress: (percent: number) => void
  onSuccess: (response?: unknown) => void
  onError: (error?: unknown) => void
}) {
  let percent = 0
  const timer = window.setInterval(() => {
    percent += 34
    onProgress(Math.min(percent, 100))
    if (percent >= 100) {
      window.clearInterval(timer)
      onSuccess({ name: 'mock' })
    }
  }, 80)
}

function upload(file: UploadFile) {
  if (!file.raw) return
  file.status = 'uploading'
  file.percentage = 0
  syncList([...files.value])

  const request = props.httpRequest ?? defaultRequest
  void request({
    file: file.raw,
    onProgress: (percent) => {
      file.percentage = percent
      file.status = 'uploading'
      syncList([...files.value])
      emit('progress', percent, file, files.value)
    },
    onSuccess: (response) => {
      file.status = 'success'
      file.percentage = 100
      file.response = response
      syncList([...files.value])
      emit('success', response, file, files.value)
      emit('change', file, files.value)
      emitChange('change')
    },
    onError: (error) => {
      file.status = 'fail'
      syncList([...files.value])
      emit('error', error, file, files.value)
      emit('change', file, files.value)
      emitChange('change')
    },
  })
}

function remove(file: UploadFile) {
  if (isDisabled.value) return
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

defineExpose({ submit, clearFiles, openFileDialog })
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
