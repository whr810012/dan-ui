<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, onMounted, ref } from 'vue'
import { injectConfig } from '../../hooks/useConfig'
import { useFormItem } from '../../hooks/useFormItem'
import { useLocale } from '../../locale'
import { useNamespace } from '../../hooks/useNamespace'
import type { DanSize } from '../../hooks/useConfig'
import type { AutocompleteSuggestion } from './types'
import './style.css'

defineOptions({ name: 'DanAutocomplete' })

const props = withDefaults(
  defineProps<{
    modelValue?: string
    size?: DanSize
    disabled?: boolean
    placeholder?: string
    clearable?: boolean
    triggerOnFocus?: boolean
    /** 请求防抖毫秒 */
    debounce?: number
    /** 由业务控制的加载态 */
    loading?: boolean
    fetchSuggestions?: (
      query: string,
      cb: (list: AutocompleteSuggestion[]) => void,
    ) => void
  }>(),
  {
    modelValue: '',
    disabled: false,
    placeholder: '',
    clearable: false,
    triggerOnFocus: true,
    debounce: 300,
    loading: false,
  },
)

const emit = defineEmits<{
  'update:modelValue': [value: string]
  change: [value: string]
  select: [item: AutocompleteSuggestion]
  clear: []
}>()

const config = injectConfig()
const { form, emitChange } = useFormItem()
const { t } = useLocale()
const ns = useNamespace('autocomplete')
const opened = ref(false)
const suggestions = ref<AutocompleteSuggestion[]>([])
const highlightIndex = ref(-1)
const rootRef = ref<HTMLElement | null>(null)
const panelRef = ref<HTMLElement | null>(null)
const panelStyle = ref<Record<string, string>>({})
let debounceTimer: ReturnType<typeof setTimeout> | null = null
let requestId = 0

const resolvedSize = computed(() => props.size ?? config.size.value)
const isDisabled = computed(
  () => props.disabled || form?.disabled.value === true,
)

function labelOf(item: AutocompleteSuggestion) {
  return typeof item === 'string' ? item : item.label || item.value
}

function valueOf(item: AutocompleteSuggestion) {
  return typeof item === 'string' ? item : item.value
}

async function updatePanel() {
  await nextTick()
  const root = rootRef.value
  if (!root) return
  const rect = root.getBoundingClientRect()
  panelStyle.value = {
    position: 'fixed',
    top: `${rect.bottom + 4}px`,
    left: `${rect.left}px`,
    minWidth: `${rect.width}px`,
    zIndex: 'var(--dan-z-index-dropdown)',
  }
}

function applySuggestions(list: AutocompleteSuggestion[], id: number) {
  if (id !== requestId) return
  suggestions.value = list || []
  highlightIndex.value = suggestions.value.length ? 0 : -1
  opened.value = true
  void updatePanel()
}

function queryNow(q: string) {
  if (!props.fetchSuggestions) {
    suggestions.value = []
    opened.value = false
    highlightIndex.value = -1
    return
  }
  const id = ++requestId
  if (props.loading) {
    opened.value = true
    void updatePanel()
  }
  props.fetchSuggestions(q, (list) => applySuggestions(list, id))
}

function query(q: string) {
  if (debounceTimer) clearTimeout(debounceTimer)
  const delay = Math.max(0, props.debounce)
  if (delay === 0) {
    queryNow(q)
    return
  }
  debounceTimer = setTimeout(() => {
    debounceTimer = null
    queryNow(q)
  }, delay)
}

function onInput(event: Event) {
  const value = (event.target as HTMLInputElement).value
  emit('update:modelValue', value)
  query(value)
}

function onFocus() {
  if (props.triggerOnFocus) query(props.modelValue)
}

function onChange() {
  emit('change', props.modelValue)
  emitChange('change')
}

function select(item: AutocompleteSuggestion) {
  const value = valueOf(item)
  emit('update:modelValue', value)
  emit('select', item)
  emit('change', value)
  emitChange('change')
  opened.value = false
  highlightIndex.value = -1
}

function clear() {
  emit('update:modelValue', '')
  emit('clear')
  emit('change', '')
  emitChange('change')
  suggestions.value = []
  opened.value = false
  highlightIndex.value = -1
}

function onKeydown(event: KeyboardEvent) {
  if (!opened.value && (event.key === 'ArrowDown' || event.key === 'ArrowUp')) {
    query(props.modelValue)
    return
  }
  if (!opened.value) return
  if (event.key === 'ArrowDown') {
    event.preventDefault()
    if (!suggestions.value.length) return
    highlightIndex.value =
      (highlightIndex.value + 1) % suggestions.value.length
  } else if (event.key === 'ArrowUp') {
    event.preventDefault()
    if (!suggestions.value.length) return
    highlightIndex.value =
      (highlightIndex.value - 1 + suggestions.value.length) %
      suggestions.value.length
  } else if (event.key === 'Enter') {
    const item = suggestions.value[highlightIndex.value]
    if (item) {
      event.preventDefault()
      select(item)
    }
  } else if (event.key === 'Escape') {
    opened.value = false
  }
}

function onDoc(event: MouseEvent) {
  const target = event.target as Node
  if (rootRef.value?.contains(target) || panelRef.value?.contains(target)) {
    return
  }
  opened.value = false
}

onMounted(() => document.addEventListener('mousedown', onDoc))
onBeforeUnmount(() => {
  document.removeEventListener('mousedown', onDoc)
  if (debounceTimer) clearTimeout(debounceTimer)
})
</script>

<template>
  <div
    ref="rootRef"
    :class="[
      ns.b(),
      ns.m(resolvedSize),
      ns.is('disabled', isDisabled),
      ns.is('opened', opened),
    ]"
  >
    <input
      :class="ns.e('inner')"
      :value="modelValue"
      :disabled="isDisabled"
      :placeholder="placeholder"
      @input="onInput"
      @focus="onFocus"
      @change="onChange"
      @keydown="onKeydown"
    />
    <button
      v-if="clearable && modelValue && !isDisabled"
      type="button"
      :class="ns.e('clear')"
      aria-label="清除"
      @click="clear"
    >
      ×
    </button>
    <Teleport to="body">
      <ul
        v-if="opened"
        ref="panelRef"
        :class="ns.e('panel')"
        :style="panelStyle"
      >
        <li v-if="loading" :class="ns.e('status')">
          {{ t('common.loading') }}
        </li>
        <template v-else>
          <li
            v-for="(item, index) in suggestions"
            :key="`${valueOf(item)}-${index}`"
            :class="[
              ns.e('item'),
              ns.is('highlighted', index === highlightIndex),
            ]"
            @click="select(item)"
            @mouseenter="highlightIndex = index"
          >
            {{ labelOf(item) }}
          </li>
          <li v-if="!suggestions.length" :class="ns.e('status')">
            {{ t('select.empty') }}
          </li>
        </template>
      </ul>
    </Teleport>
  </div>
</template>
