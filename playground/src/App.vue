<script setup lang="ts">
import { ref } from 'vue'
import {
  DanButton,
  DanConfigProvider,
  DanIcon,
  useNamespace,
} from '@dan-ui/ui'

const ns = useNamespace('playground')
const loading = ref(false)

function onLoad() {
  loading.value = true
  window.setTimeout(() => {
    loading.value = false
  }, 1200)
}
</script>

<template>
  <DanConfigProvider
    size="default"
    :theme="{ 'color-primary': '#2563eb' }"
  >
    <main :class="ns.b()">
      <h1>dan-ui playground</h1>
      <p>ConfigProvider + Button + Icon 全链路</p>

      <section :class="ns.e('section')">
        <h2>Button</h2>
        <div :class="ns.e('row')">
          <DanButton>默认</DanButton>
          <DanButton type="primary">主要</DanButton>
          <DanButton type="success">成功</DanButton>
          <DanButton type="warning">警告</DanButton>
          <DanButton type="danger">危险</DanButton>
        </div>
        <div :class="ns.e('row')">
          <DanButton type="primary" plain>描边</DanButton>
          <DanButton type="primary" round>圆角</DanButton>
          <DanButton type="primary" :loading="loading" @click="onLoad">
            加载
          </DanButton>
          <DanButton type="primary" disabled>禁用</DanButton>
        </div>
      </section>

      <section :class="ns.e('section')">
        <h2>Icon</h2>
        <div :class="ns.e('row')">
          <DanIcon name="plus" :size="20" />
          <DanIcon name="check" :size="20" color="var(--dan-color-success)" />
          <DanIcon name="close" :size="20" color="var(--dan-color-danger)" />
          <DanIcon name="loading" spin :size="20" />
        </div>
      </section>
    </main>
  </DanConfigProvider>
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

h2 {
  margin: 0 0 var(--dan-spacing-md);
  font-size: var(--dan-font-size-lg);
}

p {
  margin: 0 0 var(--dan-spacing-xl);
  color: var(--dan-color-text-secondary);
  font-size: var(--dan-font-size-md);
}

.dan-playground__section + .dan-playground__section {
  margin-top: var(--dan-spacing-xl);
}

.dan-playground__row {
  display: flex;
  flex-wrap: wrap;
  gap: var(--dan-spacing-sm);
  align-items: center;
}

.dan-playground__row + .dan-playground__row {
  margin-top: var(--dan-spacing-sm);
}
</style>
