<script setup lang="ts">
import { ref } from 'vue'
import { useNamespace } from '../../hooks/useNamespace'
import './style.css'

defineOptions({ name: 'DanThinking' })

const props = withDefaults(
  defineProps<{
    content?: string
    collapsed?: boolean
    title?: string
  }>(),
  {
    content: '',
    collapsed: true,
    title: '思考过程',
  },
)

const ns = useNamespace('thinking')
const open = ref(!props.collapsed)

function toggle() {
  open.value = !open.value
}
</script>

<template>
  <div :class="[ns.b(), ns.is('open', open)]">
    <button type="button" :class="ns.e('trigger')" @click="toggle">
      <span>{{ title }}</span>
      <span :class="ns.e('arrow')">{{ open ? '收起' : '展开' }}</span>
    </button>
    <div v-show="open" :class="ns.e('body')">
      <slot>{{ content }}</slot>
    </div>
  </div>
</template>
