<script setup lang="ts">
import { ref } from 'vue'
import { DanCheckbox } from '@dan-ui/ui'

const checked = ref(true)
</script>

<template>
  <DanCheckbox v-model="checked">同意用户协议</DanCheckbox>
</template>
