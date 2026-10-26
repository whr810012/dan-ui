<script setup lang="ts">
import { ref } from 'vue'
import { DanIcon, DanInput } from '@dan-ui/ui'

const password = ref('123456')
const visible = ref(false)
</script>

<template>
  <DanInput
    v-model="password"
    :type="visible ? 'text' : 'password'"
    placeholder="点击右侧图标显示/隐藏"
    style="max-width: 360px"
  >
    <template #suffix>
      <DanIcon
        :name="visible ? 'eye' : 'eye-off'"
        style="cursor: pointer"
        @click="visible = !visible"
      />
    </template>
  </DanInput>
</template>
