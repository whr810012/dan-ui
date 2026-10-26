<script setup lang="ts">
import { ref } from 'vue'
import { DanInput } from '@dan-ui/ui'

const value = ref('')
</script>

<template>
  <DanInput v-model="value" placeholder="请输入内容" clearable />
</template>
