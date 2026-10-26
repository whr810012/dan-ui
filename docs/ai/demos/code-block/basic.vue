<script setup lang="ts">
import { DanCodeBlock } from '@dan-ui/ui'

const code = `export function hello(name: string) {
  return \`Hello, \${name}\`
}`
</script>

<template>
  <DanCodeBlock language="ts" :code="code" />
</template>
