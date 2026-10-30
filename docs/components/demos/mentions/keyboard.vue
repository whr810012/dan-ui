<script setup>
import { ref } from 'vue'
import { DanMentions } from '@dandan-ui/ui'

const value = ref('你好 ')
const loading = ref(false)
const options = ref([
  { value: 'alice', label: 'Alice' },
  { value: 'bob', label: 'Bob' },
  { value: 'carol', label: 'Carol' },
])

const all = [
  { value: 'alice', label: 'Alice' },
  { value: 'bob', label: 'Bob' },
  { value: 'carol', label: 'Carol' },
]

function onSearch(query) {
  loading.value = true
  window.setTimeout(() => {
    const q = String(query || '').toLowerCase()
    options.value = q
      ? all.filter((item) => item.label.toLowerCase().includes(q))
      : all.slice()
    loading.value = false
  }, 180)
}
</script>

<template>
  <DanMentions
    v-model="value"
    :options="options"
    :loading="loading"
    placeholder="输入 @ 后可用方向键选择"
    :rows="4"
    @search="onSearch"
  />
</template>
