<script setup lang="ts">
import {
  computed,
  nextTick,
  onBeforeUnmount,
  onMounted,
  ref,
  useAttrs,
} from 'vue'
import { injectConfig } from '../../hooks/useConfig'
import { useFormItem } from '../../hooks/useFormItem'
import { useNamespace } from '../../hooks/useNamespace'
import type { DanSize } from '../../hooks/useConfig'
import type { SelectOption } from './types'
import './style.css'

defineOptions({ name: 'DanSelect', inheritAttrs: false })

const props = withDefaults(
  defineProps<{
    modelValue?: string | number | boolean | null
    options?: SelectOption[]
    size?: DanSize
    disabled?: boolean
    placeholder?: string
    clearable?: boolean
  }>(),
  {
    options: () => [],
    disabled: false,
    placeholder: '请选择',
    clearable: false,
  },
)

const emit = defineEmits<{
  'update:modelValue': [value: string | number | boolean | null]
  change: [value: string | number | boolean | null]
  clear: []
  focus: [event: FocusEvent]
  blur: [event: FocusEvent]
}>()

const attrs = useAttrs()
const config = injectConfig()
const { form, emitChange } = useFormItem()
const ns = useNamespace('select')
const focused = ref(false)
const opened = ref(false)
const rootRef = ref<HTMLElement | null>(null)
const panelRef = ref<HTMLElement | null>(null)
const panelStyle = ref<Record<string, string>>({})

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

const selectedLabel = computed(() => {
  const matched = props.options.find(
    (item) => String(item.value) === String(props.modelValue),
  )
  return matched?.label ?? ''
})

const showClear = computed(
  () => props.clearable && props.modelValue != null && !isDisabled.value,
)

function updatePanelPosition() {
  const root = rootRef.value
  if (!root) return
  const rect = root.getBoundingClientRect()
  panelStyle.value = {
    top: `${rect.bottom + 4}px`,
    left: `${rect.left}px`,
    minWidth: `${rect.width}px`,
  }
}

async function openPanel() {
  if (isDisabled.value) return
  opened.value = true
  focused.value = true
  await nextTick()
  updatePanelPosition()
}

function closePanel() {
  opened.value = false
}

function togglePanel() {
  if (isDisabled.value) return
  if (opened.value) closePanel()
  else void openPanel()
}

function selectOption(item: SelectOption) {
  if (item.disabled) return
  emit('update:modelValue', item.value)
  emit('change', item.value)
  emitChange('change')
  closePanel()
}

function onClear(event: MouseEvent) {
  event.stopPropagation()
  emit('update:modelValue', null)
  emit('change', null)
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
  if (event.key === 'Escape' && opened.value) {
    closePanel()
  }
}

function onFocus(event: FocusEvent) {
  focused.value = true
  emit('focus', event)
}

function onBlur(event: FocusEvent) {
  // delay so option click can run first
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

onMounted(() => {
  document.addEventListener('click', onDocumentClick, true)
  document.addEventListener('keydown', onKeydown)
  window.addEventListener('scroll', onScrollOrResize, true)
  window.addEventListener('resize', onScrollOrResize)
})

onBeforeUnmount(() => {
  document.removeEventListener('click', onDocumentClick, true)
  document.removeEventListener('keydown', onKeydown)
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
      rootClass,
    ]"
    :style="rootStyle"
    @click="togglePanel"
  >
    <button
      type="button"
      :class="ns.e('trigger')"
      :disabled="isDisabled"
      v-bind="triggerAttrs"
      @focus="onFocus"
      @blur="onBlur"
    >
      <span :class="[ns.e('value'), ns.is('placeholder', !selectedLabel)]">
        {{ selectedLabel || placeholder }}
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
    <ul
      v-show="opened"
      ref="panelRef"
      :class="ns.e('dropdown')"
      :style="panelStyle"
      role="listbox"
      @click.stop
    >
      <li
        v-for="item in options"
        :key="String(item.value)"
        :class="[
          ns.e('option'),
          ns.is(
            'selected',
            modelValue != null && String(item.value) === String(modelValue),
          ),
          ns.is('disabled', item.disabled),
        ]"
        role="option"
        :aria-selected="
          modelValue != null && String(item.value) === String(modelValue)
        "
        @click="selectOption(item)"
      >
        {{ item.label }}
      </li>
      <li v-if="!options.length" :class="ns.e('empty')">暂无数据</li>
    </ul>
  </Teleport>
</template>
