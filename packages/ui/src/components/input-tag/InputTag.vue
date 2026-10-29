<script setup lang="ts">
import { computed, nextTick, ref } from 'vue'
import { injectConfig } from '../../hooks/useConfig'
import { useFormItem } from '../../hooks/useFormItem'
import { useNamespace } from '../../hooks/useNamespace'
import type { DanSize } from '../../hooks/useConfig'
import { DanTag } from '../tag'
import './style.css'

defineOptions({ name: 'DanInputTag' })

const props = withDefaults(
  defineProps<{
    modelValue?: string[]
    size?: DanSize
    disabled?: boolean
    clearable?: boolean
    collapseTags?: boolean
    max?: number
    placeholder?: string
    /** 额外分隔符（Enter 始终添加）；默认 `,` */
    delimiter?: string
  }>(),
  {
    modelValue: () => [],
    disabled: false,
    clearable: false,
    collapseTags: false,
    placeholder: '',
    delimiter: ',',
  },
)

const emit = defineEmits<{
  'update:modelValue': [value: string[]]
  change: [value: string[]]
  input: [value: string[]]
  add: [value: string]
  remove: [value: string]
  clear: []
  focus: [event: FocusEvent]
  blur: [event: FocusEvent]
}>()

const config = injectConfig()
const { form, emitChange } = useFormItem()
const ns = useNamespace('input-tag')
const inputRef = ref<HTMLInputElement>()
const draft = ref('')
const focused = ref(false)

const resolvedSize = computed(() => props.size ?? config.size.value)
const isDisabled = computed(
  () => props.disabled || form?.disabled.value === true,
)
const tags = computed(() => props.modelValue ?? [])
const atMax = computed(
  () => props.max != null && tags.value.length >= props.max,
)
const showClear = computed(
  () =>
    props.clearable && !isDisabled.value && tags.value.length > 0,
)
const visibleTags = computed(() => {
  if (!props.collapseTags || tags.value.length <= 1) return tags.value
  return tags.value.slice(0, 1)
})
const collapsedCount = computed(() => {
  if (!props.collapseTags || tags.value.length <= 1) return 0
  return tags.value.length - 1
})

function commit(raw: string) {
  const value = raw.trim()
  if (!value || isDisabled.value || atMax.value) {
    draft.value = ''
    return
  }
  if (tags.value.includes(value)) {
    draft.value = ''
    return
  }
  const next = [...tags.value, value]
  emit('update:modelValue', next)
  emit('input', next)
  emit('change', next)
  emit('add', value)
  emitChange('change')
  draft.value = ''
}

function removeAt(index: number) {
  if (isDisabled.value) return
  const removed = tags.value[index]
  if (removed == null) return
  const next = tags.value.filter((_, i) => i !== index)
  emit('update:modelValue', next)
  emit('input', next)
  emit('change', next)
  emit('remove', removed)
  emitChange('change')
}

function onClear() {
  if (isDisabled.value) return
  emit('update:modelValue', [])
  emit('input', [])
  emit('change', [])
  emit('clear')
  emitChange('change')
  draft.value = ''
}

function onKeydown(event: KeyboardEvent) {
  if (event.key === 'Enter') {
    event.preventDefault()
    commit(draft.value)
    return
  }
  if (
    event.key === 'Backspace' &&
    !draft.value &&
    tags.value.length > 0
  ) {
    event.preventDefault()
    removeAt(tags.value.length - 1)
  }
}

function onInput(event: Event) {
  const value = (event.target as HTMLInputElement).value
  const delim = props.delimiter
  if (delim && value.includes(delim)) {
    const parts = value.split(delim)
    const rest = parts.pop() ?? ''
    for (const part of parts) commit(part)
    draft.value = rest
    return
  }
  draft.value = value
}

function onFocus(event: FocusEvent) {
  focused.value = true
  emit('focus', event)
}

function onBlur(event: FocusEvent) {
  focused.value = false
  if (draft.value.trim()) commit(draft.value)
  emit('blur', event)
  emitChange('blur')
}

function focusInput() {
  if (isDisabled.value) return
  void nextTick(() => inputRef.value?.focus())
}

defineExpose({ focus: focusInput })
</script>

<template>
  <div
    :class="[
      ns.b(),
      ns.m(resolvedSize),
      ns.is('disabled', isDisabled),
      ns.is('focus', focused),
    ]"
    @click="focusInput"
  >
    <div :class="ns.e('tags')">
      <DanTag
        v-for="(tag, index) in visibleTags"
        :key="`${tag}-${index}`"
        :size="resolvedSize === 'large' ? 'default' : 'small'"
        closable
        :disabled="isDisabled"
        @close="removeAt(index)"
      >
        {{ tag }}
      </DanTag>
      <DanTag
        v-if="collapsedCount > 0"
        :size="resolvedSize === 'large' ? 'default' : 'small'"
      >
        +{{ collapsedCount }}
      </DanTag>
      <input
        ref="inputRef"
        :class="ns.e('input')"
        :value="draft"
        :disabled="isDisabled || atMax"
        :placeholder="tags.length ? '' : placeholder"
        type="text"
        @input="onInput"
        @keydown="onKeydown"
        @focus="onFocus"
        @blur="onBlur"
      />
    </div>
    <button
      v-if="showClear"
      type="button"
      :class="ns.e('clear')"
      aria-label="清空"
      @click.stop="onClear"
    >
      ×
    </button>
  </div>
</template>
