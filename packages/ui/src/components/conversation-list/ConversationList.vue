<script setup lang="ts">
import { useNamespace } from '../../hooks/useNamespace'
import type { ChatConversationItem } from '../../types/chat'
import { DanButton } from '../button'
import './style.css'

defineOptions({ name: 'DanConversationList' })

const props = withDefaults(
  defineProps<{
    items?: ChatConversationItem[]
    modelValue?: string
    createText?: string
  }>(),
  {
    items: () => [],
    modelValue: '',
    createText: '新对话',
  },
)

const emit = defineEmits<{
  'update:modelValue': [id: string]
  select: [item: ChatConversationItem]
  create: []
  remove: [item: ChatConversationItem]
}>()

const ns = useNamespace('conversation-list')

function onSelect(item: ChatConversationItem) {
  emit('update:modelValue', item.id)
  emit('select', item)
}
</script>

<template>
  <aside :class="ns.b()">
    <div :class="ns.e('header')">
      <slot name="header">
        <DanButton
          type="primary"
          size="small"
          style="width: 100%"
          @click="emit('create')"
        >
          {{ createText }}
        </DanButton>
      </slot>
    </div>
    <ul :class="ns.e('list')" role="listbox">
      <li
        v-for="item in items"
        :key="item.id"
        :class="[ns.e('item'), ns.is('active', item.id === modelValue)]"
        role="option"
        :aria-selected="item.id === modelValue"
        @click="onSelect(item)"
      >
        <div :class="ns.e('title')">{{ item.title }}</div>
        <div v-if="item.preview" :class="ns.e('preview')">{{ item.preview }}</div>
        <button
          type="button"
          :class="ns.e('remove')"
          aria-label="删除会话"
          @click.stop="emit('remove', item)"
        >
          ×
        </button>
      </li>
      <li v-if="!items.length" :class="ns.e('empty')">暂无会话</li>
    </ul>
  </aside>
</template>
