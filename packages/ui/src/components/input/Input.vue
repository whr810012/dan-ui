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
  }>(),
  {
    modelValue: '',
    type: 'text',
    disabled: false,
    readonly: false,
    clearable: false,
    placeholder: '',
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
const showClear = computed(
  () =>
    props.clearable &&
    !isDisabled.value &&
    !props.readonly &&
    String(props.modelValue ?? '').length > 0,
)

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

function onInput(event: Event) {
  const value = (event.target as HTMLInputElement).value
  emit('update:modelValue', value)
  emit('input', value)
}

function onChange(event: Event) {
  const value = (event.target as HTMLInputElement).value
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
  emit('update:modelValue', '')
  emit('input', '')
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
      :value="modelValue"
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
  </div>
</template>
