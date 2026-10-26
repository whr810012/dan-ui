<script setup lang="ts">
import { DanButton, useNamespace } from '@dan-ui/ui'

const ns = useNamespace('playground')
</script>

<template>
  <main :class="ns.b()">
    <h1>dan-ui playground ready</h1>
    <p>Theme tokens + utils ready. Button stub from <code>pnpm gen</code>:</p>
    <DanButton>DanButton</DanButton>
  </main>
</template>

<style scoped>
.dan-playground {
  min-height: 100vh;
  margin: 0;
  padding: var(--dan-spacing-xl);
  font-family: var(--dan-font-family);
  color: var(--dan-color-text);
  background:
    radial-gradient(circle at top left, rgb(37 99 235 / 12%), transparent 40%),
    var(--dan-color-bg-muted);
}

h1 {
  margin: 0 0 var(--dan-spacing-sm);
  font-size: 28px;
  letter-spacing: -0.02em;
}

p {
  margin: 0;
  color: var(--dan-color-text-secondary);
  font-size: var(--dan-font-size-md);
}
</style>
