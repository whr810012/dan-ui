<script setup lang="ts">
import { ref } from 'vue'
import { DanPrompt } from '@dandan-ui/ui'

const tip = ref('')
</script>

<template>
  <div style="display: grid; gap: 12px; max-width: 420px">
    <DanPrompt
      title="帮我写个表单"
      description="包含姓名、邮箱和提交校验"
      @click="tip = '帮我写个表单'"
    />
    <DanPrompt
      title="解释 Chat 消息模型"
      description="role / content / status 怎么用"
      @click="tip = '解释 Chat 消息模型'"
    />
    <div style="font-size: 13px; color: var(--dan-color-text-secondary)">
      点击结果：{{ tip || '无' }}
    </div>
  </div>
</template>
