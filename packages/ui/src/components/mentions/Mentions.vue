<script setup lang="ts">
import { computed, nextTick, ref, watch } from 'vue'
import { useFormItem } from '../../hooks/useFormItem'
import { useLocale } from '../../locale'
import { useNamespace } from '../../hooks/useNamespace'
import type { MentionOption } from './types'
import './style.css'

defineOptions({ name: 'DanMentions' })

const props = withDefaults(
  defineProps<{
    modelValue?: string
    options?: MentionOption[]
    disabled?: boolean
    placeholder?: string
    rows?: number
    prefix?: string
    loading?: boolean
    filterOption?: (query: string, option: MentionOption) => boolean
  }>(),
  {
    modelValue: '',
    options: () => [],
    disabled: false,
    placeholder: '',
    rows: 3,
    prefix: '@',
    loading: false,
  },
)

const emit = defineEmits<{
  'update:modelValue': [value: string]
  change: [value: string]
  select: [option: MentionOption]
  search: [query: string]
}>()

const ns = useNamespace('mentions')
const { t } = useLocale()
const { form, emitChange } = useFormItem()
const textareaRef = ref<HTMLTextAreaElement | null>(null)
const opened = ref(false)
const query = ref('')
const atIndex = ref(-1)
const highlightIndex = ref(0)

const isDisabled = computed(
  () => props.disabled || form?.disabled.value === true,
)

const filtered = computed(() => {
  const q = query.value
  return props.options.filter((item) => {
    if (props.filterOption) return props.filterOption(q, item)
    const text = (item.label || item.value).toLowerCase()
    return !q || text.includes(q.toLowerCase())
  })
})

watch(filtered, (list) => {
  highlightIndex.value = list.length ? 0 : -1
})

function onInput(event: Event) {
  const el = event.target as HTMLTextAreaElement
  const value = el.value
  emit('update:modelValue', value)

  const cursor = el.selectionStart ?? value.length
  const before = value.slice(0, cursor)
  const escaped = props.prefix.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
  const match = before.match(new RegExp(`${escaped}([^\\s${escaped}]*)$`))
  if (match) {
    atIndex.value = cursor - match[0].length
    query.value = match[1] || ''
    opened.value = true
    emit('search', query.value)
  } else {
    opened.value = false
    query.value = ''
    atIndex.value = -1
  }
}

function onChange() {
  emit('change', props.modelValue)
  emitChange('change')
}

async function select(option: MentionOption) {
  const el = textareaRef.value
  if (!el || atIndex.value < 0) return
  const cursor = el.selectionStart ?? props.modelValue.length
  const before = props.modelValue.slice(0, atIndex.value)
  const after = props.modelValue.slice(cursor)
  const insert = `${props.prefix}${option.value} `
  const next = `${before}${insert}${after}`
  emit('update:modelValue', next)
  emit('select', option)
  emit('change', next)
  emitChange('change')
  opened.value = false
  await nextTick()
  const pos = before.length + insert.length
  el.focus()
  el.setSelectionRange(pos, pos)
}

function onKeydown(event: KeyboardEvent) {
  if (!opened.value || props.loading) return
  if (event.key === 'ArrowDown') {
    event.preventDefault()
    if (!filtered.value.length) return
    highlightIndex.value =
      (highlightIndex.value + 1) % filtered.value.length
  } else if (event.key === 'ArrowUp') {
    event.preventDefault()
    if (!filtered.value.length) return
    highlightIndex.value =
      (highlightIndex.value - 1 + filtered.value.length) %
      filtered.value.length
  } else if (event.key === 'Enter') {
    const option = filtered.value[highlightIndex.value]
    if (option) {
      event.preventDefault()
      void select(option)
    }
  } else if (event.key === 'Escape') {
    opened.value = false
  }
}
</script>

<template>
  <div
    :class="[ns.b(), ns.is('disabled', isDisabled), ns.is('opened', opened)]"
  >
    <textarea
      ref="textareaRef"
      :class="ns.e('inner')"
      :value="modelValue"
      :disabled="isDisabled"
      :placeholder="placeholder"
      :rows="rows"
      @input="onInput"
      @change="onChange"
      @keydown="onKeydown"
    />
    <ul v-if="opened" :class="ns.e('panel')">
      <li v-if="loading" :class="ns.e('status')">
        {{ t('common.loading') }}
      </li>
      <template v-else>
        <li
          v-for="(option, index) in filtered"
          :key="option.value"
          :class="[
            ns.e('item'),
            ns.is('highlighted', index === highlightIndex),
          ]"
          @mousedown.prevent="select(option)"
          @mouseenter="highlightIndex = index"
        >
          {{ option.label || option.value }}
        </li>
        <li v-if="!filtered.length" :class="ns.e('status')">
          {{ t('select.empty') }}
        </li>
      </template>
    </ul>
  </div>
</template>
