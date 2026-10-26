<script setup lang="ts">
import { computed, inject } from 'vue'
import { useFormItem } from '../../hooks/useFormItem'
import { useNamespace } from '../../hooks/useNamespace'
import { checkboxGroupKey } from './checkboxContext'
import './style.css'

defineOptions({ name: 'DanCheckbox' })

const props = withDefaults(
  defineProps<{
    modelValue?: boolean | string | number | Array<string | number | boolean>
    label?: string | number | boolean
    disabled?: boolean
    indeterminate?: boolean
  }>(),
  {
    disabled: false,
    indeterminate: false,
  },
)

const emit = defineEmits<{
  'update:modelValue': [
    value: boolean | string | number | Array<string | number | boolean>,
  ]
  change: [
    value: boolean | string | number | Array<string | number | boolean>,
  ]
}>()

const ns = useNamespace('checkbox')
const group = inject(checkboxGroupKey, undefined)
const { form, emitChange } = useFormItem()

const isDisabled = computed(
  () =>
    props.disabled ||
    group?.disabled.value === true ||
    form?.disabled.value === true,
)

const isChecked = computed(() => {
  if (group) {
    return group.modelValue.value.includes(props.label as any)
  }
  if (Array.isArray(props.modelValue)) {
    return props.modelValue.includes(props.label as any)
  }
  if (typeof props.modelValue === 'boolean') return props.modelValue
  return props.modelValue === props.label
})

function onChange(event: Event) {
  const checked = (event.target as HTMLInputElement).checked
  if (group) {
    const next = [...group.modelValue.value]
    const label = props.label as string | number | boolean
    const index = next.indexOf(label)
    if (checked && index === -1) next.push(label)
    if (!checked && index > -1) next.splice(index, 1)
    group.changeEvent(next)
    emitChange('change')
    return
  }

  let next: boolean | string | number | Array<string | number | boolean>
  if (Array.isArray(props.modelValue)) {
    next = [...props.modelValue]
    const label = props.label as string | number | boolean
    const index = next.indexOf(label)
    if (checked && index === -1) next.push(label)
    if (!checked && index > -1) next.splice(index, 1)
  } else if (typeof props.modelValue === 'boolean' || props.modelValue == null) {
    next = checked
  } else {
    next = checked ? (props.label as any) : undefined as any
  }

  emit('update:modelValue', next)
  emit('change', next)
  emitChange('change')
}
</script>

<template>
  <label
    :class="[
      ns.b(),
      ns.is('checked', isChecked),
      ns.is('disabled', isDisabled),
      ns.is('indeterminate', indeterminate),
    ]"
  >
    <span :class="ns.e('input')">
      <input
        :class="ns.e('original')"
        type="checkbox"
        :checked="isChecked"
        :disabled="isDisabled"
        @change="onChange"
      />
      <span :class="ns.e('inner')" />
    </span>
    <span v-if="$slots.default || label != null" :class="ns.e('label')">
      <slot>{{ label }}</slot>
    </span>
  </label>
</template>
