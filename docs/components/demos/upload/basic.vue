<script setup>
import { ref } from 'vue'
import { DanUpload } from '@dandan-ui/ui'

const fileList = ref([])
</script>

<template>
  <DanUpload v-model:file-list="fileList" multiple :limit="3" />
</template>
