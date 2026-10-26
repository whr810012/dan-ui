<script setup lang="ts">
import { toRef } from 'vue'
import {
  provideForm,
  type FormContext,
  type FormItemContext,
} from '../../hooks/useFormContext'
import { useNamespace } from '../../hooks/useNamespace'
import type { FormRules } from '../../utils/validate'
import type { DanSize } from '../../hooks/useConfig'
import './style.css'

defineOptions({ name: 'DanForm' })

const props = withDefaults(
  defineProps<{
    model: Record<string, unknown>
    rules?: FormRules
    disabled?: boolean
    size?: DanSize
    labelWidth?: string
    labelPosition?: 'left' | 'right' | 'top'
  }>(),
  {
    rules: () => ({}),
    disabled: false,
    labelPosition: 'right',
  },
)

const ns = useNamespace('form')
const fields: FormItemContext[] = []

const context: FormContext = {
  model: toRef(props, 'model'),
  rules: toRef(props, 'rules'),
  disabled: toRef(props, 'disabled'),
  size: toRef(props, 'size'),
  labelWidth: toRef(props, 'labelWidth'),
  addField(field) {
    fields.push(field)
  },
  removeField(field) {
    const index = fields.indexOf(field)
    if (index > -1) fields.splice(index, 1)
  },
}

provideForm(context)

async function validate() {
  const results = await Promise.all(fields.map((field) => field.validate()))
  return results.every(Boolean)
}

async function validateField(prop: string) {
  const field = fields.find((item) => item.prop === prop)
  if (!field) return true
  return field.validate()
}

function resetFields() {
  fields.forEach((field) => field.resetField())
}

function clearValidate(props?: string | string[]) {
  const list = !props
    ? fields
    : fields.filter((field) => {
        const targets = Array.isArray(props) ? props : [props]
        return field.prop && targets.includes(field.prop)
      })
  list.forEach((field) => field.clearValidate())
}

defineExpose({
  validate,
  validateField,
  resetFields,
  clearValidate,
})
</script>

<template>
  <form
    :class="[
      ns.b(),
      ns.m(`label-${labelPosition}`),
      ns.is('disabled', disabled),
    ]"
    @submit.prevent
  >
    <slot />
  </form>
</template>
