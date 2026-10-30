<script setup lang="ts">
import { ref } from 'vue'
import { DanInput, DanSpace } from '@dandan-ui/ui'

const value = ref('')
const phone = ref('13800138000')
</script>

<template>
  <DanSpace direction="vertical" style="width: 100%; max-width: 360px">
    <DanInput
      v-model="value"
      maxlength="20"
      show-word-limit
      placeholder="最多 20 个字符"
      clearable
    />
    <DanInput
      v-model="phone"
      maxlength="11"
      show-word-limit
      placeholder="手机号"
      :formatter="(v) => String(v).replace(/(\d{3})(\d{0,4})(\d{0,4})/, (_, a, b, c) => [a, b, c].filter(Boolean).join(' '))"
      :parser="(v) => v.replace(/\s/g, '')"
    />
  </DanSpace>
</template>
