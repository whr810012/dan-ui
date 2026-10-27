<script setup lang="ts">
import { reactive } from 'vue'
import { DanForm, DanFormItem, DanInput } from '@dandan-ui/ui'

const model = reactive({
  title: '',
  desc: '',
})
</script>

<template>
  <DanForm :model="model" label-position="top" style="max-width: 420px">
    <DanFormItem label="标题" prop="title" required>
      <DanInput v-model="model.title" placeholder="请输入标题" />
    </DanFormItem>
    <DanFormItem label="描述" prop="desc">
      <DanInput v-model="model.desc" placeholder="请输入描述" />
    </DanFormItem>
  </DanForm>
</template>
