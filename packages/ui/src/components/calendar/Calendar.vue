<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { useNamespace } from '../../hooks/useNamespace'
import {
  WEEK_LABELS,
  buildCalendarDays,
  formatDate,
  isSameDay,
  parseDate,
} from '../date-picker/dateUtils'
import './style.css'

defineOptions({ name: 'DanCalendar' })

const props = withDefaults(
  defineProps<{
    modelValue?: string | null
  }>(),
  {
    modelValue: null,
  },
)

const emit = defineEmits<{
  'update:modelValue': [value: string]
  change: [value: string]
}>()

const ns = useNamespace('calendar')
const viewDate = ref(parseDate(props.modelValue) ?? new Date())

watch(
  () => props.modelValue,
  (value) => {
    const parsed = parseDate(value)
    if (parsed) viewDate.value = parsed
  },
)

const selected = computed(() => parseDate(props.modelValue))
const monthLabel = computed(
  () =>
    `${viewDate.value.getFullYear()} 年 ${viewDate.value.getMonth() + 1} 月`,
)
const cells = computed(() => buildCalendarDays(viewDate.value))

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

function select(date: Date) {
  const value = formatDate(date)
  emit('update:modelValue', value)
  emit('change', value)
}
</script>

<template>
  <div :class="ns.b()">
    <div :class="ns.e('header')">
      <button type="button" :class="ns.e('nav')" @click="prevMonth">‹</button>
      <span :class="ns.e('title')">{{ monthLabel }}</span>
      <button type="button" :class="ns.e('nav')" @click="nextMonth">›</button>
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
          ns.is('selected', !!selected && isSameDay(cell.date, selected)),
        ]"
        @click="select(cell.date)"
      >
        {{ cell.label }}
      </button>
    </div>
  </div>
</template>
