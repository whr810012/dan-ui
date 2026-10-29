<script setup lang="ts">
import {
  computed,
  nextTick,
  onBeforeUnmount,
  onMounted,
  ref,
  useAttrs,
  watch,
} from 'vue'
import { injectConfig } from '../../hooks/useConfig'
import { useFormItem } from '../../hooks/useFormItem'
import { useLocale } from '../../locale'
import { useNamespace } from '../../hooks/useNamespace'
import type { DanSize } from '../../hooks/useConfig'
import type { SelectOption } from './types'
import './style.css'

defineOptions({ name: 'DanSelect', inheritAttrs: false })

type SelectValue = string | number | boolean | null
type SelectModel = SelectValue | SelectValue[]

const props = withDefaults(
  defineProps<{
    modelValue?: SelectModel
    options?: SelectOption[]
    size?: DanSize
    disabled?: boolean
    placeholder?: string
    clearable?: boolean
    multiple?: boolean
    filterable?: boolean
    collapseTags?: boolean
    virtual?: boolean
    itemHeight?: number
    maxDropdownHeight?: number
  }>(),
  {
    options: () => [],
    disabled: false,
    clearable: false,
    multiple: false,
    filterable: false,
    collapseTags: false,
    virtual: false,
    itemHeight: 34,
    maxDropdownHeight: 240,
  },
)

const emit = defineEmits<{
  'update:modelValue': [value: SelectModel]
  change: [value: SelectModel]
  clear: []
  focus: [event: FocusEvent]
  blur: [event: FocusEvent]
}>()

const attrs = useAttrs()
const config = injectConfig()
const { form, emitChange } = useFormItem()
const ns = useNamespace('select')
const { t } = useLocale()
const resolvedPlaceholder = computed(
  () => props.placeholder ?? t('select.placeholder'),
)
const focused = ref(false)
const opened = ref(false)
const highlightIndex = ref(-1)
const filterQuery = ref('')
const rootRef = ref<HTMLElement | null>(null)
const panelRef = ref<HTMLElement | null>(null)
const listRef = ref<HTMLElement | null>(null)
const filterInputRef = ref<HTMLInputElement | null>(null)
const panelStyle = ref<Record<string, string>>({})
const scrollTop = ref(0)

const resolvedSize = computed(() => props.size ?? config.size.value)
const isDisabled = computed(
  () => props.disabled || form?.disabled.value === true,
)

const rootClass = computed(() => attrs.class)
const rootStyle = computed(
  () => attrs.style as string | Record<string, string> | undefined,
)
const triggerAttrs = computed(() => {
  const result: Record<string, unknown> = {}
  for (const [key, value] of Object.entries(attrs)) {
    if (key === 'class' || key === 'style') continue
    result[key] = value
  }
  return result
})

const selectedValues = computed<SelectValue[]>(() => {
  if (props.multiple) {
    return Array.isArray(props.modelValue) ? props.modelValue : []
  }
  return props.modelValue == null ? [] : [props.modelValue as SelectValue]
})

const selectedLabels = computed(() =>
  selectedValues.value.map(
    (value) =>
      props.options.find((item) => String(item.value) === String(value))
        ?.label ?? String(value),
  ),
)

const selectedLabel = computed(() => selectedLabels.value[0] ?? '')

const filteredOptions = computed(() => {
  const q = filterQuery.value.trim().toLowerCase()
  if (!props.filterable || !q) return props.options
  return props.options.filter((item) => item.label.toLowerCase().includes(q))
})

const visibleCount = computed(() =>
  Math.max(1, Math.ceil(props.maxDropdownHeight / props.itemHeight) + 2),
)

const virtualStart = computed(() => {
  if (!props.virtual) return 0
  return Math.max(0, Math.floor(scrollTop.value / props.itemHeight) - 1)
})

const virtualEnd = computed(() => {
  if (!props.virtual) return filteredOptions.value.length
  return Math.min(
    filteredOptions.value.length,
    virtualStart.value + visibleCount.value,
  )
})

const virtualOptions = computed(() => {
  if (!props.virtual) {
    return filteredOptions.value.map((item, index) => ({ item, index }))
  }
  return filteredOptions.value
    .slice(virtualStart.value, virtualEnd.value)
    .map((item, offset) => ({
      item,
      index: virtualStart.value + offset,
    }))
})

const virtualPadTop = computed(() =>
  props.virtual ? virtualStart.value * props.itemHeight : 0,
)
const virtualPadBottom = computed(() =>
  props.virtual
    ? Math.max(
        0,
        (filteredOptions.value.length - virtualEnd.value) * props.itemHeight,
      )
    : 0,
)

const showClear = computed(
  () =>
    props.clearable &&
    selectedValues.value.length > 0 &&
    !isDisabled.value,
)

function isSelected(value: SelectOption['value']) {
  return selectedValues.value.some((item) => String(item) === String(value))
}

function updatePanelPosition() {
  const root = rootRef.value
  if (!root) return
  const rect = root.getBoundingClientRect()
  panelStyle.value = {
    top: `${rect.bottom + 4}px`,
    left: `${rect.left}px`,
    minWidth: `${rect.width}px`,
    maxHeight: `${props.maxDropdownHeight}px`,
  }
}

function enabledIndexes() {
  return filteredOptions.value
    .map((item, index) => (item.disabled ? -1 : index))
    .filter((index) => index >= 0)
}

function syncHighlightFromValue() {
  const current = filteredOptions.value.findIndex(
    (item) => !item.disabled && isSelected(item.value),
  )
  const enabled = enabledIndexes()
  highlightIndex.value = current >= 0 ? current : (enabled[0] ?? -1)
}

function moveHighlight(step: 1 | -1) {
  const enabled = enabledIndexes()
  if (!enabled.length) return
  const pos = enabled.indexOf(highlightIndex.value)
  const nextPos =
    pos < 0
      ? step > 0
        ? 0
        : enabled.length - 1
      : (pos + step + enabled.length) % enabled.length
  highlightIndex.value = enabled[nextPos]!
  void nextTick(() => {
    const el = panelRef.value?.querySelector<HTMLElement>(
      '.dan-select__option.is-highlighted',
    )
    el?.scrollIntoView?.({ block: 'nearest' })
  })
}

async function openPanel() {
  if (isDisabled.value) return
  opened.value = true
  focused.value = true
  filterQuery.value = ''
  scrollTop.value = 0
  syncHighlightFromValue()
  await nextTick()
  updatePanelPosition()
  if (props.filterable) filterInputRef.value?.focus()
}

function closePanel() {
  opened.value = false
  highlightIndex.value = -1
  filterQuery.value = ''
}

function togglePanel() {
  if (isDisabled.value) return
  if (opened.value) closePanel()
  else void openPanel()
}

function selectOption(item: SelectOption) {
  if (item.disabled) return
  if (props.multiple) {
    const next = [...selectedValues.value]
    const index = next.findIndex((value) => String(value) === String(item.value))
    if (index >= 0) next.splice(index, 1)
    else next.push(item.value)
    emit('update:modelValue', next)
    emit('change', next)
    emitChange('change')
    return
  }
  emit('update:modelValue', item.value)
  emit('change', item.value)
  emitChange('change')
  closePanel()
}

function removeTag(value: SelectValue, event: Event) {
  event.stopPropagation()
  if (!props.multiple || isDisabled.value) return
  const next = selectedValues.value.filter(
    (item) => String(item) !== String(value),
  )
  emit('update:modelValue', next)
  emit('change', next)
  emitChange('change')
}

function onClear(event: MouseEvent) {
  event.stopPropagation()
  const empty = props.multiple ? [] : null
  emit('update:modelValue', empty)
  emit('change', empty)
  emit('clear')
  emitChange('change')
  closePanel()
}

function onDocumentClick(event: MouseEvent) {
  if (!opened.value) return
  const target = event.target as Node
  if (rootRef.value?.contains(target)) return
  if (panelRef.value?.contains(target)) return
  closePanel()
  focused.value = false
}

function onKeydown(event: KeyboardEvent) {
  if (isDisabled.value) return
  const key = event.key
  if (
    props.multiple &&
    key === 'Backspace' &&
    !filterQuery.value &&
    selectedValues.value.length
  ) {
    const next = selectedValues.value.slice(0, -1)
    emit('update:modelValue', next)
    emit('change', next)
    emitChange('change')
    return
  }
  if (key === 'Escape' && opened.value) {
    event.preventDefault()
    closePanel()
    return
  }
  if (key === 'ArrowDown' || key === 'ArrowUp') {
    event.preventDefault()
    if (!opened.value) {
      void openPanel()
      return
    }
    moveHighlight(key === 'ArrowDown' ? 1 : -1)
    return
  }
  if ((key === 'Enter' || key === ' ') && opened.value) {
    if (props.filterable && key === ' ') return
    event.preventDefault()
    const item = filteredOptions.value[highlightIndex.value]
    if (item) selectOption(item)
  }
}

function onFocus(event: FocusEvent) {
  focused.value = true
  emit('focus', event)
}

function onBlur(event: FocusEvent) {
  window.setTimeout(() => {
    if (panelRef.value?.contains(document.activeElement)) return
    focused.value = false
    opened.value = false
    emit('blur', event)
    emitChange('blur')
  }, 0)
}

function onScrollOrResize() {
  if (opened.value) updatePanelPosition()
}

function onListScroll(event: Event) {
  scrollTop.value = (event.target as HTMLElement).scrollTop
}

watch(filteredOptions, () => {
  if (opened.value) syncHighlightFromValue()
})

onMounted(() => {
  document.addEventListener('click', onDocumentClick, true)
  window.addEventListener('scroll', onScrollOrResize, true)
  window.addEventListener('resize', onScrollOrResize)
})

onBeforeUnmount(() => {
  document.removeEventListener('click', onDocumentClick, true)
  window.removeEventListener('scroll', onScrollOrResize, true)
  window.removeEventListener('resize', onScrollOrResize)
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
      ns.is('multiple', multiple),
      rootClass,
    ]"
    :style="rootStyle"
    @click="togglePanel"
  >
    <button
      type="button"
      :class="ns.e('trigger')"
      :disabled="isDisabled"
      aria-haspopup="listbox"
      :aria-expanded="opened"
      v-bind="triggerAttrs"
      @focus="onFocus"
      @blur="onBlur"
      @keydown="onKeydown"
    >
      <template v-if="multiple && selectedValues.length">
        <span :class="ns.e('tags')">
          <template v-if="collapseTags && selectedLabels.length > 1">
            <span :class="ns.e('tag')">
              {{ selectedLabels[0] }}
              <i @click="removeTag(selectedValues[0]!, $event)">×</i>
            </span>
            <span :class="ns.e('tag')">+{{ selectedLabels.length - 1 }}</span>
          </template>
          <template v-else>
            <span
              v-for="(label, i) in selectedLabels"
              :key="String(selectedValues[i])"
              :class="ns.e('tag')"
            >
              {{ label }}
              <i @click="removeTag(selectedValues[i]!, $event)">×</i>
            </span>
          </template>
        </span>
      </template>
      <span
        v-else
        :class="[ns.e('value'), ns.is('placeholder', !selectedLabel)]"
      >
        {{ selectedLabel || resolvedPlaceholder }}
      </span>
    </button>
    <span
      v-if="showClear"
      :class="ns.e('clear')"
      role="button"
      @mousedown.prevent
      @click="onClear"
    >
      ×
    </span>
    <span :class="ns.e('arrow')" aria-hidden="true" />
  </div>

  <Teleport to="body">
    <div
      v-show="opened"
      ref="panelRef"
      :class="ns.e('dropdown')"
      :style="panelStyle"
      role="listbox"
      :aria-multiselectable="multiple || undefined"
      @click.stop
    >
      <div v-if="filterable" :class="ns.e('filter')">
        <input
          ref="filterInputRef"
          v-model="filterQuery"
          type="text"
          :class="ns.e('filter-input')"
          :placeholder="resolvedPlaceholder"
          @keydown="onKeydown"
        />
      </div>
      <div
        ref="listRef"
        :class="ns.e('list')"
        :style="{ maxHeight: `${maxDropdownHeight}px` }"
        @scroll="onListScroll"
      >
        <div
          v-if="virtual"
          :style="{ height: `${virtualPadTop}px`, flex: 'none' }"
        />
        <div
          v-for="{ item, index } in virtualOptions"
          :key="String(item.value)"
          :class="[
            ns.e('option'),
            ns.is('selected', isSelected(item.value)),
            ns.is('highlighted', index === highlightIndex),
            ns.is('disabled', item.disabled),
          ]"
          :style="virtual ? { height: `${itemHeight}px` } : undefined"
          role="option"
          :aria-selected="isSelected(item.value)"
          @click="selectOption(item)"
          @mouseenter="!item.disabled && (highlightIndex = index)"
        >
          <span v-if="multiple" :class="ns.e('check')">
            {{ isSelected(item.value) ? '✓' : '' }}
          </span>
          {{ item.label }}
        </div>
        <div
          v-if="virtual"
          :style="{ height: `${virtualPadBottom}px`, flex: 'none' }"
        />
        <div v-if="!filteredOptions.length" :class="ns.e('empty')">
          {{ t('select.empty') }}
        </div>
      </div>
    </div>
  </Teleport>
</template>
