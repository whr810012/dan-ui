<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, onMounted, ref } from 'vue'
import { injectConfig } from '../../hooks/useConfig'
import { useFormItem } from '../../hooks/useFormItem'
import { useNamespace } from '../../hooks/useNamespace'
import type { DanSize } from '../../hooks/useConfig'
import { formatTime, parseTime } from '../date-picker/dateUtils'
import './style.css'

defineOptions({ name: 'DanTimePicker' })

type TimeModel = string | null
type RangeModel = [string, string] | null

const props = withDefaults(
  defineProps<{
    modelValue?: TimeModel | RangeModel
    isRange?: boolean
    size?: DanSize
    disabled?: boolean
    clearable?: boolean
    placeholder?: string
    startPlaceholder?: string
    endPlaceholder?: string
    step?: number
  }>(),
  {
    modelValue: null,
    isRange: false,
    disabled: false,
    clearable: false,
    placeholder: '选择时间',
    startPlaceholder: '开始时间',
    endPlaceholder: '结束时间',
    step: 5,
  },
)

const emit = defineEmits<{
  'update:modelValue': [value: TimeModel | RangeModel]
  change: [value: TimeModel | RangeModel]
  clear: []
  visibleChange: [visible: boolean]
}>()

const config = injectConfig()
const { form, emitChange } = useFormItem()
const ns = useNamespace('time-picker')
const opened = ref(false)
const rootRef = ref<HTMLElement | null>(null)
const panelRef = ref<HTMLElement | null>(null)
const panelStyle = ref<Record<string, string>>({})
const activeSide = ref<'start' | 'end'>('start')

const resolvedSize = computed(() => props.size ?? config.size.value)
const isDisabled = computed(
  () => props.disabled || form?.disabled.value === true,
)

const rangeValue = computed(() => {
  if (!props.isRange || !Array.isArray(props.modelValue)) {
    return { start: null as string | null, end: null as string | null }
  }
  return { start: props.modelValue[0] ?? null, end: props.modelValue[1] ?? null }
})

const singleValue = computed(() =>
  typeof props.modelValue === 'string' ? props.modelValue : null,
)

const displayValue = computed(() => {
  if (props.isRange) {
    if (!rangeValue.value.start && !rangeValue.value.end) return ''
    return `${rangeValue.value.start || '--:--'} ~ ${rangeValue.value.end || '--:--'}`
  }
  return singleValue.value || ''
})

const showClear = computed(
  () => props.clearable && !!displayValue.value && !isDisabled.value,
)

const hours = computed(() => Array.from({ length: 24 }, (_, i) => i))
const minutes = computed(() => {
  const step = Math.max(1, props.step)
  const list: number[] = []
  for (let m = 0; m < 60; m += step) list.push(m)
  return list
})

const activeParsed = computed(() => {
  if (props.isRange) {
    const raw =
      activeSide.value === 'start'
        ? rangeValue.value.start
        : rangeValue.value.end
    return parseTime(raw)
  }
  return parseTime(singleValue.value)
})

async function openPanel(side: 'start' | 'end' = 'start') {
  if (isDisabled.value) return
  activeSide.value = side
  opened.value = true
  emit('visibleChange', true)
  await nextTick()
  const root = rootRef.value
  if (!root) return
  const rect = root.getBoundingClientRect()
  panelStyle.value = {
    position: 'fixed',
    top: `${rect.bottom + 4}px`,
    left: `${rect.left}px`,
    zIndex: 'var(--dan-z-index-dropdown)',
  }
}

function closePanel() {
  if (!opened.value) return
  opened.value = false
  emit('visibleChange', false)
}

function togglePanel() {
  if (opened.value) closePanel()
  else void openPanel('start')
}

function setValue(value: TimeModel | RangeModel) {
  emit('update:modelValue', value)
  emit('change', value)
  emitChange('change')
}

function pickHour(h: number) {
  const m = activeParsed.value?.m ?? 0
  const next = formatTime(h, m)
  if (!props.isRange) {
    setValue(next)
    return
  }
  if (activeSide.value === 'start') {
    setValue([next, rangeValue.value.end || next])
  } else {
    setValue([rangeValue.value.start || next, next])
  }
}

function pickMinute(m: number) {
  const h = activeParsed.value?.h ?? 0
  const next = formatTime(h, m)
  if (!props.isRange) {
    setValue(next)
    closePanel()
    return
  }
  if (activeSide.value === 'start') {
    setValue([next, rangeValue.value.end || next])
    activeSide.value = 'end'
  } else {
    setValue([rangeValue.value.start || next, next])
    closePanel()
  }
}

function clearValue(event: MouseEvent) {
  event.stopPropagation()
  setValue(null)
  emit('clear')
}

function onDoc(event: MouseEvent) {
  const t = event.target as Node
  if (rootRef.value?.contains(t) || panelRef.value?.contains(t)) return
  closePanel()
}

function onKey(event: KeyboardEvent) {
  if (event.key === 'Escape') closePanel()
}

onMounted(() => {
  document.addEventListener('mousedown', onDoc)
  document.addEventListener('keydown', onKey)
})

onBeforeUnmount(() => {
  document.removeEventListener('mousedown', onDoc)
  document.removeEventListener('keydown', onKey)
})
</script>

<template>
  <div
    ref="rootRef"
    :class="[
      ns.b(),
      ns.m(resolvedSize),
      ns.is('disabled', isDisabled),
      ns.is('opened', opened),
      ns.is('range', isRange),
    ]"
  >
    <button
      type="button"
      :class="ns.e('trigger')"
      :disabled="isDisabled"
      @click="togglePanel"
    >
      <span v-if="displayValue" :class="ns.e('value')">{{ displayValue }}</span>
      <span v-else :class="ns.e('placeholder')">
        {{ isRange ? `${startPlaceholder} - ${endPlaceholder}` : placeholder }}
      </span>
      <span :class="ns.e('suffix')" aria-hidden="true" />
    </button>
    <button
      v-if="showClear"
      type="button"
      :class="ns.e('clear')"
      aria-label="清除"
      @click="clearValue"
    >
      ×
    </button>
    <Teleport to="body">
      <div
        v-if="opened"
        ref="panelRef"
        :class="[ns.e('panel'), ns.is('range', isRange)]"
        :style="panelStyle"
      >
        <div v-if="isRange" :class="ns.e('sides')">
          <button
            type="button"
            :class="[ns.e('side'), ns.is('active', activeSide === 'start')]"
            @click="activeSide = 'start'"
          >
            {{ startPlaceholder }}
          </button>
          <button
            type="button"
            :class="[ns.e('side'), ns.is('active', activeSide === 'end')]"
            @click="activeSide = 'end'"
          >
            {{ endPlaceholder }}
          </button>
        </div>
        <div :class="ns.e('columns')">
          <ul :class="ns.e('list')">
            <li
              v-for="h in hours"
              :key="`h-${h}`"
              :class="[ns.e('option'), ns.is('active', activeParsed?.h === h)]"
              @click="pickHour(h)"
            >
              {{ String(h).padStart(2, '0') }}
            </li>
          </ul>
          <ul :class="ns.e('list')">
            <li
              v-for="m in minutes"
              :key="`m-${m}`"
              :class="[ns.e('option'), ns.is('active', activeParsed?.m === m)]"
              @click="pickMinute(m)"
            >
              {{ String(m).padStart(2, '0') }}
            </li>
          </ul>
        </div>
      </div>
    </Teleport>
  </div>
</template>
