<script setup lang="ts">
import { computed } from 'vue'
import MarkdownIt from 'markdown-it'
import { useNamespace } from '../../hooks/useNamespace'
import { sanitizeHtml } from '../../utils/sanitize'
import './style.css'

defineOptions({ name: 'DanMarkdown' })

const props = withDefaults(
  defineProps<{
    content?: string
    breaks?: boolean
    html?: boolean
  }>(),
  {
    content: '',
    breaks: true,
    html: false,
  },
)

const ns = useNamespace('markdown')

const md = computed(
  () =>
    new MarkdownIt({
      html: props.html,
      linkify: true,
      breaks: props.breaks,
      typographer: true,
    }),
)

const rendered = computed(() =>
  sanitizeHtml(md.value.render(props.content || '')),
)
</script>

<template>
  <div :class="ns.b()" v-html="rendered" />
</template>
