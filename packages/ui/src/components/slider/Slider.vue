<script setup lang="ts">
import { computed, ref } from 'vue'
import { useFormItem } from '../../hooks/useFormItem'
import { useNamespace } from '../../hooks/useNamespace'
import './style.css'

defineOptions({ name: 'DanSlider' })

const props = withDefaults(
  defineProps<{
    modelValue?: number
    min?: number
    max?: number
    step?: number
    disabled?: boolean
    showStops?: boolean
    showTooltip?: boolean
  }>(),
  {
    modelValue: 0,
    min: 0,
    max: 100,
    step: 1,
    disabled: false,
    showStops: false,
    showTooltip: true,
  },
)

const emit = defineEmits<{
  'update:modelValue': [value: number]
  change: [value: number]
  input: [value: number]
}>()

const ns = useNamespace('slider')
const { form, emitChange } = useFormItem()
const dragging = ref(false)
const runwayRef = ref<HTMLElement | null>(null)

const isDisabled = computed(
  () => props.disabled || form?.disabled.value === true,
)

const range = computed(() => Math.max(props.max - props.min, 0) || 1)

const percent = computed(() => {
  const value = clamp(props.modelValue)
  return ((value - props.min) / range.value) * 100
})

const stops = computed(() => {
  if (!props.showStops || props.step <= 0) return []
  const count = Math.floor(range.value / props.step)
  const result: number[] = []
  for (let i = 1; i < count; i += 1) {
    result.push((i * props.step * 100) / range.value)
  }
  return result
})

function clamp(value: number) {
  let next = Math.min(props.max, Math.max(props.min, value))
  if (props.step > 0) {
    const steps = Math.round((next - props.min) / props.step)
    next = props.min + steps * props.step
    const precision = Math.max(
      getPrecision(props.step),
      getPrecision(props.min),
    )
    next = Number(next.toFixed(precision))
  }
  return Math.min(props.max, Math.max(props.min, next))
}

function getPrecision(value: number) {
  const text = String(value)
  const index = text.indexOf('.')
  return index === -1 ? 0 : text.length - index - 1
}

function setValue(value: number, emitChangeEvent = false) {
  if (isDisabled.value) return
  const next = clamp(value)
  emit('update:modelValue', next)
  emit('input', next)
  if (emitChangeEvent) {
    emit('change', next)
    emitChange('change')
  }
}

function valueFromClientX(clientX: number) {
  const el = runwayRef.value
  if (!el) return props.modelValue
  const rect = el.getBoundingClientRect()
  const ratio = rect.width ? (clientX - rect.left) / rect.width : 0
  return props.min + ratio * range.value
}

function onRunwayClick(event: MouseEvent) {
  if (isDisabled.value) return
  setValue(valueFromClientX(event.clientX), true)
}

function onKeydown(event: KeyboardEvent) {
  if (isDisabled.value) return
  if (event.key === 'ArrowLeft' || event.key === 'ArrowDown') {
    event.preventDefault()
    setValue(props.modelValue - props.step, true)
  } else if (event.key === 'ArrowRight' || event.key === 'ArrowUp') {
    event.preventDefault()
    setValue(props.modelValue + props.step, true)
  } else if (event.key === 'Home') {
    event.preventDefault()
    setValue(props.min, true)
  } else if (event.key === 'End') {
    event.preventDefault()
    setValue(props.max, true)
  }
}

function onPointerDown(event: PointerEvent) {
  if (isDisabled.value) return
  dragging.value = true
  const target = event.currentTarget as HTMLElement
  target.setPointerCapture(event.pointerId)
  setValue(valueFromClientX(event.clientX))
}

function onPointerMove(event: PointerEvent) {
  if (!dragging.value) return
  setValue(valueFromClientX(event.clientX))
}

function onPointerUp(event: PointerEvent) {
  if (!dragging.value) return
  dragging.value = false
  const target = event.currentTarget as HTMLElement
  if (target.hasPointerCapture(event.pointerId)) {
    target.releasePointerCapture(event.pointerId)
  }
  setValue(valueFromClientX(event.clientX), true)
}
</script>

<template>
  <div
    :class="[
      ns.b(),
      ns.is('disabled', isDisabled),
      ns.is('dragging', dragging),
    ]"
  >
    <div ref="runwayRef" :class="ns.e('runway')" @click="onRunwayClick">
      <div :class="ns.e('bar')" :style="{ width: `${percent}%` }" />
      <div
        v-for="stop in stops"
        :key="stop"
        :class="ns.e('stop')"
        :style="{ left: `${stop}%` }"
      />
      <div
        :class="ns.e('button-wrapper')"
        :style="{ left: `${percent}%` }"
        role="slider"
        tabindex="0"
        :aria-valuemin="min"
        :aria-valuemax="max"
        :aria-valuenow="modelValue"
        :aria-disabled="isDisabled || undefined"
        @keydown="onKeydown"
        @pointerdown.stop="onPointerDown"
        @pointermove="onPointerMove"
        @pointerup="onPointerUp"
        @click.stop
      >
        <div :class="ns.e('button')" />
        <div v-if="showTooltip" :class="ns.e('tooltip')">{{ modelValue }}</div>
      </div>
    </div>
  </div>
</template>
