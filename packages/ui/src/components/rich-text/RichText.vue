<script setup lang="ts">
import { computed, onBeforeUnmount, ref, watch } from 'vue'
import { EditorContent, useEditor, type JSONContent } from '@tiptap/vue-3'
import StarterKit from '@tiptap/starter-kit'
import Placeholder from '@tiptap/extension-placeholder'
import Image from '@tiptap/extension-image'
import { Table } from '@tiptap/extension-table'
import { TableRow } from '@tiptap/extension-table-row'
import { TableCell } from '@tiptap/extension-table-cell'
import { TableHeader } from '@tiptap/extension-table-header'
import MarkdownIt from 'markdown-it'
import { useFormItem } from '../../hooks/useFormItem'
import { useNamespace } from '../../hooks/useNamespace'
import { provideRichText } from './editorContext'
import EditorToolbar from './EditorToolbar.vue'
import EditorBubbleMenu from './EditorBubbleMenu.vue'
import type { RichTextOutput } from './types'
import './style.css'

const md = new MarkdownIt({ html: false, linkify: true, breaks: true })

defineOptions({ name: 'DanRichText' })

const props = withDefaults(
  defineProps<{
    modelValue?: string | JSONContent | null
    output?: RichTextOutput
    placeholder?: string
    disabled?: boolean
    editable?: boolean
    minHeight?: string
    showToolbar?: boolean
    showBubbleMenu?: boolean
    onImageUpload?: (file: File) => Promise<string> | string
  }>(),
  {
    modelValue: '',
    output: 'html',
    placeholder: '请输入内容…',
    disabled: false,
    editable: true,
    minHeight: '160px',
    showToolbar: true,
    showBubbleMenu: true,
  },
)

const emit = defineEmits<{
  'update:modelValue': [value: string | JSONContent]
  change: [value: string | JSONContent]
  focus: [event: FocusEvent]
  blur: [event: FocusEvent]
}>()

const ns = useNamespace('rich-text')
const { form, emitChange } = useFormItem()
const fileInputRef = ref<HTMLInputElement>()

const isDisabled = computed(
  () => props.disabled || form?.disabled.value === true,
)
const canEdit = computed(() => props.editable && !isDisabled.value)

function htmlToMarkdown(html: string) {
  return html
    .replace(/<br\s*\/?>/gi, '\n')
    .replace(/<\/p>/gi, '\n\n')
    .replace(/<\/h1>/gi, '\n\n')
    .replace(/<\/h2>/gi, '\n\n')
    .replace(/<\/h3>/gi, '\n\n')
    .replace(/<li>/gi, '- ')
    .replace(/<\/?[^>]+>/g, '')
    .replace(/\n{3,}/g, '\n\n')
    .trim()
}

function readOutput(editorInstance: {
  getJSON: () => JSONContent
  getHTML: () => string
}) {
  if (props.output === 'json') return editorInstance.getJSON()
  if (props.output === 'markdown') {
    return htmlToMarkdown(editorInstance.getHTML())
  }
  return editorInstance.getHTML()
}

function toEditorContent(value: string | JSONContent | null | undefined) {
  if (value == null || value === '') return ''
  if (typeof value !== 'string') return value
  if (props.output === 'markdown') return md.render(value)
  return value
}

function isSameContent(
  current: string | JSONContent,
  next: string | JSONContent | null | undefined,
) {
  if (next == null || next === '') {
    return (
      current === '' ||
      current === '<p></p>' ||
      (typeof current === 'object' &&
        Array.isArray((current as JSONContent).content) &&
        !(current as JSONContent).content?.length)
    )
  }
  if (typeof current === 'string' || typeof next === 'string') {
    return String(current) === String(next)
  }
  return JSON.stringify(current) === JSON.stringify(next)
}

const initialContent =
  props.output === 'json'
    ? (props.modelValue as JSONContent) || {
        type: 'doc',
        content: [{ type: 'paragraph' }],
      }
    : toEditorContent(props.modelValue as string)

const editor = useEditor({
  extensions: [
    StarterKit.configure({
      heading: { levels: [1, 2, 3] },
      link: {
        openOnClick: false,
        HTMLAttributes: { rel: 'noopener noreferrer', target: '_blank' },
      },
    }),
    Placeholder.configure({
      placeholder: props.placeholder,
    }),
    Image.configure({
      allowBase64: false,
    }),
    Table.configure({ resizable: true }),
    TableRow,
    TableHeader,
    TableCell,
  ],
  content: initialContent,
  editable: canEdit.value,
  onUpdate: ({ editor: current }) => {
    let value: string | JSONContent = readOutput(current)
    if (props.output === 'html' && current.isEmpty) {
      value = ''
    }
    emit('update:modelValue', value)
    emit('change', value)
    emitChange('change')
  },
  onFocus: ({ event }) => emit('focus', event as FocusEvent),
  onBlur: ({ event }) => {
    emit('blur', event as FocusEvent)
    emitChange('blur')
  },
})

provideRichText({
  editor,
  disabled: isDisabled,
})

watch(canEdit, (value) => {
  editor.value?.setEditable(value)
})

watch(
  () => props.modelValue,
  (value) => {
    if (!editor.value) return
    const current = readOutput(editor.value)
    if (isSameContent(current, value)) return
    editor.value.commands.setContent(toEditorContent(value) || '', {
      emitUpdate: false,
    })
  },
)

onBeforeUnmount(() => {
  editor.value?.destroy()
})

async function onPickImage(event: Event) {
  const input = event.target as HTMLInputElement
  const file = input.files?.[0]
  input.value = ''
  if (!file || !editor.value) return
  if (!props.onImageUpload) {
    console.warn('[dan-ui] RichText: provide onImageUpload to insert images')
    return
  }
  const url = await props.onImageUpload(file)
  if (!url) return
  editor.value.chain().focus().setImage({ src: url }).run()
}

function openImagePicker() {
  fileInputRef.value?.click()
}

defineExpose({
  editor,
  getEditor: () => editor.value,
  openImagePicker,
  focus: () => editor.value?.commands.focus(),
  clear: () => editor.value?.commands.clearContent(true),
  getMarkdown: () =>
    editor.value ? htmlToMarkdown(editor.value.getHTML()) : '',
  setMarkdown: (value: string) =>
    editor.value?.commands.setContent(md.render(value || ''), {
      emitUpdate: true,
    }),
  insertTable: () =>
    editor.value
      ?.chain()
      .focus()
      .insertTable({ rows: 3, cols: 3, withHeaderRow: true })
      .run(),
})
</script>

<template>
  <div
    :class="[
      ns.b(),
      ns.is('disabled', isDisabled),
      ns.is('empty', editor?.isEmpty),
    ]"
    :style="{ '--dan-rich-text-min-height': minHeight }"
  >
    <div v-if="showToolbar" :class="ns.e('toolbar-wrap')">
      <slot
        name="toolbar"
        :editor="editor"
        :open-image-picker="openImagePicker"
      >
        <EditorToolbar :editor="editor" @image="openImagePicker" />
      </slot>
    </div>

    <slot v-if="showBubbleMenu && editor" name="bubble-menu" :editor="editor">
      <EditorBubbleMenu :editor="editor" />
    </slot>

    <div :class="ns.e('body')">
      <EditorContent :editor="editor" :class="ns.e('content')" />
    </div>

    <input
      ref="fileInputRef"
      type="file"
      accept="image/*"
      hidden
      @change="onPickImage"
    />
  </div>
</template>
