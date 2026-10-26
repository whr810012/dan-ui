<script setup lang="ts">
import { reactive, ref } from 'vue'
import {
  DanButton,
  DanForm,
  DanFormItem,
  DanInput,
  type DanFormInstance,
} from '@dan-ui/ui'

const formRef = ref<DanFormInstance>()
const model = reactive({
  name: '',
  profile: { email: '' },
})
const rules = {
  name: [{ required: true, message: '请输入姓名', trigger: 'blur' }],
  'profile.email': [
    { required: true, message: '请输入邮箱', trigger: 'blur' },
  ],
}

async function onSubmit() {
  const ok = await formRef.value?.validate()
  window.alert(ok ? '校验通过' : '校验失败')
}
</script>

<template>
  <DanForm ref="formRef" :model="model" :rules="rules" label-width="72px">
    <DanFormItem label="姓名" prop="name">
      <DanInput v-model="model.name" placeholder="请输入姓名" clearable />
    </DanFormItem>
    <DanFormItem label="邮箱" prop="profile.email">
      <DanInput v-model="model.profile.email" placeholder="name@example.com" />
    </DanFormItem>
    <DanFormItem>
      <DanButton type="primary" @click="onSubmit">提交</DanButton>
    </DanFormItem>
  </DanForm>
</template>
