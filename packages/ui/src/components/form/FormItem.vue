<script setup lang="ts">
import {
  computed,
  inject,
  onBeforeUnmount,
  onMounted,
  reactive,
  ref,
  watch,
} from 'vue'
import {
  formContextKey,
  provideFormItem,
  type FormItemContext,
} from '../../hooks/useFormContext'
import { useNamespace } from '../../hooks/useNamespace'
import { getByPath } from '../../utils/path'
import { validateValue } from '../../utils/validate'
import './style.css'

defineOptions({ name: 'DanFormItem' })

const props = withDefaults(
  defineProps<{
    label?: string
    prop?: string
    required?: boolean
    labelWidth?: string
  }>(),
  {
    required: undefined,
  },
)

const ns = useNamespace('form-item')
const form = inject(formContextKey, undefined)
const rootRef = ref<HTMLElement | null>(null)
const validateState = ref('')
const validateMessage = ref('')
const initialValue = ref<unknown>()

const fieldValue = computed(() =>
  form ? getByPath(form.model.value, props.prop) : undefined,
)

const isRequired = computed(() => {
  if (props.required != null) return props.required
  if (!form || !props.prop) return false
  const rule = form.rules.value[props.prop]
  const rules = Array.isArray(rule) ? rule : rule ? [rule] : []
  return rules.some((item) => item.required)
})

const labelStyle = computed(() => {
  const width = props.labelWidth || form?.labelWidth?.value
  return width ? { width } : undefined
})

async function validate(trigger?: string) {
  if (!form || !props.prop) return true
  const rule = form.rules.value[props.prop]
  const errors = await validateValue(fieldValue.value, rule, trigger)
  if (errors.length) {
    validateState.value = 'error'
    validateMessage.value = errors[0]
    return false
  }
  validateState.value = 'success'
  validateMessage.value = ''
  return true
}

function clearValidate() {
  validateState.value = ''
  validateMessage.value = ''
}

function resetField() {
  if (form && props.prop) {
    const model = form.model.value
    const segments = props.prop.split('.')
    if (segments.length === 1) {
      model[props.prop] = initialValue.value as any
    } else {
      let current: any = model
      for (let i = 0; i < segments.length - 1; i += 1) {
        current = current?.[segments[i]]
      }
      if (current) current[segments[segments.length - 1]] = initialValue.value
    }
  }
  clearValidate()
}

const field: FormItemContext = reactive({
  prop: props.prop,
  validate,
  resetField,
  clearValidate,
  $el: null as HTMLElement | null,
})

watch(
  () => props.prop,
  (prop) => {
    field.prop = prop
  },
)

provideFormItem(field)

onMounted(() => {
  field.$el = rootRef.value
  initialValue.value = fieldValue.value
  form?.addField(field)
})

onBeforeUnmount(() => {
  form?.removeField(field)
})
</script>

<template>
  <div
    ref="rootRef"
    :class="[
      ns.b(),
      ns.is('error', validateState === 'error'),
      ns.is('required', isRequired),
    ]"
  >
    <label
      v-if="label || $slots.label"
      :class="ns.e('label')"
      :style="labelStyle"
    >
      <slot name="label">{{ label }}</slot>
    </label>
    <div :class="ns.e('content')">
      <slot />
      <div v-if="validateMessage" :class="ns.e('error')">
        {{ validateMessage }}
      </div>
    </div>
  </div>
</template>
