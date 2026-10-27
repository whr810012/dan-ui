<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { injectConfig } from '../../hooks/useConfig'
import { useFormItem } from '../../hooks/useFormItem'
import { useNamespace } from '../../hooks/useNamespace'
import type { DanSize } from '../../hooks/useConfig'
import {
  WEEK_LABELS,
  buildCalendarDays,
  formatDate,
  isInRange,
  isSameDay,
  parseDate,
} from './dateUtils'
import './style.css'

defineOptions({ name: 'DanDatePicker' })

type DateModel = string | null
type RangeModel = [string, string] | null

const props = withDefaults(
  defineProps<{
    modelValue?: DateModel | RangeModel
    type?: 'date' | 'daterange'
    size?: DanSize
    disabled?: boolean
    clearable?: boolean
    placeholder?: string
    startPlaceholder?: string
    endPlaceholder?: string
  }>(),
  {
    modelValue: null,
    type: 'date',
    disabled: false,
    clearable: false,
    placeholder: '选择日期',
    startPlaceholder: '开始日期',
    endPlaceholder: '结束日期',
  },
)

const emit = defineEmits<{
  'update:modelValue': [value: DateModel | RangeModel]
  change: [value: DateModel | RangeModel]
  clear: []
  focus: [event: FocusEvent]
  blur: [event: FocusEvent]
  visibleChange: [visible: boolean]
}>()

const config = injectConfig()
const { form, emitChange } = useFormItem()
const ns = useNamespace('date-picker')

const opened = ref(false)
const focused = ref(false)
const rootRef = ref<HTMLElement | null>(null)
const panelRef = ref<HTMLElement | null>(null)
const panelStyle = ref<Record<string, string>>({})
const rangePicking = ref<Date | null>(null)

const initialView =
  props.type === 'daterange'
    ? parseDate(Array.isArray(props.modelValue) ? props.modelValue[0] : null)
    : parseDate(typeof props.modelValue === 'string' ? props.modelValue : null)

const viewDate = ref(initialView ?? new Date())

const resolvedSize = computed(() => props.size ?? config.size.value)
const isDisabled = computed(
  () => props.disabled || form?.disabled.value === true,
)
const isRange = computed(() => props.type === 'daterange')

const selectedDate = computed(() =>
  !isRange.value && typeof props.modelValue === 'string'
    ? parseDate(props.modelValue)
    : null,
)

const rangeValue = computed(() => {
  if (!isRange.value || !Array.isArray(props.modelValue)) {
    return { start: null as Date | null, end: null as Date | null }
  }
  return {
    start: parseDate(props.modelValue[0]),
    end: parseDate(props.modelValue[1]),
  }
})

const displayValue = computed(() => {
  if (isRange.value) {
    if (!Array.isArray(props.modelValue)) return ''
    return `${props.modelValue[0]} ~ ${props.modelValue[1]}`
  }
  return typeof props.modelValue === 'string' ? props.modelValue : ''
})

const showClear = computed(
  () => props.clearable && !!displayValue.value && !isDisabled.value,
)
const monthLabel = computed(
  () =>
    `${viewDate.value.getFullYear()} 年 ${viewDate.value.getMonth() + 1} 月`,
)
const cells = computed(() => buildCalendarDays(viewDate.value))

watch(
  () => props.modelValue,
  (value) => {
    if (isRange.value && Array.isArray(value)) {
      const parsed = parseDate(value[0])
      if (parsed) viewDate.value = parsed
    } else if (typeof value === 'string') {
      const parsed = parseDate(value)
      if (parsed) viewDate.value = parsed
    }
  },
)

function updatePanelPosition() {
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

async function openPanel() {
  if (isDisabled.value) return
  opened.value = true
  focused.value = true
  rangePicking.value = null
  emit('visibleChange', true)
  await nextTick()
  updatePanelPosition()
}

function closePanel() {
  if (!opened.value) return
  opened.value = false
  focused.value = false
  rangePicking.value = null
  emit('visibleChange', false)
}

function togglePanel() {
  if (opened.value) closePanel()
  else void openPanel()
}

function setValue(value: DateModel | RangeModel) {
  emit('update:modelValue', value)
  emit('change', value)
  emitChange('change')
}

function dayClass(cell: {
  date: Date
  inCurrentMonth: boolean
  isToday: boolean
}) {
  const classes = [
    ns.e('day'),
    ns.is('other', !cell.inCurrentMonth),
    ns.is('today', cell.isToday),
  ]
  if (
    !isRange.value &&
    selectedDate.value &&
    isSameDay(cell.date, selectedDate.value)
  ) {
    classes.push(ns.is('selected', true))
  }
  if (isRange.value) {
    const start = rangePicking.value ?? rangeValue.value.start
    const end = rangePicking.value ? null : rangeValue.value.end
    if (start && isSameDay(cell.date, start))
      classes.push(ns.is('selected', true))
    if (end && isSameDay(cell.date, end)) classes.push(ns.is('selected', true))
    if (start && end && isInRange(cell.date, start, end)) {
      classes.push(ns.is('in-range', true))
    }
    if (start && rangePicking.value && isInRange(cell.date, start, cell.date)) {
      classes.push(ns.is('in-range', true))
    }
  }
  return classes
}

function selectDay(date: Date) {
  if (isDisabled.value) return
  if (!isRange.value) {
    setValue(formatDate(date))
    viewDate.value = new Date(date)
    closePanel()
    return
  }

  if (!rangePicking.value) {
    rangePicking.value = date
    return
  }

  const start = rangePicking.value
  const end = date
  const ordered =
    start.getTime() <= end.getTime()
      ? ([formatDate(start), formatDate(end)] as [string, string])
      : ([formatDate(end), formatDate(start)] as [string, string])
  setValue(ordered)
  rangePicking.value = null
  closePanel()
}

function clearValue(event: MouseEvent) {
  event.stopPropagation()
  setValue(null)
  emit('clear')
}

function prevMonth() {
  viewDate.value = new Date(
    viewDate.value.getFullYear(),
    viewDate.value.getMonth() - 1,
    1,
  )
}

function nextMonth() {
  viewDate.value = new Date(
    viewDate.value.getFullYear(),
    viewDate.value.getMonth() + 1,
    1,
  )
}

function selectToday() {
  selectDay(new Date())
}

function onDocumentPointer(event: MouseEvent) {
  const target = event.target as Node
  if (rootRef.value?.contains(target) || panelRef.value?.contains(target))
    return
  closePanel()
}

function onKeydown(event: KeyboardEvent) {
  if (event.key === 'Escape') closePanel()
}

function onFocus(event: FocusEvent) {
  focused.value = true
  emit('focus', event)
}

function onBlur(event: FocusEvent) {
  if (!opened.value) focused.value = false
  emit('blur', event)
  emitChange('blur')
}

onMounted(() => {
  document.addEventListener('mousedown', onDocumentPointer)
  document.addEventListener('keydown', onKeydown)
  window.addEventListener('resize', updatePanelPosition)
  window.addEventListener('scroll', updatePanelPosition, true)
})

onBeforeUnmount(() => {
  document.removeEventListener('mousedown', onDocumentPointer)
  document.removeEventListener('keydown', onKeydown)
  window.removeEventListener('resize', updatePanelPosition)
  window.removeEventListener('scroll', updatePanelPosition, true)
})
</script>

<template>
  <div
    ref="rootRef"
    :class="[
      ns.b(),
      ns.m(resolvedSize),
      ns.is('disabled', isDisabled),
      ns.is('focus', focused || opened),
      ns.is('opened', opened),
      ns.is('range', isRange),
    ]"
  >
    <button
      type="button"
      :class="ns.e('trigger')"
      :disabled="isDisabled"
      @click="togglePanel"
      @focus="onFocus"
      @blur="onBlur"
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
        :class="ns.e('panel')"
        :style="panelStyle"
        role="dialog"
        aria-label="日期面板"
      >
        <div :class="ns.e('header')">
          <button
            type="button"
            :class="ns.e('nav')"
            aria-label="上个月"
            @click="prevMonth"
          >
            ‹
          </button>
          <span :class="ns.e('month')">{{ monthLabel }}</span>
          <button
            type="button"
            :class="ns.e('nav')"
            aria-label="下个月"
            @click="nextMonth"
          >
            ›
          </button>
        </div>
        <div :class="ns.e('weekdays')">
          <span v-for="label in WEEK_LABELS" :key="label">{{ label }}</span>
        </div>
        <div :class="ns.e('days')">
          <button
            v-for="cell in cells"
            :key="formatDate(cell.date)"
            type="button"
            :class="dayClass(cell)"
            @click="selectDay(cell.date)"
          >
            {{ cell.label }}
          </button>
        </div>
        <div v-if="!isRange" :class="ns.e('footer')">
          <button type="button" :class="ns.e('today')" @click="selectToday">
            今天
          </button>
        </div>
        <div v-else :class="ns.e('footer')">
          <span :class="ns.e('hint')">
            {{ rangePicking ? '请选择结束日期' : '请选择开始日期' }}
          </span>
        </div>
      </div>
    </Teleport>
  </div>
</template>
