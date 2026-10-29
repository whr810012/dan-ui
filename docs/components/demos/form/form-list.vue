<script setup>
import { reactive, ref } from 'vue'
import { DanButton, DanForm, DanFormItem, DanFormList, DanInput, DanMessage } from '@dandan-ui/ui'

const formRef = ref()
const model = reactive({
  users: [{ name: 'Ada' }],
})
const rules = {
  'users.0.name': [{ required: true, message: '请输入姓名', trigger: 'blur' }],
}

async function submit() {
  const { valid } = await formRef.value.validate()
  if (!valid) return
  DanMessage.success(`共 ${model.users.length} 人`)
}
</script>

<template>
  <DanForm ref="formRef" :model="model" :rules="rules" label-width="88px">
    <DanFormList
      prop="users"
      :create-item="() => ({ name: '' })"
      add-text="添加成员"
    >
      <template #default="{ row, index }">
        <DanFormItem
          :label="'成员' + (index + 1)"
          :prop="'users.' + index + '.name'"
          :rules="[{ required: true, message: '请输入姓名', trigger: 'blur' }]"
        >
          <DanInput v-model="row.name" placeholder="姓名" />
        </DanFormItem>
      </template>
    </DanFormList>
    <DanButton type="primary" @click="submit">提交</DanButton>
  </DanForm>
</template>
