<script setup lang="ts">
import { ref } from 'vue'
import { DanSwitch } from '@dandan-ui/ui'

const on = ref(true)
</script>

<template>
  <DanSwitch v-model="on" active-text="开" inactive-text="关" />
</template>
