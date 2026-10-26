<script setup lang="ts">
import { computed } from 'vue'
import { useNamespace } from '../../hooks/useNamespace'
import './style.css'

defineOptions({ name: 'DanTokenUsage' })

const props = withDefaults(
  defineProps<{
    promptTokens?: number
    completionTokens?: number
    totalTokens?: number
  }>(),
  {
    promptTokens: 0,
    completionTokens: 0,
  },
)

const ns = useNamespace('token-usage')
const total = computed(
  () =>
    props.totalTokens ??
    (props.promptTokens || 0) + (props.completionTokens || 0),
)
</script>

<template>
  <div :class="ns.b()" aria-label="token usage">
    <span>输入 {{ promptTokens }}</span>
    <span :class="ns.e('sep')">·</span>
    <span>输出 {{ completionTokens }}</span>
    <span :class="ns.e('sep')">·</span>
    <span>合计 {{ total }}</span>
    <slot />
  </div>
</template>
