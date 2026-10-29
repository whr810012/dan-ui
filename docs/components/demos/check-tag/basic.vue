<script setup>
import { ref } from 'vue'
import { DanCheckTag, DanSpace } from '@dandan-ui/ui'

const a = ref(true)
const b = ref(false)
</script>

<template>
  <DanSpace>
    <DanCheckTag v-model:checked="a">Vue 3</DanCheckTag>
    <DanCheckTag v-model:checked="b" type="success">AI</DanCheckTag>
  </DanSpace>
</template>
