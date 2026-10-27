<script setup lang="ts">
import { ref } from 'vue'
import { DanButton, DanDrawer } from '@dandan-ui/ui'

const open = ref(false)
</script>

<template>
  <DanButton type="primary" @click="open = true">打开抽屉</DanButton>
  <DanDrawer v-model="open" title="抽屉标题" size="360px">
    这里是抽屉内容，适合放表单或详情。
    <template #footer>
      <DanButton @click="open = false">取消</DanButton>
      <DanButton type="primary" @click="open = false">确定</DanButton>
    </template>
  </DanDrawer>
</template>
