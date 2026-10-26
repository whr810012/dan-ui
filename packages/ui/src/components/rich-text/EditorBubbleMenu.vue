<script setup lang="ts">
import { computed, inject, onBeforeUnmount, ref, watch } from 'vue'
import { posToDOMRect, type Editor } from '@tiptap/vue-3'
import { DanButton } from '../button'
import { richTextContextKey } from './editorContext'
import { useNamespace } from '../../hooks/useNamespace'
import './bubble-menu.css'

defineOptions({ name: 'DanEditorBubbleMenu' })

const props = defineProps<{
  editor?: Editor | null
}>()

const ns = useNamespace('editor-bubble-menu')
const ctx = inject(richTextContextKey, undefined)
const currentEditor = computed(
  () => props.editor ?? ctx?.editor.value ?? null,
)

const visible = ref(false)
const style = ref<Record<string, string>>({
  top: '0px',
  left: '0px',
})

function isActive(name: string) {
  return currentEditor.value?.isActive(name) ?? false
}

function updateMenu() {
  const editor = currentEditor.value
  if (!editor || editor.state.selection.empty || !editor.isFocused) {
    visible.value = false
    return
  }
  const { view, state } = editor
  const { from, to } = state.selection
  const rect = posToDOMRect(view, from, to)
  style.value = {
    top: `${rect.top - 44 + window.scrollY}px`,
    left: `${rect.left + rect.width / 2 + window.scrollX}px`,
  }
  visible.value = true
}

let detach: (() => void) | undefined

watch(
  currentEditor,
  (editor, _, onCleanup) => {
    detach?.()
    detach = undefined
    if (!editor) {
      visible.value = false
      return
    }
    const onUpdate = () => updateMenu()
    editor.on('selectionUpdate', onUpdate)
    editor.on('transaction', onUpdate)
    editor.on('focus', onUpdate)
    editor.on('blur', () => {
      window.setTimeout(() => {
        if (!editor.isFocused) visible.value = false
      }, 150)
    })
    detach = () => {
      editor.off('selectionUpdate', onUpdate)
      editor.off('transaction', onUpdate)
      editor.off('focus', onUpdate)
    }
    onCleanup(() => detach?.())
  },
  { immediate: true },
)

onBeforeUnmount(() => detach?.())
</script>

<template>
  <Teleport to="body">
    <div
      v-show="visible"
      :class="ns.b()"
      :style="style"
      @mousedown.prevent
    >
      <DanButton
        size="small"
        text
        :type="isActive('bold') ? 'primary' : 'default'"
        @click="currentEditor?.chain().focus().toggleBold().run()"
      >
        B
      </DanButton>
      <DanButton
        size="small"
        text
        :type="isActive('italic') ? 'primary' : 'default'"
        @click="currentEditor?.chain().focus().toggleItalic().run()"
      >
        I
      </DanButton>
      <DanButton
        size="small"
        text
        :type="isActive('strike') ? 'primary' : 'default'"
        @click="currentEditor?.chain().focus().toggleStrike().run()"
      >
        S
      </DanButton>
      <DanButton
        size="small"
        text
        :type="isActive('code') ? 'primary' : 'default'"
        @click="currentEditor?.chain().focus().toggleCode().run()"
      >
        Code
      </DanButton>
      <slot />
    </div>
  </Teleport>
</template>
