<script setup lang="ts">
import { computed, toRef } from 'vue'
import { useFormItem } from '../../hooks/useFormItem'
import { useNamespace } from '../../hooks/useNamespace'
import { provideRadioGroup } from './radioContext'
import './style.css'

defineOptions({ name: 'DanRadioGroup' })

const props = withDefaults(
  defineProps<{
    modelValue?: string | number | boolean
    disabled?: boolean
  }>(),
  {
    disabled: false,
  },
)

const emit = defineEmits<{
  'update:modelValue': [value: string | number | boolean]
  change: [value: string | number | boolean]
}>()

const ns = useNamespace('radio-group')
const { form, emitChange } = useFormItem()
const groupDisabled = computed(
  () => props.disabled || form?.disabled.value === true,
)

provideRadioGroup({
  modelValue: toRef(props, 'modelValue'),
  disabled: groupDisabled,
  changeEvent(value) {
    emit('update:modelValue', value)
    emit('change', value)
    emitChange('change')
  },
})
</script>

<template>
  <div :class="ns.b()" role="radiogroup">
    <slot />
  </div>
</template>
