<script setup lang="ts">
import { reactive, ref } from 'vue'
import {
  DanButton,
  DanCheckbox,
  DanCheckboxGroup,
  DanForm,
  DanFormItem,
  DanInput,
  DanRadio,
  DanRadioGroup,
  DanSelect,
  DanSwitch,
  DanTextarea,
  type DanFormInstance,
} from '@dan-ui/ui'

const formRef = ref<DanFormInstance>()
const model = reactive({
  name: '',
  role: 'dev',
  skills: ['vue'],
  city: 'shanghai',
  bio: '',
  newsletter: true,
})

const rules = {
  name: [{ required: true, message: '请输入姓名', trigger: 'blur' }],
  city: [{ required: true, message: '请选择城市', trigger: 'change' }],
}

const cityOptions = [
  { label: '上海', value: 'shanghai' },
  { label: '北京', value: 'beijing' },
  { label: '深圳', value: 'shenzhen' },
]

async function onSubmit() {
  const ok = await formRef.value?.validate()
  window.alert(ok ? '校验通过' : '校验失败')
}

function onReset() {
  formRef.value?.resetFields()
}
</script>

<template>
  <DanForm
    ref="formRef"
    :model="model"
    :rules="rules"
    label-width="88px"
    style="max-width: 560px"
  >
    <DanFormItem label="姓名" prop="name">
      <DanInput v-model="model.name" clearable placeholder="请输入姓名" />
    </DanFormItem>
    <DanFormItem label="角色">
      <DanRadioGroup v-model="model.role">
        <DanRadio label="dev">开发</DanRadio>
        <DanRadio label="design">设计</DanRadio>
        <DanRadio label="pm">产品</DanRadio>
      </DanRadioGroup>
    </DanFormItem>
    <DanFormItem label="技能">
      <DanCheckboxGroup v-model="model.skills">
        <DanCheckbox label="vue">Vue</DanCheckbox>
        <DanCheckbox label="ts">TypeScript</DanCheckbox>
        <DanCheckbox label="css">CSS</DanCheckbox>
      </DanCheckboxGroup>
    </DanFormItem>
    <DanFormItem label="城市" prop="city">
      <DanSelect v-model="model.city" :options="cityOptions" clearable />
    </DanFormItem>
    <DanFormItem label="简介">
      <DanTextarea v-model="model.bio" :rows="3" maxlength="80" show-word-limit />
    </DanFormItem>
    <DanFormItem label="订阅">
      <DanSwitch v-model="model.newsletter" />
    </DanFormItem>
    <DanFormItem>
      <div style="display: flex; gap: 8px">
        <DanButton type="primary" @click="onSubmit">提交</DanButton>
        <DanButton @click="onReset">重置</DanButton>
      </div>
    </DanFormItem>
  </DanForm>
</template>
