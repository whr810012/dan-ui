<script setup lang="ts">
import { ref } from 'vue'
import { DanTextarea } from '@dan-ui/ui'

const value = ref('')
</script>

<template>
  <DanTextarea v-model="value" placeholder="请输入简介" :rows="4" maxlength="100" show-word-limit />
</template>
