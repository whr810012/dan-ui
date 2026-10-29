<script setup lang="ts">
import {
  computed,
  nextTick,
  onMounted,
  ref,
  useAttrs,
  watch,
} from 'vue'
import { injectConfig } from '../../hooks/useConfig'
import { useFormItem } from '../../hooks/useFormItem'
import { useNamespace } from '../../hooks/useNamespace'
import './style.css'

defineOptions({ name: 'DanTextarea', inheritAttrs: false })

type AutosizeOption = boolean | { minRows?: number; maxRows?: number }

const props = withDefaults(
  defineProps<{
    modelValue?: string
    disabled?: boolean
    readonly?: boolean
    placeholder?: string
    rows?: number
    maxlength?: number
    showWordLimit?: boolean
    /** 自适应高度；可传 `{ minRows, maxRows }` */
    autosize?: AutosizeOption
  }>(),
  {
    modelValue: '',
    disabled: false,
    readonly: false,
    placeholder: '',
    rows: 3,
    showWordLimit: false,
    autosize: false,
  },
)

const emit = defineEmits<{
  'update:modelValue': [value: string]
  input: [value: string]
  change: [value: string]
  blur: [event: FocusEvent]
  focus: [event: FocusEvent]
}>()

const attrs = useAttrs()
const config = injectConfig()
const { form, emitChange } = useFormItem()
const ns = useNamespace('textarea')
const focused = ref(false)
const textareaRef = ref<HTMLTextAreaElement | null>(null)
const textareaStyle = ref<Record<string, string>>({})

const isDisabled = computed(
  () => props.disabled || form?.disabled.value === true,
)
const count = computed(() => String(props.modelValue ?? '').length)
const isAutosize = computed(() => Boolean(props.autosize))

const autosizeConfig = computed(() => {
  if (props.autosize && typeof props.autosize === 'object') {
    return {
      minRows: props.autosize.minRows ?? props.rows,
      maxRows: props.autosize.maxRows,
    }
  }
  return {
    minRows: props.rows,
    maxRows: undefined as number | undefined,
  }
})

function resize() {
  const el = textareaRef.value
  if (!el || !isAutosize.value) {
    textareaStyle.value = {}
    return
  }
  el.style.height = 'auto'
  const style = window.getComputedStyle(el)
  const lineHeight = Number.parseFloat(style.lineHeight) || 22
  const padding =
    Number.parseFloat(style.paddingTop) + Number.parseFloat(style.paddingBottom)
  const border =
    Number.parseFloat(style.borderTopWidth) +
    Number.parseFloat(style.borderBottomWidth)
  const minH = autosizeConfig.value.minRows * lineHeight + padding + border
  const maxRows = autosizeConfig.value.maxRows
  const maxH =
    maxRows != null
      ? maxRows * lineHeight + padding + border
      : Number.POSITIVE_INFINITY
  const next = Math.min(Math.max(el.scrollHeight, minH), maxH)
  textareaStyle.value = {
    height: `${next}px`,
    resize: 'none',
    overflowY: maxRows != null && el.scrollHeight > maxH ? 'auto' : 'hidden',
  }
}

function onInput(event: Event) {
  const value = (event.target as HTMLTextAreaElement).value
  emit('update:modelValue', value)
  emit('input', value)
  void nextTick(resize)
}

function onChange(event: Event) {
  const value = (event.target as HTMLTextAreaElement).value
  emit('change', value)
  emitChange('change')
}

function onBlur(event: FocusEvent) {
  focused.value = false
  emit('blur', event)
  emitChange('blur')
}

function onFocus(event: FocusEvent) {
  focused.value = true
  emit('focus', event)
}

watch(
  () => props.modelValue,
  () => void nextTick(resize),
)

watch(
  () => props.autosize,
  () => void nextTick(resize),
  { deep: true },
)

onMounted(() => void nextTick(resize))
</script>

<template>
  <div
    :class="[
      ns.b(),
      ns.m(config.size.value),
      ns.is('disabled', isDisabled),
      ns.is('focus', focused),
      ns.is('autosize', isAutosize),
    ]"
  >
    <textarea
      ref="textareaRef"
      :class="ns.e('inner')"
      :value="modelValue"
      :disabled="isDisabled"
      :readonly="readonly"
      :placeholder="placeholder"
      :rows="rows"
      :maxlength="maxlength"
      :style="textareaStyle"
      v-bind="attrs"
      @input="onInput"
      @change="onChange"
      @blur="onBlur"
      @focus="onFocus"
    />
    <div v-if="showWordLimit && maxlength != null" :class="ns.e('count')">
      {{ count }} / {{ maxlength }}
    </div>
  </div>
</template>
