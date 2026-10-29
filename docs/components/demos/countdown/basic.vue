<script setup>
import { DanCountdown } from '@dandan-ui/ui'

const target = Date.now() + 1000 * 60 * 30
</script>

<template>
  <DanCountdown title="距活动开始" :value="target" format="HH:mm:ss" />
</template>
