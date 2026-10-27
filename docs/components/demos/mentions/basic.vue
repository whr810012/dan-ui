<script setup>
import { ref } from 'vue'
import { DanMentions } from '@dan-ui/ui'

const value = ref('')
const options = [
  { value: 'alice', label: 'Alice' },
  { value: 'bob', label: 'Bob' },
  { value: 'carol', label: 'Carol' },
]
</script>

<template>
  <DanMentions
    v-model="value"
    :options="options"
    placeholder="输入 @ 提及同事"
  />
</template>
