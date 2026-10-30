<script setup>
import { ref } from 'vue'
import { DanSpace, DanSwitch } from '@dandan-ui/ui'

const frozen = ref(false)
const asyncValue = ref(false)

function beforeChange() {
  return new Promise((resolve) => {
    window.setTimeout(() => resolve(true), 600)
  })
}
</script>

<template>
  <DanSpace :size="24">
    <DanSwitch v-model="frozen" loading />
    <DanSwitch v-model="asyncValue" :before-change="beforeChange" />
  </DanSpace>
</template>
