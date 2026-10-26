<script setup lang="ts">
import { computed, ref } from 'vue'
import { useNamespace } from '../../hooks/useNamespace'
import './style.css'

defineOptions({ name: 'DanCodeBlock' })

const props = withDefaults(
  defineProps<{
    code?: string
    language?: string
  }>(),
  {
    code: '',
    language: '',
  },
)

const ns = useNamespace('code-block')
const copied = ref(false)

const title = computed(() => props.language || 'code')

async function onCopy() {
  try {
    await navigator.clipboard.writeText(props.code)
    copied.value = true
    window.setTimeout(() => {
      copied.value = false
    }, 1200)
  } catch {
    copied.value = false
  }
}
</script>

<template>
  <div :class="ns.b()">
    <div :class="ns.e('header')">
      <span :class="ns.e('lang')">{{ title }}</span>
      <button type="button" :class="ns.e('copy')" @click="onCopy">
        {{ copied ? '已复制' : '复制' }}
      </button>
    </div>
    <pre
      :class="ns.e('pre')"
    ><code :class="ns.e('code')">{{ code }}</code></pre>
  </div>
</template>
