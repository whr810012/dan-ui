<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { injectConfig } from '../../hooks/useConfig'
import { useFormItem } from '../../hooks/useFormItem'
import { useNamespace } from '../../hooks/useNamespace'
import type { DanSize } from '../../hooks/useConfig'
import './style.css'

defineOptions({ name: 'DanInputNumber' })

const props = withDefaults(
  defineProps<{
    modelValue?: number | null
    min?: number
    max?: number
    step?: number
    stepStrictly?: boolean
    precision?: number
    size?: DanSize
    disabled?: boolean
    readonly?: boolean
    controls?: boolean
    controlsPosition?: '' | 'right'
    placeholder?: string
  }>(),
  {
    modelValue: null,
    min: -Infinity,
    max: Infinity,
    step: 1,
    stepStrictly: false,
    disabled: false,
    readonly: false,
    controls: true,
    controlsPosition: '',
    placeholder: '',
  },
)

const emit = defineEmits<{
  'update:modelValue': [value: number | undefined]
  change: [current: number | undefined, previous: number | undefined]
  blur: [event: FocusEvent]
  focus: [event: FocusEvent]
}>()

const config = injectConfig()
const { form, emitChange } = useFormItem()
const ns = useNamespace('input-number')
const focused = ref(false)
const userInput = ref<string | null>(null)

const resolvedSize = computed(() => props.size ?? config.size.value)
const isDisabled = computed(
  () => props.disabled || form?.disabled.value === true,
)

const numPrecision = computed(() => {
  if (typeof props.precision === 'number') return props.precision
  const stepPrecision = getPrecision(props.step)
  return Math.max(getPrecision(props.modelValue ?? 0), stepPrecision)
})

function getPrecision(value: number) {
  if (!Number.isFinite(value)) return 0
  const text = String(value)
  const index = text.indexOf('.')
  return index === -1 ? 0 : text.length - index - 1
}

function toPrecision(value: number) {
  const precision = Math.max(0, Math.floor(numPrecision.value))
  return Number.parseFloat(value.toFixed(precision))
}

function clamp(value: number) {
  let next = value
  if (Number.isFinite(props.min)) next = Math.max(props.min, next)
  if (Number.isFinite(props.max)) next = Math.min(props.max, next)
  if (props.stepStrictly) {
    const step = props.step || 1
    const min = Number.isFinite(props.min) ? props.min : 0
    next = min + Math.round((next - min) / step) * step
  }
  return toPrecision(next)
}

function setCurrentValue(value: number | undefined, emitUserChange = true) {
  const previous =
    props.modelValue == null || Number.isNaN(Number(props.modelValue))
      ? undefined
      : Number(props.modelValue)
  const next = value == null || Number.isNaN(value) ? undefined : clamp(value)

  if (previous === next) {
    userInput.value = null
    return
  }
  emit('update:modelValue', next)
  if (emitUserChange) {
    emit('change', next, previous)
    emitChange('change')
  }
  userInput.value = null
}

function increase() {
  if (isDisabled.value || props.readonly || maxDisabled.value) return
  const current = Number(props.modelValue) || 0
  setCurrentValue(toPrecision(current + props.step))
}

function decrease() {
  if (isDisabled.value || props.readonly || minDisabled.value) return
  const current = Number(props.modelValue) || 0
  setCurrentValue(toPrecision(current - props.step))
}

const minDisabled = computed(() => {
  const current = Number(props.modelValue)
  if (!Number.isFinite(current)) return false
  return current <= props.min
})

const maxDisabled = computed(() => {
  const current = Number(props.modelValue)
  if (!Number.isFinite(current)) return false
  return current >= props.max
})

const displayValue = computed(() => {
  if (userInput.value !== null) return userInput.value
  if (props.modelValue == null || Number.isNaN(Number(props.modelValue))) {
    return ''
  }
  const value = Number(props.modelValue)
  if (typeof props.precision === 'number') {
    return value.toFixed(Math.max(0, Math.floor(props.precision)))
  }
  return String(value)
})

function onInput(event: Event) {
  userInput.value = (event.target as HTMLInputElement).value
}

function onChange(event: Event) {
  const raw = (event.target as HTMLInputElement).value.trim()
  if (raw === '') {
    setCurrentValue(undefined)
    return
  }
  const parsed = Number(raw)
  if (Number.isNaN(parsed)) {
    userInput.value = null
    return
  }
  setCurrentValue(parsed)
}

function onBlur(event: FocusEvent) {
  focused.value = false
  if (userInput.value !== null) {
    onChange({ target: event.target } as unknown as Event)
  }
  emit('blur', event)
  emitChange('blur')
}

function onFocus(event: FocusEvent) {
  focused.value = true
  emit('focus', event)
}

watch(
  () => props.modelValue,
  () => {
    userInput.value = null
  },
)
</script>

<template>
  <div
    :class="[
      ns.b(),
      ns.m(resolvedSize),
      ns.is('disabled', isDisabled),
      ns.is('focus', focused),
      ns.is('controls-right', controls && controlsPosition === 'right'),
      ns.is('without-controls', !controls),
    ]"
  >
    <button
      v-if="controls"
      type="button"
      :class="[
        ns.e('decrease'),
        ns.is('disabled', isDisabled || readonly || minDisabled),
      ]"
      :disabled="isDisabled || readonly || minDisabled"
      aria-label="减少"
      @click="decrease"
    >
      −
    </button>
    <input
      :class="ns.e('inner')"
      :value="displayValue"
      :disabled="isDisabled"
      :readonly="readonly"
      :placeholder="placeholder"
      :aria-valuemin="Number.isFinite(min) ? min : undefined"
      :aria-valuemax="Number.isFinite(max) ? max : undefined"
      :aria-valuenow="
        modelValue == null || Number.isNaN(Number(modelValue))
          ? undefined
          : Number(modelValue)
      "
      role="spinbutton"
      @input="onInput"
      @change="onChange"
      @blur="onBlur"
      @focus="onFocus"
      @keydown.up.prevent="increase"
      @keydown.down.prevent="decrease"
    />
    <button
      v-if="controls"
      type="button"
      :class="[
        ns.e('increase'),
        ns.is('disabled', isDisabled || readonly || maxDisabled),
      ]"
      :disabled="isDisabled || readonly || maxDisabled"
      aria-label="增加"
      @click="increase"
    >
      +
    </button>
  </div>
</template>
