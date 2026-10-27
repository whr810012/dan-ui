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
  isSameDay,
  parseDate,
} from './dateUtils'
import './style.css'

defineOptions({ name: 'DanDatePicker' })

const props = withDefaults(
  defineProps<{
    modelValue?: string | null
    size?: DanSize
    disabled?: boolean
    clearable?: boolean
    placeholder?: string
    format?: string
  }>(),
  {
    modelValue: null,
    disabled: false,
    clearable: false,
    placeholder: '选择日期',
    format: 'YYYY-MM-DD',
  },
)

const emit = defineEmits<{
  'update:modelValue': [value: string | null]
  change: [value: string | null]
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
const viewDate = ref(parseDate(props.modelValue) ?? new Date())

const resolvedSize = computed(() => props.size ?? config.size.value)
const isDisabled = computed(
  () => props.disabled || form?.disabled.value === true,
)
const selectedDate = computed(() => parseDate(props.modelValue))
const displayValue = computed(() => props.modelValue || '')
const showClear = computed(
  () => props.clearable && !!props.modelValue && !isDisabled.value,
)
const monthLabel = computed(
  () =>
    `${viewDate.value.getFullYear()} 年 ${viewDate.value.getMonth() + 1} 月`,
)
const cells = computed(() => buildCalendarDays(viewDate.value))

watch(
  () => props.modelValue,
  (value) => {
    const parsed = parseDate(value)
    if (parsed) viewDate.value = parsed
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
  emit('visibleChange', true)
  await nextTick()
  updatePanelPosition()
}

function closePanel() {
  if (!opened.value) return
  opened.value = false
  focused.value = false
  emit('visibleChange', false)
}

function togglePanel() {
  if (opened.value) closePanel()
  else void openPanel()
}

function setValue(value: string | null) {
  emit('update:modelValue', value)
  emit('change', value)
  emitChange('change')
}

function selectDay(date: Date) {
  if (isDisabled.value) return
  setValue(formatDate(date))
  viewDate.value = new Date(date)
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
  if (rootRef.value?.contains(target) || panelRef.value?.contains(target)) {
    return
  }
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
      <span v-else :class="ns.e('placeholder')">{{ placeholder }}</span>
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
            :class="[
              ns.e('day'),
              ns.is('other', !cell.inCurrentMonth),
              ns.is('today', cell.isToday),
              ns.is(
                'selected',
                !!selectedDate && isSameDay(cell.date, selectedDate),
              ),
            ]"
            @click="selectDay(cell.date)"
          >
            {{ cell.label }}
          </button>
        </div>
        <div :class="ns.e('footer')">
          <button type="button" :class="ns.e('today')" @click="selectToday">
            今天
          </button>
        </div>
      </div>
    </Teleport>
  </div>
</template>
