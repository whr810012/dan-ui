<script setup>
import { ref } from 'vue'
import { DanButton, DanDialog, DanSpace } from '@dandan-ui/ui'

const centerOpen = ref(false)
const dragOpen = ref(false)
</script>

<template>
  <DanSpace>
    <DanButton type="primary" @click="centerOpen = true">垂直居中</DanButton>
    <DanButton @click="dragOpen = true">可拖拽</DanButton>
  </DanSpace>

  <DanDialog v-model="centerOpen" title="居中对话框" align-center>
    使用 alignCenter 垂直居中，不再依赖 top。
  </DanDialog>

  <DanDialog v-model="dragOpen" title="拖拽标题栏移动" draggable align-center>
    按住标题栏可拖动对话框位置；打开时会重置偏移。
  </DanDialog>
</template>
