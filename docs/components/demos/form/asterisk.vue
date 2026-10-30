<script setup>
import { reactive } from 'vue'
import { DanForm, DanFormItem, DanInput } from '@dandan-ui/ui'

const model = reactive({ name: '' })
const rules = {
  name: [{ required: true, message: '请输入名称', trigger: 'blur' }],
}
</script>

<template>
  <DanForm
    :model="model"
    :rules="rules"
    label-width="88px"
    require-asterisk-position="right"
  >
    <DanFormItem label="名称" prop="name">
      <DanInput v-model="model.name" placeholder="星号在右侧" />
    </DanFormItem>
  </DanForm>
</template>
