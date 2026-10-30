<script setup lang="ts">
import { computed, toRef } from 'vue'
import { useFormItem } from '../../hooks/useFormItem'
import { useNamespace } from '../../hooks/useNamespace'
import { provideCheckboxGroup } from './checkboxContext'
import './style.css'

defineOptions({ name: 'DanCheckboxGroup' })

const props = withDefaults(
  defineProps<{
    modelValue?: Array<string | number | boolean>
    disabled?: boolean
    /** 组内复选框带边框 */
    border?: boolean
    /** 按钮样式组 */
    button?: boolean
  }>(),
  {
    modelValue: () => [],
    disabled: false,
    border: false,
    button: false,
  },
)

const emit = defineEmits<{
  'update:modelValue': [value: Array<string | number | boolean>]
  change: [value: Array<string | number | boolean>]
}>()

const ns = useNamespace('checkbox-group')
const { form, emitChange } = useFormItem()
const groupDisabled = computed(
  () => props.disabled || form?.disabled.value === true,
)

provideCheckboxGroup({
  modelValue: toRef(props, 'modelValue'),
  disabled: groupDisabled,
  border: toRef(props, 'border'),
  button: toRef(props, 'button'),
  changeEvent(value) {
    emit('update:modelValue', value)
    emit('change', value)
    emitChange('change')
  },
})
</script>

<template>
  <div
    :class="[
      ns.b(),
      ns.is('disabled', groupDisabled),
      ns.is('button', button),
    ]"
    role="group"
  >
    <slot />
  </div>
</template>
