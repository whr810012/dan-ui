<script setup lang="ts">
import { reactive } from 'vue'
import { DanInput } from '@dan-ui/ui'

const form = reactive({
  text: '',
  password: '',
  number: '',
  email: '',
  tel: '',
  url: '',
  search: '',
})
</script>

<template>
  <div style="display: grid; gap: 12px; max-width: 420px">
    <DanInput v-model="form.text" type="text" placeholder="文本 text" />
    <DanInput
      v-model="form.password"
      type="password"
      placeholder="密码 password"
    />
    <DanInput v-model="form.number" type="number" placeholder="数字 number" />
    <DanInput v-model="form.email" type="email" placeholder="邮箱 email" />
    <DanInput v-model="form.tel" type="tel" placeholder="电话 tel" />
    <DanInput v-model="form.url" type="url" placeholder="网址 url" />
    <DanInput v-model="form.search" type="search" placeholder="搜索 search" />
  </div>
</template>
