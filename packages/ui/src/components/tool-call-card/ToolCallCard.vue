<script setup lang="ts">
import { computed, ref } from 'vue'
import { useNamespace } from '../../hooks/useNamespace'
import './style.css'

defineOptions({ name: 'DanToolCallCard' })

const props = withDefaults(
  defineProps<{
    name: string
    input?: unknown
    output?: unknown
    status?: 'pending' | 'running' | 'done' | 'error'
    /** 默认是否展开详情 */
    defaultExpanded?: boolean
  }>(),
  {
    status: 'done',
    defaultExpanded: false,
  },
)

const ns = useNamespace('tool-call-card')
const expanded = ref(props.defaultExpanded)

const statusLabel = computed(() => {
  const map = {
    pending: '等待',
    running: '运行中',
    done: '完成',
    error: '错误',
  } as const
  return map[props.status]
})

function format(value: unknown) {
  if (typeof value === 'string') return value
  try {
    return JSON.stringify(value, null, 2)
  } catch {
    return String(value)
  }
}

const inputText = computed(() =>
  props.input == null ? '' : format(props.input),
)
const outputText = computed(() =>
  props.output == null ? '' : format(props.output),
)
</script>

<template>
  <div
    :class="[
      ns.b(),
      ns.is(status, true),
      ns.is('expanded', expanded),
    ]"
  >
    <button
      type="button"
      :class="ns.e('header')"
      @click="expanded = !expanded"
    >
      <span :class="ns.e('name')">{{ name }}</span>
      <span :class="[ns.e('badge'), ns.em('badge', status)]">
        {{ statusLabel }}
      </span>
      <span :class="ns.e('chevron')" aria-hidden="true">
        {{ expanded ? '▾' : '▸' }}
      </span>
    </button>
    <div v-if="expanded" :class="ns.e('body')">
      <div v-if="inputText" :class="ns.e('block')">
        <div :class="ns.e('label')">Input</div>
        <pre :class="ns.e('pre')">{{ inputText }}</pre>
      </div>
      <div v-if="outputText" :class="ns.e('block')">
        <div :class="ns.e('label')">Output</div>
        <pre :class="ns.e('pre')">{{ outputText }}</pre>
      </div>
      <div
        v-if="!inputText && !outputText"
        :class="ns.e('empty')"
      >
        暂无参数
      </div>
    </div>
  </div>
</template>
