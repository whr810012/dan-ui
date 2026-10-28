<script setup>
import { ref } from 'vue'
import { DanSelect } from '@dandan-ui/ui'

const value = ref(['sh'])
const options = [
  { label: '上海', value: 'sh' },
  { label: '北京', value: 'bj' },
  { label: '杭州', value: 'hz' },
]
</script>

<template>
  <DanSelect
    v-model="value"
    multiple
    filterable
    collapse-tags
    :options="options"
    placeholder="多选城市"
  />
</template>
