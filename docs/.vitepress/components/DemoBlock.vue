<script setup lang="ts">
import { computed, ref } from 'vue'

const props = withDefaults(
  defineProps<{
    source?: string
    title?: string
  }>(),
  {
    source: '',
    title: '',
  },
)

const open = ref(false)
const displaySource = computed(() => props.source.trim())
</script>

<template>
  <div class="dan-doc-demo">
    <div v-if="title" class="dan-doc-demo__title">{{ title }}</div>
    <div class="dan-doc-demo__preview">
      <slot />
    </div>
    <div v-if="displaySource" class="dan-doc-demo__meta">
      <button type="button" class="dan-doc-demo__toggle" @click="open = !open">
        {{ open ? '收起代码' : '查看代码' }}
      </button>
    </div>
    <div v-show="open && displaySource" class="dan-doc-demo__code">
      <pre><code>{{ displaySource }}</code></pre>
    </div>
  </div>
</template>

<style scoped>
.dan-doc-demo {
  margin: 16px 0 28px;
  overflow: hidden;
  border: 1px solid var(--vp-c-divider);
  border-radius: 10px;
  background: var(--vp-c-bg);
}

.dan-doc-demo__title {
  padding: 10px 16px;
  border-bottom: 1px solid var(--vp-c-divider);
  color: var(--vp-c-text-2);
  font-size: 13px;
}

.dan-doc-demo__preview {
  padding: 24px 20px;
  background:
    linear-gradient(90deg, rgb(148 163 184 / 8%) 1px, transparent 1px) 0 0 /
      16px 16px,
    linear-gradient(rgb(148 163 184 / 8%) 1px, transparent 1px) 0 0 / 16px 16px,
    var(--vp-c-bg);
}

.dan-doc-demo__meta {
  display: flex;
  justify-content: flex-end;
  padding: 8px 12px;
  border-top: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg-soft);
}

.dan-doc-demo__toggle {
  border: 0;
  background: transparent;
  color: var(--vp-c-brand-1);
  cursor: pointer;
  font-size: 13px;
}

.dan-doc-demo__code {
  border-top: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg-alt);
}

.dan-doc-demo__code pre {
  margin: 0;
  padding: 16px 18px;
  overflow: auto;
  font-size: 13px;
  line-height: 1.6;
}

.dan-doc-demo__code code {
  font-family: var(--vp-font-family-mono);
  white-space: pre;
}
</style>
