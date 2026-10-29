<script setup>
import { ref } from 'vue'
import { DanUpload } from '@dandan-ui/ui'

const fileList = ref([])
</script>

<template>
  <DanUpload
    v-model:file-list="fileList"
    list-type="picture-card"
    accept="image/*"
    multiple
    :limit="4"
    :auto-upload="false"
  />
</template>
