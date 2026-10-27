<script setup>
import { ref } from 'vue'
import { DanAutocomplete } from '@dan-ui/ui'

const value = ref('')
const restaurants = ['北京', '上海', '广州', '深圳', '杭州', '成都']

function fetchSuggestions(query, cb) {
  const q = (query || '').toLowerCase()
  cb(restaurants.filter((item) => item.toLowerCase().includes(q)))
}
</script>

<template>
  <DanAutocomplete
    v-model="value"
    :fetch-suggestions="fetchSuggestions"
    placeholder="请输入城市"
    clearable
  />
</template>
