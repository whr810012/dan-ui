<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { injectConfig } from '../../hooks/useConfig'
import { useFormItem } from '../../hooks/useFormItem'
import { useNamespace } from '../../hooks/useNamespace'
import { useLocale } from '../../locale'
import type { DanSize } from '../../hooks/useConfig'
import {
  WEEK_LABELS,
  buildCalendarDays,
  formatDate,
  formatDateTime,
  formatTime,
  isInRange,
  isSameDay,
  parseDateLike,
} from './dateUtils'
import './style.css'

defineOptions({ name: 'DanDatePicker' })

type DateModel = string | null
type RangeModel = [string, string] | null
type PickerType =
  | 'date'
  | 'daterange'
  | 'datetime'
  | 'datetimerange'
  | 'month'
  | 'year'
  | 'week'

export interface DatePickerShortcut {
  text: string
  value: Date | [Date, Date] | (() => Date | [Date, Date])
}

const props = withDefaults(
  defineProps<{
    modelValue?: DateModel | RangeModel
    type?: PickerType
    size?: DanSize
    disabled?: boolean
    clearable?: boolean
    placeholder?: string
    startPlaceholder?: string
    endPlaceholder?: string
    disabledDate?: (date: Date) => boolean
    shortcuts?: DatePickerShortcut[]
    /** 范围模式下左右面板月份可独立切换 */
    unlinkPanels?: boolean
  }>(),
  {
    modelValue: null,
    type: 'date',
    disabled: false,
    clearable: false,
    shortcuts: () => [],
    unlinkPanels: false,
  },
)

const { t } = useLocale()
const resolvedPlaceholder = computed(
  () => props.placeholder ?? t('datePicker.placeholder'),
)
const resolvedStartPlaceholder = computed(
  () => props.startPlaceholder ?? t('datePicker.startPlaceholder'),
)
const resolvedEndPlaceholder = computed(
  () => props.endPlaceholder ?? t('datePicker.endPlaceholder'),
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

const isRange = computed(
  () => props.type === 'daterange' || props.type === 'datetimerange',
)
const isDateTime = computed(
  () => props.type === 'datetime' || props.type === 'datetimerange',
)
const isMonth = computed(() => props.type === 'month')
const isYear = computed(() => props.type === 'year')
const isWeek = computed(() => props.type === 'week')

function formatMonth(date: Date) {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`
}

function startOfWeek(date: Date) {
  const d = new Date(date.getFullYear(), date.getMonth(), date.getDate())
  const day = d.getDay()
  const diff = day === 0 ? -6 : 1 - day
  d.setDate(d.getDate() + diff)
  return d
}

const draftDate = ref<Date | null>(null)
const draftEndDate = ref<Date | null>(null)
const draftHour = ref(0)
const draftMinute = ref(0)
const draftEndHour = ref(0)
const draftEndMinute = ref(0)

const initialView = (() => {
  if (isRange.value && Array.isArray(props.modelValue)) {
    return parseDateLike(props.modelValue[0])
  }
  if (typeof props.modelValue === 'string') {
    return parseDateLike(props.modelValue)
  }
  return null
})()

const viewDate = ref(initialView ?? new Date())
const viewEndDate = ref(
  new Date(
    (initialView ?? new Date()).getFullYear(),
    (initialView ?? new Date()).getMonth() + 1,
    1,
  ),
)

const monthCells = computed(() =>
  Array.from({ length: 12 }, (_, i) => ({
    month: i,
    label: `${i + 1}月`,
  })),
)

const yearCells = computed(() => {
  const base = Math.floor(viewDate.value.getFullYear() / 10) * 10
  return Array.from({ length: 12 }, (_, i) => base - 1 + i)
})

function prevYear() {
  viewDate.value = new Date(
    viewDate.value.getFullYear() - 1,
    viewDate.value.getMonth(),
    1,
  )
}

function nextYear() {
  viewDate.value = new Date(
    viewDate.value.getFullYear() + 1,
    viewDate.value.getMonth(),
    1,
  )
}

function prevDecade() {
  viewDate.value = new Date(viewDate.value.getFullYear() - 10, 0, 1)
}

function nextDecade() {
  viewDate.value = new Date(viewDate.value.getFullYear() + 10, 0, 1)
}

const resolvedSize = computed(() => props.size ?? config.size.value)
const isDisabled = computed(
  () => props.disabled || form?.disabled.value === true,
)

const selectedDate = computed(() => {
  if (isRange.value) return null
  if (typeof props.modelValue !== 'string') return null
  return parseDateLike(props.modelValue)
})

const rangeValue = computed(() => {
  if (!isRange.value || !Array.isArray(props.modelValue)) {
    return { start: null as Date | null, end: null as Date | null }
  }
  return {
    start: parseDateLike(props.modelValue[0]),
    end: parseDateLike(props.modelValue[1]),
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
const endMonthLabel = computed(
  () =>
    `${viewEndDate.value.getFullYear()} 年 ${viewEndDate.value.getMonth() + 1} 月`,
)
const cells = computed(() => buildCalendarDays(viewDate.value))
const endCells = computed(() => buildCalendarDays(viewEndDate.value))
const showDualPanels = computed(
  () => isRange.value && !isMonth.value && !isYear.value && !isWeek.value,
)

watch(
  viewDate,
  (value) => {
    if (props.unlinkPanels) return
    viewEndDate.value = new Date(value.getFullYear(), value.getMonth() + 1, 1)
  },
  { immediate: true },
)

const hours = computed(() => Array.from({ length: 24 }, (_, i) => i))
const minutes = computed(() =>
  Array.from({ length: 12 }, (_, i) => i * 5),
)

watch(
  () => props.modelValue,
  (value) => {
    if (isRange.value && Array.isArray(value)) {
      const parsed = parseDateLike(value[0])
      if (parsed) viewDate.value = parsed
    } else if (typeof value === 'string') {
      const parsed = parseDateLike(value)
      if (parsed) viewDate.value = parsed
    }
  },
)

function isDateDisabled(date: Date) {
  return props.disabledDate?.(date) === true
}

function syncDraftFromModel() {
  if (isRange.value && Array.isArray(props.modelValue)) {
    const start = parseDateLike(props.modelValue[0])
    const end = parseDateLike(props.modelValue[1])
    draftDate.value = start
    draftEndDate.value = end
    draftHour.value = start?.getHours() ?? 0
    draftMinute.value = start?.getMinutes() ?? 0
    draftEndHour.value = end?.getHours() ?? 0
    draftEndMinute.value = end?.getMinutes() ?? 0
  } else if (typeof props.modelValue === 'string') {
    const parsed = parseDateLike(props.modelValue)
    draftDate.value = parsed
    draftHour.value = parsed?.getHours() ?? 0
    draftMinute.value = parsed?.getMinutes() ?? 0
  } else {
    draftDate.value = null
    draftEndDate.value = null
    draftHour.value = 0
    draftMinute.value = 0
    draftEndHour.value = 0
    draftEndMinute.value = 0
  }
}

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
  syncDraftFromModel()
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

function combineDateTime(date: Date, hour: number, minute: number) {
  return new Date(
    date.getFullYear(),
    date.getMonth(),
    date.getDate(),
    hour,
    minute,
    0,
    0,
  )
}

function dayClass(cell: {
  date: Date
  inCurrentMonth: boolean
  isToday: boolean
}) {
  const disabled = isDateDisabled(cell.date)
  const classes = [
    ns.e('day'),
    ns.is('other', !cell.inCurrentMonth),
    ns.is('today', cell.isToday),
    ns.is('disabled', disabled),
  ]
  if (
    !isRange.value &&
    !isWeek.value &&
    selectedDate.value &&
    isSameDay(cell.date, selectedDate.value)
  ) {
    classes.push(ns.is('selected', true))
  }
  if (isWeek.value && selectedDate.value) {
    const weekStart = startOfWeek(selectedDate.value)
    const weekEnd = new Date(weekStart)
    weekEnd.setDate(weekStart.getDate() + 6)
    if (isSameDay(cell.date, weekStart) || isSameDay(cell.date, weekEnd)) {
      classes.push(ns.is('selected', true))
    } else if (isInRange(cell.date, weekStart, weekEnd)) {
      classes.push(ns.is('in-range', true))
    }
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
  if (
    isDateTime.value &&
    draftDate.value &&
    isSameDay(cell.date, draftDate.value)
  ) {
    classes.push(ns.is('selected', true))
  }
  return classes
}

function selectMonth(monthIndex: number) {
  if (isDisabled.value) return
  const date = new Date(viewDate.value.getFullYear(), monthIndex, 1)
  if (isDateDisabled(date)) return
  setValue(formatMonth(date))
  closePanel()
}

function selectYear(year: number) {
  if (isDisabled.value) return
  const date = new Date(year, 0, 1)
  if (isDateDisabled(date)) return
  setValue(String(year))
  closePanel()
}

function selectDay(date: Date) {
  if (isDisabled.value || isDateDisabled(date)) return

  if (isWeek.value) {
    setValue(formatDate(startOfWeek(date)))
    closePanel()
    return
  }

  if (isDateTime.value && !isRange.value) {
    draftDate.value = date
    viewDate.value = new Date(date)
    return
  }

  if (isDateTime.value && isRange.value) {
    if (!rangePicking.value) {
      rangePicking.value = date
      draftDate.value = date
      draftEndDate.value = null
      return
    }
    const start = rangePicking.value
    const end = date
    if (start.getTime() <= end.getTime()) {
      draftDate.value = start
      draftEndDate.value = end
    } else {
      draftDate.value = end
      draftEndDate.value = start
    }
    rangePicking.value = null
    return
  }

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

function confirmDateTime() {
  if (!draftDate.value) return
  if (!isRange.value) {
    const value = formatDateTime(
      combineDateTime(draftDate.value, draftHour.value, draftMinute.value),
    )
    setValue(value)
    closePanel()
    return
  }
  if (!draftEndDate.value) return
  const start = formatDateTime(
    combineDateTime(draftDate.value, draftHour.value, draftMinute.value),
  )
  const end = formatDateTime(
    combineDateTime(draftEndDate.value, draftEndHour.value, draftEndMinute.value),
  )
  setValue(
    start <= end ? [start, end] : [end, start],
  )
  closePanel()
}

function applyShortcut(item: DatePickerShortcut) {
  const raw = typeof item.value === 'function' ? item.value() : item.value
  if (Array.isArray(raw)) {
    const [a, b] = raw
    if (isDateDisabled(a) || isDateDisabled(b)) return
    if (isDateTime.value) {
      setValue([formatDateTime(a), formatDateTime(b)])
    } else {
      setValue([formatDate(a), formatDate(b)])
    }
  } else {
    if (isDateDisabled(raw)) return
    if (isDateTime.value) setValue(formatDateTime(raw))
    else setValue(formatDate(raw))
  }
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

function prevEndMonth() {
  if (!props.unlinkPanels) {
    prevMonth()
    return
  }
  viewEndDate.value = new Date(
    viewEndDate.value.getFullYear(),
    viewEndDate.value.getMonth() - 1,
    1,
  )
}

function nextEndMonth() {
  if (!props.unlinkPanels) {
    nextMonth()
    return
  }
  viewEndDate.value = new Date(
    viewEndDate.value.getFullYear(),
    viewEndDate.value.getMonth() + 1,
    1,
  )
}

function selectToday() {
  const today = new Date()
  if (isDateDisabled(today)) return
  if (isMonth.value) {
    setValue(formatMonth(today))
    closePanel()
    return
  }
  if (isYear.value) {
    setValue(String(today.getFullYear()))
    closePanel()
    return
  }
  if (isWeek.value) {
    setValue(formatDate(startOfWeek(today)))
    closePanel()
    return
  }
  if (isDateTime.value) {
    draftDate.value = today
    draftHour.value = today.getHours()
    draftMinute.value = Math.floor(today.getMinutes() / 5) * 5
    return
  }
  selectDay(today)
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
        {{
          isRange
            ? `${resolvedStartPlaceholder} - ${resolvedEndPlaceholder}`
            : resolvedPlaceholder
        }}
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
        :class="[ns.e('panel'), shortcuts.length ? ns.is('with-shortcuts', true) : '']"
        :style="panelStyle"
        role="dialog"
        aria-label="日期面板"
      >
        <div v-if="shortcuts.length" :class="ns.e('shortcuts')">
          <button
            v-for="item in shortcuts"
            :key="item.text"
            type="button"
            :class="ns.e('shortcut')"
            @click="applyShortcut(item)"
          >
            {{ item.text }}
          </button>
        </div>
        <div :class="ns.e('main')">
          <div v-if="!showDualPanels" :class="ns.e('header')">
            <button
              type="button"
              :class="ns.e('nav')"
              aria-label="上一步"
              @click="
                isYear ? prevDecade() : isMonth ? prevYear() : prevMonth()
              "
            >
              ‹
            </button>
            <span :class="ns.e('month')">
              {{
                isYear
                  ? `${yearCells[1]} - ${yearCells[10]}`
                  : isMonth
                    ? String(viewDate.getFullYear())
                    : monthLabel
              }}
            </span>
            <button
              type="button"
              :class="ns.e('nav')"
              aria-label="下一步"
              @click="
                isYear ? nextDecade() : isMonth ? nextYear() : nextMonth()
              "
            >
              ›
            </button>
          </div>

          <div v-if="isYear" :class="ns.e('months')">
            <button
              v-for="year in yearCells"
              :key="year"
              type="button"
              :class="[
                ns.e('month-cell'),
                ns.is('selected', modelValue === String(year)),
                ns.is('other', year === yearCells[0] || year === yearCells[11]),
              ]"
              @click="selectYear(year)"
            >
              {{ year }}
            </button>
          </div>

          <div v-else-if="isMonth" :class="ns.e('months')">
            <button
              v-for="cell in monthCells"
              :key="cell.month"
              type="button"
              :class="[
                ns.e('month-cell'),
                ns.is(
                  'selected',
                  modelValue ===
                    formatMonth(new Date(viewDate.getFullYear(), cell.month, 1)),
                ),
              ]"
              @click="selectMonth(cell.month)"
            >
              {{ cell.label }}
            </button>
          </div>

          <template v-else-if="showDualPanels">
            <div
              :class="[
                ns.e('calendars'),
                ns.is('unlink', unlinkPanels),
              ]"
            >
              <div :class="ns.e('calendar')">
                <div :class="ns.e('header')">
                  <button
                    type="button"
                    :class="ns.e('nav')"
                    aria-label="上一月"
                    @click="prevMonth"
                  >
                    ‹
                  </button>
                  <span :class="ns.e('month')">{{ monthLabel }}</span>
                  <button
                    type="button"
                    :class="ns.e('nav')"
                    aria-label="下一月"
                    @click="nextMonth"
                  >
                    ›
                  </button>
                </div>
                <div :class="ns.e('weekdays')">
                  <span v-for="label in WEEK_LABELS" :key="`l-${label}`">{{
                    label
                  }}</span>
                </div>
                <div :class="ns.e('days')">
                  <button
                    v-for="cell in cells"
                    :key="`l-${formatDate(cell.date)}`"
                    type="button"
                    :class="dayClass(cell)"
                    :disabled="isDateDisabled(cell.date)"
                    @click="selectDay(cell.date)"
                  >
                    {{ cell.label }}
                  </button>
                </div>
              </div>
              <div :class="ns.e('calendar')">
                <div :class="ns.e('header')">
                  <button
                    type="button"
                    :class="ns.e('nav')"
                    aria-label="上一月"
                    @click="prevEndMonth"
                  >
                    ‹
                  </button>
                  <span :class="ns.e('month')">{{ endMonthLabel }}</span>
                  <button
                    type="button"
                    :class="ns.e('nav')"
                    aria-label="下一月"
                    @click="nextEndMonth"
                  >
                    ›
                  </button>
                </div>
                <div :class="ns.e('weekdays')">
                  <span v-for="label in WEEK_LABELS" :key="`r-${label}`">{{
                    label
                  }}</span>
                </div>
                <div :class="ns.e('days')">
                  <button
                    v-for="cell in endCells"
                    :key="`r-${formatDate(cell.date)}`"
                    type="button"
                    :class="dayClass(cell)"
                    :disabled="isDateDisabled(cell.date)"
                    @click="selectDay(cell.date)"
                  >
                    {{ cell.label }}
                  </button>
                </div>
              </div>
            </div>
          </template>

          <template v-else>
            <div :class="ns.e('weekdays')">
              <span v-for="label in WEEK_LABELS" :key="label">{{ label }}</span>
            </div>
            <div :class="ns.e('days')">
              <button
                v-for="cell in cells"
                :key="formatDate(cell.date)"
                type="button"
                :class="dayClass(cell)"
                :disabled="isDateDisabled(cell.date)"
                @click="selectDay(cell.date)"
              >
                {{ cell.label }}
              </button>
            </div>
          </template>

          <div v-if="isDateTime" :class="ns.e('time')">
            <div :class="ns.e('time-block')">
              <span>{{ isRange ? '开始' : '时间' }}</span>
              <select
                :class="ns.e('time-select')"
                :value="draftHour"
                @change="
                  draftHour = Number(($event.target as HTMLSelectElement).value)
                "
              >
                <option v-for="h in hours" :key="h" :value="h">
                  {{ formatTime(h, 0).slice(0, 2) }}
                </option>
              </select>
              <span>:</span>
              <select
                :class="ns.e('time-select')"
                :value="draftMinute"
                @change="
                  draftMinute = Number(
                    ($event.target as HTMLSelectElement).value,
                  )
                "
              >
                <option v-for="m in minutes" :key="m" :value="m">
                  {{ String(m).padStart(2, '0') }}
                </option>
              </select>
            </div>
            <div v-if="isRange" :class="ns.e('time-block')">
              <span>结束</span>
              <select
                :class="ns.e('time-select')"
                :value="draftEndHour"
                @change="
                  draftEndHour = Number(
                    ($event.target as HTMLSelectElement).value,
                  )
                "
              >
                <option v-for="h in hours" :key="`e-${h}`" :value="h">
                  {{ formatTime(h, 0).slice(0, 2) }}
                </option>
              </select>
              <span>:</span>
              <select
                :class="ns.e('time-select')"
                :value="draftEndMinute"
                @change="
                  draftEndMinute = Number(
                    ($event.target as HTMLSelectElement).value,
                  )
                "
              >
                <option v-for="m in minutes" :key="`em-${m}`" :value="m">
                  {{ String(m).padStart(2, '0') }}
                </option>
              </select>
            </div>
          </div>

          <div :class="ns.e('footer')">
            <button
              v-if="!isRange || isDateTime || isMonth || isYear || isWeek"
              type="button"
              :class="ns.e('today')"
              @click="selectToday"
            >
              {{
                isMonth
                  ? t('datePicker.thisMonth')
                  : isYear
                    ? t('datePicker.thisYear')
                    : isWeek
                      ? t('datePicker.thisWeek')
                      : t('datePicker.today')
              }}
            </button>
            <span v-if="isRange && !isDateTime" :class="ns.e('hint')">
              {{
                rangePicking
                  ? t('datePicker.pickEnd')
                  : t('datePicker.pickStart')
              }}
            </span>
            <span v-else-if="isRange && isDateTime" :class="ns.e('hint')">
              {{
                rangePicking
                  ? t('datePicker.pickEnd')
                  : draftEndDate
                    ? t('datePicker.adjustTime')
                    : t('datePicker.pickStart')
              }}
            </span>
            <button
              v-if="isDateTime"
              type="button"
              :class="ns.e('confirm')"
              :disabled="!draftDate || (isRange && !draftEndDate)"
              @click="confirmDateTime"
            >
              {{ t('datePicker.confirm') }}
            </button>
          </div>
        </div>
      </div>
    </Teleport>
  </div>
</template>
