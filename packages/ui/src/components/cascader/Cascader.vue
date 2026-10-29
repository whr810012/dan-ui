<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, onMounted, ref } from 'vue'
import { useFormItem } from '../../hooks/useFormItem'
import { useNamespace } from '../../hooks/useNamespace'
import { useLocale } from '../../locale'
import type { CascaderOption } from './types'
import './style.css'

defineOptions({ name: 'DanCascader' })

const props = withDefaults(
  defineProps<{
    modelValue?: Array<string | number> | null
    options?: CascaderOption[]
    disabled?: boolean
    clearable?: boolean
    placeholder?: string
  }>(),
  {
    modelValue: null,
    options: () => [],
    disabled: false,
    clearable: false,
  },
)

const { t } = useLocale()
const resolvedPlaceholder = computed(
  () => props.placeholder ?? t('cascader.placeholder'),
)

const emit = defineEmits<{
  'update:modelValue': [value: Array<string | number> | null]
  change: [value: Array<string | number> | null]
  clear: []
}>()

const ns = useNamespace('cascader')
const { form, emitChange } = useFormItem()
const opened = ref(false)
const rootRef = ref<HTMLElement | null>(null)
const panelStyle = ref<Record<string, string>>({})
const activePath = ref<CascaderOption[]>([])

const isDisabled = computed(
  () => props.disabled || form?.disabled.value === true,
)

const columns = computed(() => {
  const cols: CascaderOption[][] = [props.options]
  for (const node of activePath.value) {
    if (node.children?.length) cols.push(node.children)
  }
  return cols
})

const displayLabel = computed(() => {
  if (!props.modelValue?.length) return ''
  const labels: string[] = []
  let list = props.options
  for (const val of props.modelValue) {
    const found = list.find((item) => item.value === val)
    if (!found) break
    labels.push(found.label)
    list = found.children || []
  }
  return labels.join(' / ')
})

const showClear = computed(
  () => props.clearable && !!displayLabel.value && !isDisabled.value,
)

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
    zIndex: 'var(--dan-z-index-dropdown)',
  }
}

function closePanel() {
  opened.value = false
}

function toggle() {
  if (opened.value) closePanel()
  else void openPanel()
}

function onSelect(level: number, option: CascaderOption) {
  if (option.disabled) return
  activePath.value = [...activePath.value.slice(0, level), option]
  if (!option.children?.length) {
    const value = activePath.value.map((item) => item.value)
    emit('update:modelValue', value)
    emit('change', value)
    emitChange('change')
    closePanel()
  }
}

function clear(event: MouseEvent) {
  event.stopPropagation()
  activePath.value = []
  emit('update:modelValue', null)
  emit('change', null)
  emit('clear')
  emitChange('change')
}

function onDoc(event: MouseEvent) {
  if (!rootRef.value?.contains(event.target as Node)) closePanel()
}

onMounted(() => document.addEventListener('mousedown', onDoc))
onBeforeUnmount(() => document.removeEventListener('mousedown', onDoc))
</script>

<template>
  <div
    ref="rootRef"
    :class="[ns.b(), ns.is('disabled', isDisabled), ns.is('opened', opened)]"
  >
    <button
      type="button"
      :class="ns.e('trigger')"
      :disabled="isDisabled"
      @click="toggle"
    >
      <span v-if="displayLabel" :class="ns.e('value')">{{ displayLabel }}</span>
      <span v-else :class="ns.e('placeholder')">{{ resolvedPlaceholder }}</span>
      <span :class="ns.e('suffix')" aria-hidden="true" />
    </button>
    <button
      v-if="showClear"
      type="button"
      :class="ns.e('clear')"
      aria-label="清除"
      @click="clear"
    >
      ×
    </button>
    <Teleport to="body">
      <div v-if="opened" :class="ns.e('panel')" :style="panelStyle">
        <ul v-for="(col, level) in columns" :key="level" :class="ns.e('menu')">
          <li
            v-for="option in col"
            :key="String(option.value)"
            :class="[
              ns.e('node'),
              ns.is('active', activePath[level]?.value === option.value),
              ns.is('disabled', !!option.disabled),
            ]"
            @click="onSelect(level, option)"
          >
            <span>{{ option.label }}</span>
            <span v-if="option.children?.length" :class="ns.e('arrow')">›</span>
          </li>
        </ul>
      </div>
    </Teleport>
  </div>
</template>
