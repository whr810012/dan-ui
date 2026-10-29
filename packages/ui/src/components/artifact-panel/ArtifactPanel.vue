<script setup lang="ts">
import { computed } from 'vue'
import { useNamespace } from '../../hooks/useNamespace'
import { DanButton } from '../button'
import { DanCodeBlock } from '../code-block'
import { DanMarkdown } from '../markdown'
import './style.css'

defineOptions({ name: 'DanArtifactPanel' })

const props = withDefaults(
  defineProps<{
    title?: string
    type?: 'code' | 'markdown' | 'html' | 'text'
    content?: string
    language?: string
    closable?: boolean
  }>(),
  {
    title: 'Artifact',
    type: 'markdown',
    content: '',
    language: 'text',
    closable: true,
  },
)

const emit = defineEmits<{
  close: []
  copy: [content: string]
}>()

const ns = useNamespace('artifact-panel')

const canCopy = computed(() => Boolean(props.content))

async function onCopy() {
  if (!props.content) return
  try {
    await navigator.clipboard.writeText(props.content)
  } catch {
    /* ignore */
  }
  emit('copy', props.content)
}
</script>

<template>
  <aside :class="ns.b()">
    <header :class="ns.e('header')">
      <div :class="ns.e('titles')">
        <div :class="ns.e('title')">
          <slot name="title">{{ title }}</slot>
        </div>
        <div :class="ns.e('type')">{{ type }}</div>
      </div>
      <div :class="ns.e('actions')">
        <DanButton size="small" :disabled="!canCopy" @click="onCopy">
          复制
        </DanButton>
        <DanButton
          v-if="closable"
          size="small"
          text
          aria-label="关闭"
          @click="emit('close')"
        >
          关闭
        </DanButton>
      </div>
    </header>
    <div :class="ns.e('body')">
      <slot>
        <DanCodeBlock
          v-if="type === 'code'"
          :code="content"
          :language="language"
        />
        <DanMarkdown v-else-if="type === 'markdown'" :content="content" />
        <iframe
          v-else-if="type === 'html'"
          :class="ns.e('frame')"
          :srcdoc="content"
          sandbox=""
          title="artifact-html"
        />
        <pre v-else :class="ns.e('text')">{{ content }}</pre>
      </slot>
    </div>
  </aside>
</template>
