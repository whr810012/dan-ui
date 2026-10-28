<script setup>
import { ref } from 'vue'
import { DanConversationList } from '@dandan-ui/ui'

const active = ref('1')
const items = ref([
  { id: '1', title: '欢迎', preview: '你好' },
  { id: '2', title: '表格问题', preview: '如何固定列…' },
])

function onCreate() {
  const id = String(Date.now())
  items.value.unshift({ id, title: '新对话', preview: '' })
  active.value = id
}

function onRemove(item) {
  items.value = items.value.filter((i) => i.id !== item.id)
}
</script>

<template>
  <div style="height: 220px; width: 240px; border: 1px solid var(--dan-color-border)">
    <DanConversationList
      v-model="active"
      :items="items"
      @create="onCreate"
      @remove="onRemove"
    />
  </div>
</template>
