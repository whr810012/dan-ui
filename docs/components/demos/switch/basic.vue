<script setup lang="ts">
import { ref } from 'vue'
import { DanSwitch } from '@dan-ui/ui'

const on = ref(true)
</script>

<template>
  <DanSwitch v-model="on" />
</template>
