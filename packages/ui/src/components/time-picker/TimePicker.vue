<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, onMounted, ref } from 'vue'
import { injectConfig } from '../../hooks/useConfig'
import { useFormItem } from '../../hooks/useFormItem'
import { useNamespace } from '../../hooks/useNamespace'
import type { DanSize } from '../../hooks/useConfig'
import { formatTime, parseTime } from '../date-picker/dateUtils'
import './style.css'

defineOptions({ name: 'DanTimePicker' })

const props = withDefaults(
  defineProps<{
    modelValue?: string | null
    size?: DanSize
    disabled?: boolean
    clearable?: boolean
    placeholder?: string
    step?: number
  }>(),
  {
    modelValue: null,
    disabled: false,
    clearable: false,
    placeholder: '选择时间',
    step: 5,
  },
)

const emit = defineEmits<{
  'update:modelValue': [value: string | null]
  change: [value: string | null]
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

const resolvedSize = computed(() => props.size ?? config.size.value)
const isDisabled = computed(
  () => props.disabled || form?.disabled.value === true,
)
const showClear = computed(
  () => props.clearable && !!props.modelValue && !isDisabled.value,
)

const hours = computed(() => Array.from({ length: 24 }, (_, i) => i))
const minutes = computed(() => {
  const step = Math.max(1, props.step)
  const list: number[] = []
  for (let m = 0; m < 60; m += step) list.push(m)
  return list
})

const parsed = computed(() => parseTime(props.modelValue))

async function openPanel() {
  if (isDisabled.value) return
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
  else void openPanel()
}

function setValue(value: string | null) {
  emit('update:modelValue', value)
  emit('change', value)
  emitChange('change')
}

function pickHour(h: number) {
  const m = parsed.value?.m ?? 0
  setValue(formatTime(h, m))
}

function pickMinute(m: number) {
  const h = parsed.value?.h ?? 0
  setValue(formatTime(h, m))
  closePanel()
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
        <div :class="ns.e('columns')">
          <ul :class="ns.e('list')">
            <li
              v-for="h in hours"
              :key="`h-${h}`"
              :class="[ns.e('option'), ns.is('active', parsed?.h === h)]"
              @click="pickHour(h)"
            >
              {{ String(h).padStart(2, '0') }}
            </li>
          </ul>
          <ul :class="ns.e('list')">
            <li
              v-for="m in minutes"
              :key="`m-${m}`"
              :class="[ns.e('option'), ns.is('active', parsed?.m === m)]"
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
