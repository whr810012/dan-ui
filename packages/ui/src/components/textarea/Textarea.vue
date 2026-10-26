<script setup lang="ts">
import { computed, ref, useAttrs } from 'vue'
import { injectConfig } from '../../hooks/useConfig'
import { useFormItem } from '../../hooks/useFormItem'
import { useNamespace } from '../../hooks/useNamespace'
import './style.css'

defineOptions({ name: 'DanTextarea', inheritAttrs: false })

const props = withDefaults(
  defineProps<{
    modelValue?: string
    disabled?: boolean
    readonly?: boolean
    placeholder?: string
    rows?: number
    maxlength?: number
    showWordLimit?: boolean
  }>(),
  {
    modelValue: '',
    disabled: false,
    readonly: false,
    placeholder: '',
    rows: 3,
    showWordLimit: false,
  },
)

const emit = defineEmits<{
  'update:modelValue': [value: string]
  input: [value: string]
  change: [value: string]
  blur: [event: FocusEvent]
  focus: [event: FocusEvent]
}>()

const attrs = useAttrs()
const config = injectConfig()
const { form, emitChange } = useFormItem()
const ns = useNamespace('textarea')
const focused = ref(false)

const isDisabled = computed(
  () => props.disabled || form?.disabled.value === true,
)
const count = computed(() => String(props.modelValue ?? '').length)

function onInput(event: Event) {
  const value = (event.target as HTMLTextAreaElement).value
  emit('update:modelValue', value)
  emit('input', value)
}

function onChange(event: Event) {
  const value = (event.target as HTMLTextAreaElement).value
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
</script>

<template>
  <div
    :class="[
      ns.b(),
      ns.m(config.size.value),
      ns.is('disabled', isDisabled),
      ns.is('focus', focused),
    ]"
  >
    <textarea
      :class="ns.e('inner')"
      :value="modelValue"
      :disabled="isDisabled"
      :readonly="readonly"
      :placeholder="placeholder"
      :rows="rows"
      :maxlength="maxlength"
      v-bind="attrs"
      @input="onInput"
      @change="onChange"
      @blur="onBlur"
      @focus="onFocus"
    />
    <div v-if="showWordLimit && maxlength != null" :class="ns.e('count')">
      {{ count }} / {{ maxlength }}
    </div>
  </div>
</template>
