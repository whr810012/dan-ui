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
    /** 组内单选框带边框 */
    border?: boolean
    /** 按钮样式组 */
    button?: boolean
  }>(),
  {
    disabled: false,
    border: false,
    button: false,
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
    role="radiogroup"
  >
    <slot />
  </div>
</template>
