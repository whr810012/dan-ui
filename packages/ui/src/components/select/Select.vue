<script setup lang="ts">
import { computed, ref, useAttrs } from 'vue'
import { injectConfig } from '../../hooks/useConfig'
import { useFormItem } from '../../hooks/useFormItem'
import { useNamespace } from '../../hooks/useNamespace'
import type { DanSize } from '../../hooks/useConfig'
import type { SelectOption } from './types'
import './style.css'

defineOptions({ name: 'DanSelect', inheritAttrs: false })

const props = withDefaults(
  defineProps<{
    modelValue?: string | number | boolean | null
    options?: SelectOption[]
    size?: DanSize
    disabled?: boolean
    placeholder?: string
    clearable?: boolean
  }>(),
  {
    options: () => [],
    disabled: false,
    placeholder: '请选择',
    clearable: false,
  },
)

const emit = defineEmits<{
  'update:modelValue': [value: string | number | boolean | null]
  change: [value: string | number | boolean | null]
  clear: []
}>()

const attrs = useAttrs()
const config = injectConfig()
const { form, emitChange } = useFormItem()
const ns = useNamespace('select')
const focused = ref(false)

const resolvedSize = computed(() => props.size ?? config.size.value)
const isDisabled = computed(
  () => props.disabled || form?.disabled.value === true,
)

function onChange(event: Event) {
  const raw = (event.target as HTMLSelectElement).value
  const matched = props.options.find((item) => String(item.value) === raw)
  const value = matched ? matched.value : raw
  emit('update:modelValue', value)
  emit('change', value)
  emitChange('change')
}

function onClear() {
  emit('update:modelValue', null)
  emit('change', null)
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
    ]"
  >
    <select
      :class="ns.e('inner')"
      :disabled="isDisabled"
      :value="modelValue == null ? '' : String(modelValue)"
      v-bind="attrs"
      @change="onChange"
      @focus="focused = true"
      @blur="focused = false; emitChange('blur')"
    >
      <option v-if="placeholder" disabled value="">
        {{ placeholder }}
      </option>
      <option
        v-for="item in options"
        :key="String(item.value)"
        :value="String(item.value)"
        :disabled="item.disabled"
      >
        {{ item.label }}
      </option>
    </select>
    <span
      v-if="clearable && modelValue != null && !isDisabled"
      :class="ns.e('clear')"
      role="button"
      @mousedown.prevent
      @click="onClear"
    >
      ×
    </span>
  </div>
</template>
