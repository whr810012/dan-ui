<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, onMounted, ref } from 'vue'
import { useFormItem } from '../../hooks/useFormItem'
import { useNamespace } from '../../hooks/useNamespace'
import { useLocale } from '../../locale'
import { DanCascaderPanel } from '../cascader-panel'
import type { CascaderOption } from './types'
import './style.css'

defineOptions({ name: 'DanCascader' })

const props = withDefaults(
  defineProps<{
    modelValue?: Array<string | number> | null
    options?: CascaderOption[]
    disabled?: boolean
    clearable?: boolean
    placeholder?: string
    filterable?: boolean
    filterPlaceholder?: string
    virtual?: boolean
  }>(),
  {
    modelValue: null,
    options: () => [],
    disabled: false,
    clearable: false,
    filterable: false,
    filterPlaceholder: '搜索',
    virtual: false,
  },
)

const { t } = useLocale()
const resolvedPlaceholder = computed(
  () => props.placeholder ?? t('cascader.placeholder'),
)

const emit = defineEmits<{
  'update:modelValue': [value: Array<string | number> | null]
  change: [value: Array<string | number> | null]
  clear: []
}>()

const ns = useNamespace('cascader')
const { form, emitChange } = useFormItem()
const opened = ref(false)
const rootRef = ref<HTMLElement | null>(null)
const panelRef = ref<HTMLElement | null>(null)
const panelStyle = ref<Record<string, string>>({})

const isDisabled = computed(
  () => props.disabled || form?.disabled.value === true,
)

const displayLabel = computed(() => {
  if (!props.modelValue?.length) return ''
  const labels: string[] = []
  let list = props.options
  for (const val of props.modelValue) {
    const found = list.find((item) => item.value === val)
    if (!found) break
    labels.push(found.label)
    list = found.children || []
  }
  return labels.join(' / ')
})

const showClear = computed(
  () => props.clearable && !!displayLabel.value && !isDisabled.value,
)

async function openPanel() {
  if (isDisabled.value) return
  opened.value = true
  await nextTick()
  const rect = rootRef.value?.getBoundingClientRect()
  if (!rect) return
  panelStyle.value = {
    position: 'fixed',
    top: `${rect.bottom + 4}px`,
    left: `${rect.left}px`,
    zIndex: 'var(--dan-z-index-dropdown)',
  }
}

function closePanel() {
  opened.value = false
}

function toggle() {
  if (opened.value) closePanel()
  else void openPanel()
}

function onPanelChange(value: Array<string | number> | null) {
  emit('update:modelValue', value)
  emit('change', value)
  emitChange('change')
  if (value?.length) closePanel()
}

function clear(event: MouseEvent) {
  event.stopPropagation()
  emit('update:modelValue', null)
  emit('change', null)
  emit('clear')
  emitChange('change')
}

function onDoc(event: MouseEvent) {
  const target = event.target as Node
  if (rootRef.value?.contains(target)) return
  if (panelRef.value?.contains(target)) return
  closePanel()
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
      <span v-if="displayLabel" :class="ns.e('value')">{{ displayLabel }}</span>
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
      <div
        v-if="opened"
        ref="panelRef"
        :class="ns.e('dropdown')"
        :style="panelStyle"
      >
        <DanCascaderPanel
          :model-value="modelValue"
          :options="options"
          :filterable="filterable"
          :filter-placeholder="filterPlaceholder"
          :virtual="virtual"
          @change="onPanelChange"
        />
      </div>
    </Teleport>
  </div>
</template>
