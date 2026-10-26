<script setup lang="ts">
import { computed } from 'vue'
import { useNamespace } from '../../hooks/useNamespace'
import { DanMarkdown } from '../markdown'
import './style.css'

defineOptions({ name: 'DanStreamText' })

const props = withDefaults(
  defineProps<{
    content?: string
    streaming?: boolean
    asMarkdown?: boolean
  }>(),
  {
    content: '',
    streaming: false,
    asMarkdown: true,
  },
)

const ns = useNamespace('stream-text')
const showCursor = computed(() => props.streaming)
</script>

<template>
  <div :class="[ns.b(), ns.is('streaming', streaming)]">
    <DanMarkdown v-if="asMarkdown" :content="content" />
    <span v-else :class="ns.e('plain')">{{ content }}</span>
    <span v-if="showCursor" :class="ns.e('cursor')" aria-hidden="true" />
  </div>
</template>
