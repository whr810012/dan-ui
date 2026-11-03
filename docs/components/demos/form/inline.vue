<script setup>
import { reactive, ref } from 'vue'
import {
  DanButton,
  DanForm,
  DanFormItem,
  DanInput,
  DanSpace,
} from '@dandan-ui/ui'

const formRef = ref()
const model = reactive({ keyword: '', city: '' })
const rules = {
  keyword: [{ required: true, message: '请输入关键词', trigger: 'blur' }],
}

async function onSearch() {
  const { valid } = await formRef.value.validate()
  if (!valid) return
}
</script>

<template>
  <DanForm
    ref="formRef"
    :model="model"
    :rules="rules"
    inline
    hide-required-asterisk
  >
    <DanFormItem label="关键词" prop="keyword">
      <DanInput v-model="model.keyword" placeholder="搜索" />
      <template #error="{ error }">
        <span style="color: var(--dan-color-warning)">⚠ {{ error }}</span>
      </template>
    </DanFormItem>
    <DanFormItem label="城市" prop="city">
      <DanInput v-model="model.city" placeholder="可选" />
    </DanFormItem>
    <DanFormItem>
      <DanSpace>
        <DanButton type="primary" @click="onSearch">查询</DanButton>
        <DanButton @click="formRef?.resetFields()">重置</DanButton>
      </DanSpace>
    </DanFormItem>
  </DanForm>
</template>
