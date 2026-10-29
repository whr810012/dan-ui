<script setup>
import { ref } from 'vue'
import { DanAutocomplete } from '@dandan-ui/ui'

const value = ref('')
const loading = ref(false)
const source = ['Vue', 'Vite', 'Vitest', 'Pinia', 'dan-ui']

function fetchSuggestions(query, cb) {
  loading.value = true
  window.setTimeout(() => {
    const q = String(query || '').toLowerCase()
    cb(
      q
        ? source.filter((item) => item.toLowerCase().includes(q))
        : source.slice(0, 3),
    )
    loading.value = false
  }, 240)
}
</script>

<template>
  <DanAutocomplete
    v-model="value"
    :fetch-suggestions="fetchSuggestions"
    :loading="loading"
    :debounce="200"
    clearable
    placeholder="输入框架名"
    style="width: 280px"
  />
</template>
