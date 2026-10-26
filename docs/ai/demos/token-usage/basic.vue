<script setup lang="ts">
import { DanTokenUsage } from '@dan-ui/ui'
</script>

<template>
  <DanTokenUsage :prompt-tokens="128" :completion-tokens="256" />
</template>
