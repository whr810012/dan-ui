<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { injectConfig } from '../../hooks/useConfig'
import { useFormItem } from '../../hooks/useFormItem'
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
const ns = useNamespace('autocomplete')
const opened = ref(false)
const suggestions = ref<AutocompleteSuggestion[]>([])
const rootRef = ref<HTMLElement | null>(null)
const panelStyle = ref<Record<string, string>>({})

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

function query(q: string) {
  if (!props.fetchSuggestions) {
    suggestions.value = []
    opened.value = false
    return
  }
  props.fetchSuggestions(q, (list) => {
    suggestions.value = list || []
    opened.value = suggestions.value.length > 0
    void updatePanel()
  })
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
}

function clear() {
  emit('update:modelValue', '')
  emit('clear')
  emit('change', '')
  emitChange('change')
  suggestions.value = []
  opened.value = false
}

function onDoc(event: MouseEvent) {
  if (!rootRef.value?.contains(event.target as Node)) opened.value = false
}

onMounted(() => document.addEventListener('mousedown', onDoc))
onBeforeUnmount(() => document.removeEventListener('mousedown', onDoc))

watch(
  () => props.modelValue,
  () => {
    /* keep controlled */
  },
)
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
      <ul v-if="opened" :class="ns.e('panel')" :style="panelStyle">
        <li
          v-for="(item, index) in suggestions"
          :key="`${valueOf(item)}-${index}`"
          :class="ns.e('item')"
          @click="select(item)"
        >
          {{ labelOf(item) }}
        </li>
      </ul>
    </Teleport>
  </div>
</template>
