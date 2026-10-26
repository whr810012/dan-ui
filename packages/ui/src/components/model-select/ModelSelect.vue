<script setup lang="ts">
import { DanSelect, type SelectOption } from '../select'
import { useNamespace } from '../../hooks/useNamespace'
import './style.css'

defineOptions({ name: 'DanModelSelect' })

withDefaults(
  defineProps<{
    modelValue?: string
    options?: SelectOption[]
    disabled?: boolean
    placeholder?: string
  }>(),
  {
    options: () => [],
    disabled: false,
    placeholder: '选择模型',
  },
)

const emit = defineEmits<{
  'update:modelValue': [value: string | number | boolean | null]
  change: [value: string | number | boolean | null]
}>()

const ns = useNamespace('model-select')
</script>

<template>
  <div :class="ns.b()">
    <DanSelect
      :model-value="modelValue"
      :options="options"
      :disabled="disabled"
      :placeholder="placeholder"
      @update:model-value="emit('update:modelValue', $event)"
      @change="emit('change', $event)"
    />
  </div>
</template>
