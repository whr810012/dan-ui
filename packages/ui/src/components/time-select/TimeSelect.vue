<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, onMounted, ref } from 'vue'
import { injectConfig } from '../../hooks/useConfig'
import { useFormItem } from '../../hooks/useFormItem'
import { useNamespace } from '../../hooks/useNamespace'
import type { DanSize } from '../../hooks/useConfig'
import { formatTime, parseTime } from '../date-picker/dateUtils'
import './style.css'

defineOptions({ name: 'DanTimeSelect' })

const props = withDefaults(
  defineProps<{
    modelValue?: string | null
    size?: DanSize
    disabled?: boolean
    clearable?: boolean
    placeholder?: string
    /** 起始时刻 HH:mm */
    start?: string
    /** 结束时刻 HH:mm */
    end?: string
    /** 步进，支持分钟数或 HH:mm 时长 */
    step?: number | string
    /** 可选下限（含） */
    minTime?: string | null
    /** 可选上限（含） */
    maxTime?: string | null
  }>(),
  {
    modelValue: null,
    disabled: false,
    clearable: false,
    placeholder: '选择时间',
    start: '09:00',
    end: '18:00',
    step: '00:30',
    minTime: null,
    maxTime: null,
  },
)

const emit = defineEmits<{
  'update:modelValue': [value: string | null]
  change: [value: string | null]
  clear: []
}>()

const config = injectConfig()
const { form, emitChange } = useFormItem()
const ns = useNamespace('time-select')
const opened = ref(false)
const rootRef = ref<HTMLElement | null>(null)
const panelRef = ref<HTMLElement | null>(null)
const panelStyle = ref<Record<string, string>>({})

const resolvedSize = computed(() => props.size ?? config.size.value)
const isDisabled = computed(
  () => props.disabled || form?.disabled.value === true,
)
const showClear = computed(
  () => props.clearable && !!props.modelValue && !isDisabled.value,
)

function toMinutes(value: string): number | null {
  const parsed = parseTime(value)
  if (!parsed) return null
  return parsed.h * 60 + parsed.m
}

function stepMinutes(): number {
  if (typeof props.step === 'number') return Math.max(1, props.step)
  const parsed = parseTime(props.step)
  if (!parsed) return 30
  return Math.max(1, parsed.h * 60 + parsed.m)
}

const options = computed(() => {
  const start = toMinutes(props.start)
  const end = toMinutes(props.end)
  if (start == null || end == null || end < start) return [] as string[]
  const step = stepMinutes()
  const min = props.minTime ? toMinutes(props.minTime) : null
  const max = props.maxTime ? toMinutes(props.maxTime) : null
  const list: string[] = []
  for (let m = start; m <= end; m += step) {
    if (min != null && m < min) continue
    if (max != null && m > max) continue
    list.push(formatTime(Math.floor(m / 60), m % 60))
  }
  return list
})

async function openPanel() {
  if (isDisabled.value) return
  opened.value = true
  await nextTick()
  const rect = rootRef.value?.getBoundingClientRect()
  if (!rect) return
  panelStyle.value = {
    position: 'fixed',
    top: `${rect.bottom + 4}px`,
    left: `${rect.left}px`,
    minWidth: `${rect.width}px`,
    zIndex: 'var(--dan-z-index-dropdown)',
  }
  await nextTick()
  const active = panelRef.value?.querySelector<HTMLElement>(
    '.dan-time-select__option.is-active',
  )
  active?.scrollIntoView({ block: 'nearest' })
}

function closePanel() {
  opened.value = false
}

function togglePanel() {
  if (opened.value) closePanel()
  else void openPanel()
}

function select(value: string) {
  emit('update:modelValue', value)
  emit('change', value)
  emitChange('change')
  closePanel()
}

function clearValue(event: MouseEvent) {
  event.stopPropagation()
  emit('update:modelValue', null)
  emit('change', null)
  emit('clear')
  emitChange('change')
}

function onDoc(event: MouseEvent) {
  const t = event.target as Node
  if (rootRef.value?.contains(t) || panelRef.value?.contains(t)) return
  closePanel()
}

onMounted(() => document.addEventListener('mousedown', onDoc))
onBeforeUnmount(() => document.removeEventListener('mousedown', onDoc))
</script>

<template>
  <div
    ref="rootRef"
    :class="[
      ns.b(),
      ns.m(resolvedSize),
      ns.is('disabled', isDisabled),
      ns.is('opened', opened),
    ]"
  >
    <button
      type="button"
      :class="ns.e('trigger')"
      :disabled="isDisabled"
      @click="togglePanel"
    >
      <span v-if="modelValue" :class="ns.e('value')">{{ modelValue }}</span>
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
      >
        <ul :class="ns.e('list')">
          <li
            v-for="item in options"
            :key="item"
            :class="[ns.e('option'), ns.is('active', modelValue === item)]"
            @click="select(item)"
          >
            {{ item }}
          </li>
          <li v-if="!options.length" :class="ns.e('empty')">无可用时间</li>
        </ul>
      </div>
    </Teleport>
  </div>
</template>
