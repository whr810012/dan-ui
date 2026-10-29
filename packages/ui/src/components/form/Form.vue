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
    /** validate 失败时自动滚到首个错误项 */
    scrollToError?: boolean
  }>(),
  {
    rules: () => ({}),
    disabled: false,
    labelPosition: 'right',
    scrollToError: false,
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

function scrollToField(prop: string) {
  const field = fields.find((item) => item.prop === prop)
  field?.$el?.scrollIntoView({ behavior: 'smooth', block: 'center' })
}

async function validate() {
  const results = await Promise.all(
    fields.map(async (field) => ({
      field,
      ok: await field.validate(),
    })),
  )
  const firstError = results.find((item) => !item.ok)
  if (firstError && props.scrollToError && firstError.field.prop) {
    scrollToField(firstError.field.prop)
  }
  return results.every((item) => item.ok)
}

async function validateField(prop: string) {
  const field = fields.find((item) => item.prop === prop)
  if (!field) return true
  return field.validate()
}

function resetFields() {
  fields.forEach((field) => field.resetField())
}

function clearValidate(propsArg?: string | string[]) {
  const list = !propsArg
    ? fields
    : fields.filter((field) => {
        const targets = Array.isArray(propsArg) ? propsArg : [propsArg]
        return field.prop && targets.includes(field.prop)
      })
  list.forEach((field) => field.clearValidate())
}

defineExpose({
  validate,
  validateField,
  resetFields,
  clearValidate,
  scrollToField,
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
