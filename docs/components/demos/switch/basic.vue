<script setup lang="ts">
import { ref } from 'vue'
import { DanSwitch } from '@dandan-ui/ui'

const on = ref(true)
</script>

<template>
  <DanSwitch v-model="on" />
</template>
