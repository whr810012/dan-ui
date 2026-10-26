<script setup lang="ts">
import { ref } from 'vue'
import { DanIcon, DanInput } from '@dan-ui/ui'

const user = ref('')
const amount = ref('')
</script>

<template>
  <div style="display: grid; gap: 12px; max-width: 360px">
    <DanInput v-model="user" placeholder="用户名">
      <template #prefix>
        <DanIcon name="user" />
      </template>
    </DanInput>
    <DanInput v-model="amount" placeholder="金额">
      <template #prefix>￥</template>
      <template #suffix>CNY</template>
    </DanInput>
    <DanInput v-model="user" placeholder="搜索关键词" clearable>
      <template #prefix>
        <DanIcon name="search" />
      </template>
    </DanInput>
  </div>
</template>
