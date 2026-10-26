<script setup lang="ts">
import { computed, inject } from 'vue'
import type { Editor } from '@tiptap/vue-3'
import { DanButton } from '../button'
import { DanIcon } from '../icon'
import { richTextContextKey } from './editorContext'
import { useNamespace } from '../../hooks/useNamespace'
import './toolbar.css'

defineOptions({ name: 'DanEditorToolbar' })

const props = defineProps<{
  editor?: Editor | null
  disabled?: boolean
}>()

const emit = defineEmits<{
  image: []
}>()

const ns = useNamespace('editor-toolbar')
const ctx = inject(richTextContextKey, undefined)

const currentEditor = computed(
  () => props.editor ?? ctx?.editor.value ?? null,
)
const isDisabled = computed(
  () => props.disabled || ctx?.disabled.value === true || !currentEditor.value,
)

function run(command: (editor: Editor) => void) {
  const editor = currentEditor.value
  if (!editor || isDisabled.value) return
  command(editor)
}

function isActive(name: string, attrs?: Record<string, unknown>) {
  return currentEditor.value?.isActive(name, attrs) ?? false
}

function setLink() {
  const editor = currentEditor.value
  if (!editor) return
  const previous = editor.getAttributes('link').href as string | undefined
  const url = window.prompt('请输入链接地址', previous || 'https://')
  if (url === null) return
  if (url === '') {
    editor.chain().focus().extendMarkRange('link').unsetLink().run()
    return
  }
  editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run()
}
</script>

<template>
  <div :class="[ns.b(), ns.is('disabled', isDisabled)]" role="toolbar">
    <DanButton
      size="small"
      text
      :type="isActive('bold') ? 'primary' : 'default'"
      :disabled="isDisabled"
      @click="run((e) => e.chain().focus().toggleBold().run())"
    >
      <strong>B</strong>
    </DanButton>
    <DanButton
      size="small"
      text
      :type="isActive('italic') ? 'primary' : 'default'"
      :disabled="isDisabled"
      @click="run((e) => e.chain().focus().toggleItalic().run())"
    >
      <em>I</em>
    </DanButton>
    <DanButton
      size="small"
      text
      :type="isActive('underline') ? 'primary' : 'default'"
      :disabled="isDisabled"
      @click="run((e) => e.chain().focus().toggleUnderline().run())"
    >
      <span style="text-decoration: underline">U</span>
    </DanButton>
    <DanButton
      size="small"
      text
      :type="isActive('strike') ? 'primary' : 'default'"
      :disabled="isDisabled"
      @click="run((e) => e.chain().focus().toggleStrike().run())"
    >
      <span style="text-decoration: line-through">S</span>
    </DanButton>

    <span :class="ns.e('sep')" />

    <DanButton
      size="small"
      text
      :type="isActive('heading', { level: 2 }) ? 'primary' : 'default'"
      :disabled="isDisabled"
      @click="run((e) => e.chain().focus().toggleHeading({ level: 2 }).run())"
    >
      H2
    </DanButton>
    <DanButton
      size="small"
      text
      :type="isActive('heading', { level: 3 }) ? 'primary' : 'default'"
      :disabled="isDisabled"
      @click="run((e) => e.chain().focus().toggleHeading({ level: 3 }).run())"
    >
      H3
    </DanButton>

    <span :class="ns.e('sep')" />

    <DanButton
      size="small"
      text
      :type="isActive('bulletList') ? 'primary' : 'default'"
      :disabled="isDisabled"
      @click="run((e) => e.chain().focus().toggleBulletList().run())"
    >
      • 列表
    </DanButton>
    <DanButton
      size="small"
      text
      :type="isActive('orderedList') ? 'primary' : 'default'"
      :disabled="isDisabled"
      @click="run((e) => e.chain().focus().toggleOrderedList().run())"
    >
      1. 列表
    </DanButton>
    <DanButton
      size="small"
      text
      :type="isActive('blockquote') ? 'primary' : 'default'"
      :disabled="isDisabled"
      @click="run((e) => e.chain().focus().toggleBlockquote().run())"
    >
      “”
    </DanButton>
    <DanButton
      size="small"
      text
      :type="isActive('codeBlock') ? 'primary' : 'default'"
      :disabled="isDisabled"
      @click="run((e) => e.chain().focus().toggleCodeBlock().run())"
    >
      Code
    </DanButton>

    <span :class="ns.e('sep')" />

    <DanButton size="small" text :disabled="isDisabled" @click="setLink">
      <DanIcon name="link" />
    </DanButton>
    <DanButton
      size="small"
      text
      :disabled="isDisabled"
      @click="emit('image')"
    >
      <DanIcon name="upload" />
    </DanButton>

    <span :class="ns.e('sep')" />

    <DanButton
      size="small"
      text
      :disabled="isDisabled || !currentEditor?.can().undo()"
      @click="run((e) => e.chain().focus().undo().run())"
    >
      <DanIcon name="refresh" />
    </DanButton>
    <DanButton
      size="small"
      text
      :disabled="isDisabled || !currentEditor?.can().redo()"
      @click="run((e) => e.chain().focus().redo().run())"
    >
      <DanIcon name="refresh" style="transform: scaleX(-1)" />
    </DanButton>

    <slot />
  </div>
</template>
