<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, onMounted, ref } from 'vue'
import { useFormItem } from '../../hooks/useFormItem'
import { useNamespace } from '../../hooks/useNamespace'
import { useLocale } from '../../locale'
import { DanCascaderPanel } from '../cascader-panel'
import type {
  CascaderModelValue,
  CascaderOption,
  CascaderPath,
} from './types'
import './style.css'

defineOptions({ name: 'DanCascader' })

const props = withDefaults(
  defineProps<{
    modelValue?: CascaderModelValue
    options?: CascaderOption[]
    disabled?: boolean
    clearable?: boolean
    placeholder?: string
    filterable?: boolean
    filterPlaceholder?: string
    virtual?: boolean
    multiple?: boolean
    maxTagCount?: number
  }>(),
  {
    modelValue: null,
    options: () => [],
    disabled: false,
    clearable: false,
    filterable: false,
    filterPlaceholder: '搜索',
    virtual: false,
    multiple: false,
    maxTagCount: 0,
  },
)

const { t } = useLocale()
const resolvedPlaceholder = computed(
  () => props.placeholder ?? t('cascader.placeholder'),
)

const emit = defineEmits<{
  'update:modelValue': [value: CascaderModelValue]
  change: [value: CascaderModelValue]
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

function findPathLabel(path: CascaderPath): string {
  const labels: string[] = []
  let list = props.options
  for (const val of path) {
    const found = list.find((item) => item.value === val)
    if (!found) break
    labels.push(found.label)
    list = found.children || []
  }
  return labels.join(' / ')
}

function pathEqual(a: CascaderPath, b: CascaderPath) {
  return a.length === b.length && a.every((v, i) => v === b[i])
}

const selectedPaths = computed((): CascaderPath[] => {
  if (!props.modelValue) return []
  if (props.multiple) {
    if (!Array.isArray(props.modelValue)) return []
    if (props.modelValue.length === 0) return []
    return Array.isArray(props.modelValue[0])
      ? (props.modelValue as CascaderPath[])
      : []
  }
  return [props.modelValue as CascaderPath]
})

const tags = computed(() =>
  selectedPaths.value.map((path) => ({
    path,
    label: findPathLabel(path),
  })),
)

const visibleTags = computed(() => {
  if (props.maxTagCount > 0 && tags.value.length > props.maxTagCount) {
    return tags.value.slice(0, props.maxTagCount)
  }
  return tags.value
})

const hiddenTagCount = computed(() => {
  if (!props.multiple || props.maxTagCount <= 0) return 0
  return Math.max(0, tags.value.length - props.maxTagCount)
})

const displayLabel = computed(() => {
  if (props.multiple) return ''
  return tags.value[0]?.label || ''
})

const showClear = computed(
  () =>
    props.clearable && selectedPaths.value.length > 0 && !isDisabled.value,
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

function onPanelChange(value: CascaderModelValue) {
  emit('update:modelValue', value)
  emit('change', value)
  emitChange('change')
  if (!props.multiple && value != null) closePanel()
}

function clear(event: MouseEvent) {
  event.stopPropagation()
  const empty: CascaderModelValue = props.multiple ? [] : null
  emit('update:modelValue', empty)
  emit('change', empty)
  emit('clear')
  emitChange('change')
}

function removeTag(path: CascaderPath, event: MouseEvent) {
  event.stopPropagation()
  if (!props.multiple || isDisabled.value) return
  const next = selectedPaths.value.filter((item) => !pathEqual(item, path))
  emit('update:modelValue', next)
  emit('change', next)
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
    :class="[
      ns.b(),
      ns.is('disabled', isDisabled),
      ns.is('opened', opened),
      ns.is('multiple', multiple),
    ]"
  >
    <button
      type="button"
      :class="ns.e('trigger')"
      :disabled="isDisabled"
      @click="toggle"
    >
      <template v-if="multiple && visibleTags.length">
        <span :class="ns.e('tags')">
          <span
            v-for="tag in visibleTags"
            :key="tag.path.join('/')"
            :class="ns.e('tag')"
          >
            {{ tag.label }}
            <i @click="removeTag(tag.path, $event)">×</i>
          </span>
          <span v-if="hiddenTagCount" :class="ns.e('tag-more')">
            +{{ hiddenTagCount }}
          </span>
        </span>
      </template>
      <span v-else-if="displayLabel" :class="ns.e('value')">{{
        displayLabel
      }}</span>
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
          :multiple="multiple"
          @change="onPanelChange"
        />
      </div>
    </Teleport>
  </div>
</template>
