<script setup lang="ts">
import { reactive, ref } from 'vue'
import {
  DanButton,
  DanForm,
  DanFormItem,
  DanInput,
  DanRichText,
  type DanFormInstance,
} from '@dan-ui/ui'

const formRef = ref<DanFormInstance>()
const model = reactive({
  title: '',
  content: '',
})
const rules = {
  title: [{ required: true, message: '请输入标题', trigger: 'blur' }],
  content: [{ required: true, message: '请输入正文', trigger: 'blur' }],
}

async function onSubmit() {
  const ok = await formRef.value?.validate()
  window.alert(ok ? '校验通过' : '校验失败')
}
</script>

<template>
  <DanForm
    ref="formRef"
    :model="model"
    :rules="rules"
    label-width="64px"
    style="max-width: 720px"
  >
    <DanFormItem label="标题" prop="title">
      <DanInput v-model="model.title" placeholder="文章标题" clearable />
    </DanFormItem>
    <DanFormItem label="正文" prop="content">
      <DanRichText v-model="model.content" min-height="180px" />
    </DanFormItem>
    <DanFormItem>
      <DanButton type="primary" @click="onSubmit">提交</DanButton>
    </DanFormItem>
  </DanForm>
</template>
