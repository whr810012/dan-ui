<script setup lang="ts">
import { computed, inject, ref, watch } from 'vue'
import { chatContextKey } from '../../hooks/useChatContext'
import type { ChatAttachment } from '../../types/chat'
import { useNamespace } from '../../hooks/useNamespace'
import { DanAttachment } from '../attachment'
import { DanButton } from '../button'
import {
  DanPromptLibrary,
  type PromptTemplate,
} from '../prompt-library'
import { DanTextarea } from '../textarea'
import './style.css'

defineOptions({ name: 'DanChatInput' })

const props = withDefaults(
  defineProps<{
    modelValue?: string
    attachments?: ChatAttachment[]
    disabled?: boolean
    placeholder?: string
    submitOnEnter?: boolean
    accept?: string
    maxCount?: number
    maxSize?: number
    /** 斜杠指令模板；输入以 `/` 开头时展示 */
    commands?: PromptTemplate[]
  }>(),
  {
    modelValue: '',
    attachments: () => [],
    disabled: false,
    placeholder: '输入消息，Enter 发送，Shift+Enter 换行',
    submitOnEnter: true,
    accept: undefined,
    maxCount: 8,
    maxSize: 10 * 1024 * 1024,
    commands: () => [],
  },
)

const emit = defineEmits<{
  'update:modelValue': [value: string]
  'update:attachments': [files: ChatAttachment[]]
  send: [payload: { content: string; attachments: ChatAttachment[] }]
  stop: []
  attach: [files: ChatAttachment[]]
}>()

const ns = useNamespace('chat-input')
const chat = inject(chatContextKey, undefined)
const localValue = ref(props.modelValue)
const fileInputRef = ref<HTMLInputElement>()
const dragging = ref(false)

watch(
  () => props.modelValue,
  (value) => {
    if (value !== localValue.value) localValue.value = value
  },
)

const generating = computed(() => chat?.generating.value === true)
const files = computed(() => props.attachments ?? [])
const canSend = computed(
  () =>
    (localValue.value.trim().length > 0 || files.value.length > 0) &&
    !props.disabled &&
    !generating.value,
)
const slashFilter = computed(() => {
  const text = localValue.value
  if (!props.commands.length || !text.startsWith('/')) return ''
  return text
})
const showCommands = computed(() => slashFilter.value.length > 0)

function onSelectCommand(item: PromptTemplate) {
  sync(item.content)
}

function sync(value: string) {
  localValue.value = value
  emit('update:modelValue', value)
}

function syncAttachments(next: ChatAttachment[]) {
  emit('update:attachments', next)
}

function onSend() {
  const content = localValue.value.trim()
  if ((!content && !files.value.length) || props.disabled || generating.value) {
    return
  }
  const payload = {
    content,
    attachments: [...files.value],
  }
  emit('send', payload)
  chat?.send(content)
  sync('')
  syncAttachments([])
}

function onStop() {
  emit('stop')
  chat?.stop()
}

function onKeydown(event: KeyboardEvent) {
  if (!props.submitOnEnter) return
  if (event.key === 'Enter' && !event.shiftKey) {
    event.preventDefault()
    onSend()
  }
}

function openPicker() {
  if (props.disabled || generating.value) return
  fileInputRef.value?.click()
}

function fileToAttachment(file: File): ChatAttachment {
  return {
    id: `${file.name}-${file.size}-${file.lastModified}`,
    name: file.name,
    size: file.size,
    type: file.type,
    url: URL.createObjectURL(file),
  }
}

function addFiles(list: FileList | File[]) {
  const incoming = Array.from(list)
  const next = [...files.value]
  for (const file of incoming) {
    if (props.maxSize != null && file.size > props.maxSize) continue
    if (next.length >= props.maxCount) break
    if (next.some((item) => item.name === file.name && item.size === file.size)) {
      continue
    }
    next.push(fileToAttachment(file))
  }
  if (next.length !== files.value.length) {
    syncAttachments(next)
    emit('attach', next)
  }
}

function onFileChange(event: Event) {
  const input = event.target as HTMLInputElement
  if (input.files?.length) addFiles(input.files)
  input.value = ''
}

function removeFile(file: ChatAttachment) {
  syncAttachments(files.value.filter((item) => item !== file && item.id !== file.id))
}

function onDrop(event: DragEvent) {
  event.preventDefault()
  dragging.value = false
  if (props.disabled || generating.value) return
  if (event.dataTransfer?.files?.length) addFiles(event.dataTransfer.files)
}
</script>

<template>
  <div
    :class="[
      ns.b(),
      ns.is('disabled', disabled),
      ns.is('dragging', dragging),
    ]"
    @dragenter.prevent="dragging = true"
    @dragover.prevent="dragging = true"
    @dragleave.prevent="dragging = false"
    @drop="onDrop"
  >
    <div v-if="files.length" :class="ns.e('attachments')">
      <DanAttachment
        v-for="(file, index) in files"
        :key="file.id || `${file.name}-${index}`"
        :file="file"
        removable
        @remove="removeFile"
      />
    </div>
    <div :class="ns.e('composer')">
      <DanPromptLibrary
        v-if="showCommands"
        :class="ns.e('commands')"
        :items="commands"
        :filter="slashFilter"
        @select="onSelectCommand"
      />
      <DanTextarea
        :model-value="localValue"
        :placeholder="placeholder"
        :disabled="disabled || generating"
        :rows="3"
        @update:model-value="sync"
        @keydown="onKeydown"
      />
    </div>
    <div :class="ns.e('actions')">
      <div :class="ns.e('tools')">
        <input
          ref="fileInputRef"
          type="file"
          hidden
          multiple
          :accept="accept"
          @change="onFileChange"
        />
        <DanButton
          size="small"
          :disabled="disabled || generating || files.length >= maxCount"
          @click="openPicker"
        >
          附件
        </DanButton>
        <slot name="actions" />
      </div>
      <DanButton v-if="generating" type="danger" @click="onStop">
        停止
      </DanButton>
      <DanButton v-else type="primary" :disabled="!canSend" @click="onSend">
        发送
      </DanButton>
    </div>
  </div>
</template>
