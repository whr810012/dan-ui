<script setup lang="ts">
import { computed, ref, useAttrs } from 'vue'
import { injectConfig } from '../../hooks/useConfig'
import { useFormItem } from '../../hooks/useFormItem'
import { useNamespace } from '../../hooks/useNamespace'
import type { DanSize } from '../../hooks/useConfig'
import './style.css'

defineOptions({ name: 'DanInput', inheritAttrs: false })

const props = withDefaults(
  defineProps<{
    modelValue?: string | number
    type?: string
    size?: DanSize
    disabled?: boolean
    readonly?: boolean
    clearable?: boolean
    placeholder?: string
    maxlength?: number
    /** 展示字数统计（需配合 maxlength） */
    showWordLimit?: boolean
    /** 显示值格式化（不影响 v-model，除非配合 parser） */
    formatter?: (value: string | number) => string
    /** 将输入解析回 modelValue */
    parser?: (value: string) => string
  }>(),
  {
    modelValue: '',
    type: 'text',
    disabled: false,
    readonly: false,
    clearable: false,
    placeholder: '',
    showWordLimit: false,
  },
)

const emit = defineEmits<{
  'update:modelValue': [value: string]
  input: [value: string]
  change: [value: string]
  blur: [event: FocusEvent]
  focus: [event: FocusEvent]
  clear: []
}>()

const attrs = useAttrs()
const config = injectConfig()
const { form, emitChange } = useFormItem()
const ns = useNamespace('input')
const focused = ref(false)

const resolvedSize = computed(() => props.size ?? config.size.value)
const isDisabled = computed(
  () => props.disabled || form?.disabled.value === true,
)
const rawValue = computed(() => String(props.modelValue ?? ''))
const displayValue = computed(() =>
  props.formatter ? props.formatter(props.modelValue ?? '') : rawValue.value,
)
const showClear = computed(
  () =>
    props.clearable &&
    !isDisabled.value &&
    !props.readonly &&
    rawValue.value.length > 0,
)
const showLimit = computed(
  () =>
    props.showWordLimit &&
    props.maxlength != null &&
    props.maxlength >= 0 &&
    !isDisabled.value,
)
const wordCount = computed(() => rawValue.value.length)

/** class / style 落在外层容器，避免 max-width 只作用到 inner 导致后缀错位 */
const rootClass = computed(() => attrs.class)
const rootStyle = computed(
  () => attrs.style as string | Record<string, string> | undefined,
)
const inputAttrs = computed(() => {
  const result: Record<string, unknown> = {}
  for (const [key, value] of Object.entries(attrs)) {
    if (key === 'class' || key === 'style') continue
    result[key] = value
  }
  return result
})

function normalize(value: string) {
  return props.parser ? props.parser(value) : value
}

function commit(value: string) {
  emit('update:modelValue', value)
  emit('input', value)
}

function onInput(event: Event) {
  const el = event.target as HTMLInputElement
  let next = normalize(el.value)
  if (props.maxlength != null && next.length > props.maxlength) {
    next = next.slice(0, props.maxlength)
  }
  commit(next)
  if (props.formatter || props.parser) {
    el.value = props.formatter ? props.formatter(next) : next
  }
}

function onChange(event: Event) {
  const value = normalize((event.target as HTMLInputElement).value)
  emit('change', value)
  emitChange('change')
}

function onBlur(event: FocusEvent) {
  focused.value = false
  emit('blur', event)
  emitChange('blur')
}

function onFocus(event: FocusEvent) {
  focused.value = true
  emit('focus', event)
}

function onClear() {
  commit('')
  emit('change', '')
  emit('clear')
  emitChange('change')
}
</script>

<template>
  <div
    :class="[
      ns.b(),
      ns.m(resolvedSize),
      ns.is('disabled', isDisabled),
      ns.is('focus', focused),
      ns.is('exceed', showLimit && wordCount > (maxlength ?? 0)),
      rootClass,
    ]"
    :style="rootStyle"
  >
    <span v-if="$slots.prefix" :class="ns.e('prefix')">
      <slot name="prefix" />
    </span>
    <input
      :class="ns.e('inner')"
      :type="type"
      :value="displayValue"
      :disabled="isDisabled"
      :readonly="readonly"
      :placeholder="placeholder"
      :maxlength="maxlength"
      v-bind="inputAttrs"
      @input="onInput"
      @change="onChange"
      @blur="onBlur"
      @focus="onFocus"
    />
    <span
      v-if="showClear"
      :class="ns.e('clear')"
      role="button"
      tabindex="-1"
      @mousedown.prevent
      @click="onClear"
    >
      ×
    </span>
    <span v-if="$slots.suffix" :class="ns.e('suffix')">
      <slot name="suffix" />
    </span>
    <span v-if="showLimit" :class="ns.e('count')">
      {{ wordCount }} / {{ maxlength }}
    </span>
  </div>
</template>
