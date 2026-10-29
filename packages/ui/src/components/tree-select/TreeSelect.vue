<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, onMounted, ref } from 'vue'
import { useFormItem } from '../../hooks/useFormItem'
import { useNamespace } from '../../hooks/useNamespace'
import { useLocale } from '../../locale'
import { DanTree } from '../tree'
import type { TreeNode } from '../tree'
import './style.css'

defineOptions({ name: 'DanTreeSelect' })

const props = withDefaults(
  defineProps<{
    modelValue?: string | number | null
    data?: TreeNode[]
    disabled?: boolean
    clearable?: boolean
    placeholder?: string
  }>(),
  {
    modelValue: null,
    data: () => [],
    disabled: false,
    clearable: false,
  },
)

const { t } = useLocale()
const resolvedPlaceholder = computed(
  () => props.placeholder ?? t('treeSelect.placeholder'),
)

const emit = defineEmits<{
  'update:modelValue': [value: string | number | null]
  change: [value: string | number | null]
  clear: []
}>()

const ns = useNamespace('tree-select')
const { form, emitChange } = useFormItem()
const opened = ref(false)
const rootRef = ref<HTMLElement | null>(null)
const panelStyle = ref<Record<string, string>>({})

const isDisabled = computed(
  () => props.disabled || form?.disabled.value === true,
)

function findLabel(nodes: TreeNode[], id: string | number | null): string {
  if (id == null) return ''
  for (const node of nodes) {
    if (node.id === id) return node.label
    if (node.children?.length) {
      const found = findLabel(node.children, id)
      if (found) return found
    }
  }
  return ''
}

const display = computed(() => findLabel(props.data, props.modelValue))
const showClear = computed(
  () => props.clearable && props.modelValue != null && !isDisabled.value,
)

async function open() {
  if (isDisabled.value) return
  opened.value = true
  await nextTick()
  const rect = rootRef.value?.getBoundingClientRect()
  if (!rect) return
  panelStyle.value = {
    position: 'fixed',
    top: `${rect.bottom + 4}px`,
    left: `${rect.left}px`,
    minWidth: `${rect.width}px`,
    zIndex: 'var(--dan-z-index-dropdown)',
  }
}

function close() {
  opened.value = false
}

function toggle() {
  if (opened.value) close()
  else void open()
}

function onNodeClick(node: TreeNode) {
  if (node.disabled || node.children?.length) return
  emit('update:modelValue', node.id)
  emit('change', node.id)
  emitChange('change')
  close()
}

function clear(event: MouseEvent) {
  event.stopPropagation()
  emit('update:modelValue', null)
  emit('change', null)
  emit('clear')
  emitChange('change')
}

function onDoc(event: MouseEvent) {
  if (!rootRef.value?.contains(event.target as Node)) close()
}

onMounted(() => document.addEventListener('mousedown', onDoc))
onBeforeUnmount(() => document.removeEventListener('mousedown', onDoc))
</script>

<template>
  <div
    ref="rootRef"
    :class="[ns.b(), ns.is('disabled', isDisabled), ns.is('opened', opened)]"
  >
    <button
      type="button"
      :class="ns.e('trigger')"
      :disabled="isDisabled"
      @click="toggle"
    >
      <span v-if="display" :class="ns.e('value')">{{ display }}</span>
      <span v-else :class="ns.e('placeholder')">{{ resolvedPlaceholder }}</span>
      <span :class="ns.e('suffix')" aria-hidden="true" />
    </button>
    <button
      v-if="showClear"
      type="button"
      :class="ns.e('clear')"
      aria-label="清除"
      @click="clear"
    >
      ×
    </button>
    <Teleport to="body">
      <div v-if="opened" :class="ns.e('panel')" :style="panelStyle">
        <DanTree :data="data" default-expand-all @node-click="onNodeClick" />
      </div>
    </Teleport>
  </div>
</template>
