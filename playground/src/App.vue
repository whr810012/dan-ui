<script setup lang="ts">
import { reactive, ref } from 'vue'
import {
  DanButton,
  DanCheckbox,
  DanCheckboxGroup,
  DanConfigProvider,
  DanForm,
  DanFormItem,
  DanIcon,
  DanInput,
  DanRadio,
  DanRadioGroup,
  DanSelect,
  DanSwitch,
  DanTextarea,
  useNamespace,
  type DanFormInstance,
} from '@dan-ui/ui'

const ns = useNamespace('playground')
const formRef = ref<DanFormInstance>()
const model = reactive({
  name: '',
  bio: '',
  role: 'dev',
  skills: ['vue'],
  city: 'shanghai',
  newsletter: true,
  profile: {
    email: '',
  },
})

const rules = {
  name: [{ required: true, message: '请输入姓名', trigger: 'blur' }],
  'profile.email': [
    { required: true, message: '请输入邮箱', trigger: 'blur' },
    {
      pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      message: '邮箱格式不正确',
      trigger: 'blur',
    },
  ],
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
  <DanConfigProvider>
    <main :class="ns.b()">
      <h1>dan-ui playground</h1>
      <p>表单体系联调：Input / Select / Checkbox / Radio / Switch / Form</p>

      <DanForm
        ref="formRef"
        :model="model"
        :rules="rules"
        label-width="88px"
      >
        <DanFormItem label="姓名" prop="name">
          <DanInput v-model="model.name" placeholder="请输入姓名" clearable />
        </DanFormItem>
        <DanFormItem label="邮箱" prop="profile.email">
          <DanInput v-model="model.profile.email" placeholder="name@example.com" />
        </DanFormItem>
        <DanFormItem label="简介">
          <DanTextarea v-model="model.bio" :rows="3" maxlength="80" show-word-limit />
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
        <DanFormItem label="城市">
          <DanSelect v-model="model.city" :options="cityOptions" clearable />
        </DanFormItem>
        <DanFormItem label="订阅">
          <DanSwitch v-model="model.newsletter" />
        </DanFormItem>
        <DanFormItem>
          <div :class="ns.e('row')">
            <DanButton type="primary" @click="onSubmit">提交</DanButton>
            <DanButton @click="onReset">重置</DanButton>
            <DanIcon name="check" color="var(--dan-color-success)" :size="18" />
          </div>
        </DanFormItem>
      </DanForm>
    </main>
  </DanConfigProvider>
</template>

<style scoped>
.dan-playground {
  min-height: 100vh;
  margin: 0;
  padding: var(--dan-spacing-xl);
  font-family: var(--dan-font-family);
  color: var(--dan-color-text);
  background:
    radial-gradient(circle at top left, rgb(37 99 235 / 12%), transparent 40%),
    var(--dan-color-bg-muted);
}

h1 {
  margin: 0 0 var(--dan-spacing-sm);
  font-size: 28px;
  letter-spacing: -0.02em;
}

p {
  margin: 0 0 var(--dan-spacing-xl);
  color: var(--dan-color-text-secondary);
}

.dan-playground__row {
  display: flex;
  flex-wrap: wrap;
  gap: var(--dan-spacing-sm);
  align-items: center;
}
</style>
