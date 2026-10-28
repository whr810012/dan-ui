<script setup lang="ts">
import { computed } from 'vue'
import { injectConfig } from '../../hooks/useConfig'
import { useNamespace } from '../../hooks/useNamespace'
import type { DanSize } from '../../hooks/useConfig'
import './style.css'

defineOptions({ name: 'DanSegmented' })

export interface SegmentedOption {
  label: string
  value: string | number
  disabled?: boolean
}

const props = withDefaults(
  defineProps<{
    modelValue?: string | number
    options?: SegmentedOption[]
    size?: DanSize
    disabled?: boolean
    block?: boolean
  }>(),
  {
    options: () => [],
    disabled: false,
    block: false,
  },
)

const emit = defineEmits<{
  'update:modelValue': [value: string | number]
  change: [value: string | number]
}>()

const config = injectConfig()
const ns = useNamespace('segmented')
const resolvedSize = computed(() => props.size ?? config.size.value)

function select(option: SegmentedOption) {
  if (props.disabled || option.disabled) return
  if (option.value === props.modelValue) return
  emit('update:modelValue', option.value)
  emit('change', option.value)
}
</script>

<template>
  <div
    :class="[
      ns.b(),
      ns.m(resolvedSize),
      ns.is('disabled', disabled),
      ns.is('block', block),
    ]"
    role="radiogroup"
  >
    <button
      v-for="option in options"
      :key="String(option.value)"
      type="button"
      role="radio"
      :class="[
        ns.e('item'),
        ns.is('active', option.value === modelValue),
        ns.is('disabled', Boolean(option.disabled) || disabled),
      ]"
      :aria-checked="option.value === modelValue"
      :disabled="disabled || option.disabled"
      @click="select(option)"
    >
      {{ option.label }}
    </button>
  </div>
</template>
