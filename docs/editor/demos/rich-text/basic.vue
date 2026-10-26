<script setup lang="ts">
import { ref } from 'vue'
import { DanRichText } from '@dan-ui/ui'

const value = ref('<p>欢迎使用 <strong>dan-ui</strong> 富文本编辑器。</p>')

async function onImageUpload(file: File) {
  return URL.createObjectURL(file)
}
</script>

<template>
  <DanRichText
    v-model="value"
    :on-image-upload="onImageUpload"
    placeholder="试着输入内容，或选中文字看浮动菜单"
  />
</template>
