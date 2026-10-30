<script setup>
import { ref } from 'vue'
import { DanTabs, DanTabPane } from '@dandan-ui/ui'

let tabIndex = 2
const active = ref('1')
const tabs = ref([
  { name: '1', label: 'Tab 1', content: '内容 1' },
  { name: '2', label: 'Tab 2', content: '内容 2' },
])

function onAdd() {
  tabIndex += 1
  const name = String(tabIndex)
  tabs.value.push({
    name,
    label: `Tab ${name}`,
    content: `内容 ${name}`,
  })
  active.value = name
}

function onRemove(name) {
  const index = tabs.value.findIndex((tab) => tab.name === name)
  if (index < 0) return
  tabs.value.splice(index, 1)
  if (active.value !== name) return
  const next = tabs.value[index] ?? tabs.value[index - 1]
  active.value = next?.name ?? ''
}
</script>

<template>
  <DanTabs
    v-model="active"
    type="card"
    editable
    @tab-add="onAdd"
    @tab-remove="onRemove"
  >
    <DanTabPane
      v-for="tab in tabs"
      :key="tab.name"
      :label="tab.label"
      :name="tab.name"
    >
      {{ tab.content }}
    </DanTabPane>
  </DanTabs>
</template>
