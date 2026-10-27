<script setup>
import { ref } from 'vue'
import { DanButton, DanDialog, DanMessage } from '@dandan-ui/ui'

const open = ref(false)

function onConfirm() {
  DanMessage.success('已确认')
  open.value = false
}
</script>

<template>
  <div>
    <DanButton type="primary" @click="open = true">打开对话框</DanButton>
    <DanDialog v-model="open" title="提示" @confirm="onConfirm">
      这是一个基础对话框，可关闭、可确认。
    </DanDialog>
  </div>
</template>
