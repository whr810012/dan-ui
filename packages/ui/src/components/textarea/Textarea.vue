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
    /** 展示字数统计（需配合 maxlength；禁用时不展示） */
    showWordLimit?: boolean
    /** 显示值格式化 */
    formatter?: (value: string) => string
    /** 将输入解析回 modelValue */
    parser?: (value: string) => string
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
const rawValue = computed(() => String(props.modelValue ?? ''))
const displayValue = computed(() =>
  props.formatter ? props.formatter(rawValue.value) : rawValue.value,
)
const wordCount = computed(() => rawValue.value.length)
const showLimit = computed(
  () =>
    props.showWordLimit &&
    props.maxlength != null &&
    props.maxlength >= 0 &&
    !isDisabled.value,
)
const isExceed = computed(
  () =>
    showLimit.value &&
    props.maxlength != null &&
    wordCount.value > props.maxlength,
)
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

function normalize(value: string) {
  return props.parser ? props.parser(value) : value
}

function commit(value: string) {
  emit('update:modelValue', value)
  emit('input', value)
}

function onInput(event: Event) {
  const el = event.target as HTMLTextAreaElement
  let next = normalize(el.value)
  if (props.maxlength != null && next.length > props.maxlength) {
    next = next.slice(0, props.maxlength)
  }
  commit(next)
  if (props.formatter || props.parser) {
    el.value = props.formatter ? props.formatter(next) : next
  }
  void nextTick(resize)
}

function onChange(event: Event) {
  const value = normalize((event.target as HTMLTextAreaElement).value)
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
      ns.is('exceed', isExceed),
    ]"
  >
    <textarea
      ref="textareaRef"
      :class="ns.e('inner')"
      :value="displayValue"
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
    <div v-if="showLimit" :class="ns.e('count')">
      {{ wordCount }} / {{ maxlength }}
    </div>
  </div>
</template>
