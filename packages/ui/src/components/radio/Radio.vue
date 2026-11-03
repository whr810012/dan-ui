<script setup lang="ts">
import { computed, inject } from 'vue'
import { useFormItem } from '../../hooks/useFormItem'
import { useNamespace } from '../../hooks/useNamespace'
import { radioGroupKey } from './radioContext'
import './style.css'

defineOptions({ name: 'DanRadio' })

const props = withDefaults(
  defineProps<{
    modelValue?: string | number | boolean
    label?: string | number | boolean
    disabled?: boolean
    /** 边框样式；组内也可由 RadioGroup.border 开启 */
    border?: boolean
    /** 按钮样式；组内也可由 RadioGroup.button 开启 */
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

const ns = useNamespace('radio')
const group = inject(radioGroupKey, undefined)
const { form, emitChange } = useFormItem()

const isDisabled = computed(
  () =>
    props.disabled ||
    group?.disabled.value === true ||
    form?.disabled.value === true,
)

const isBorder = computed(() => props.border || group?.border.value === true)

const isButton = computed(() => props.button || group?.button.value === true)

const isChecked = computed(() => {
  const current = group ? group.modelValue.value : props.modelValue
  return current === props.label
})

function onChange() {
  const value = props.label as string | number | boolean
  if (group) {
    group.changeEvent(value)
  } else {
    emit('update:modelValue', value)
    emit('change', value)
  }
  emitChange('change')
}
</script>

<template>
  <label
    :class="[
      ns.b(),
      ns.is('checked', isChecked),
      ns.is('disabled', isDisabled),
      ns.is('border', isBorder && !isButton),
      ns.is('button', isButton),
    ]"
  >
    <span v-if="!isButton" :class="ns.e('input')">
      <input
        :class="ns.e('original')"
        type="radio"
        :checked="isChecked"
        :disabled="isDisabled"
        @change="onChange"
      />
      <span :class="ns.e('inner')">
        <span v-if="isChecked" :class="ns.e('dot')" />
      </span>
    </span>
    <input
      v-else
      :class="ns.e('original')"
      type="radio"
      :checked="isChecked"
      :disabled="isDisabled"
      @change="onChange"
    />
    <span v-if="$slots.default || label != null" :class="ns.e('label')">
      <slot>{{ label }}</slot>
    </span>
  </label>
</template>
