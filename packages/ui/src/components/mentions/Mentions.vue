<script setup lang="ts">
import { computed, nextTick, ref } from 'vue'
import { useFormItem } from '../../hooks/useFormItem'
import { useNamespace } from '../../hooks/useNamespace'
import type { MentionOption } from './types'
import './style.css'

defineOptions({ name: 'DanMentions' })

const props = withDefaults(
  defineProps<{
    modelValue?: string
    options?: MentionOption[]
    disabled?: boolean
    placeholder?: string
    rows?: number
    prefix?: string
  }>(),
  {
    modelValue: '',
    options: () => [],
    disabled: false,
    placeholder: '',
    rows: 3,
    prefix: '@',
  },
)

const emit = defineEmits<{
  'update:modelValue': [value: string]
  change: [value: string]
  select: [option: MentionOption]
}>()

const ns = useNamespace('mentions')
const { form, emitChange } = useFormItem()
const textareaRef = ref<HTMLTextAreaElement | null>(null)
const opened = ref(false)
const query = ref('')
const atIndex = ref(-1)

const isDisabled = computed(
  () => props.disabled || form?.disabled.value === true,
)

const filtered = computed(() => {
  const q = query.value.toLowerCase()
  return props.options.filter((item) => {
    const text = (item.label || item.value).toLowerCase()
    return !q || text.includes(q)
  })
})

function onInput(event: Event) {
  const el = event.target as HTMLTextAreaElement
  const value = el.value
  emit('update:modelValue', value)

  const cursor = el.selectionStart ?? value.length
  const before = value.slice(0, cursor)
  const match = before.match(
    new RegExp(`${props.prefix}([^\\s${props.prefix}]*)$`),
  )
  if (match) {
    atIndex.value = cursor - match[0].length
    query.value = match[1] || ''
    opened.value = true
  } else {
    opened.value = false
    query.value = ''
    atIndex.value = -1
  }
}

function onChange() {
  emit('change', props.modelValue)
  emitChange('change')
}

async function select(option: MentionOption) {
  const el = textareaRef.value
  if (!el || atIndex.value < 0) return
  const cursor = el.selectionStart ?? props.modelValue.length
  const before = props.modelValue.slice(0, atIndex.value)
  const after = props.modelValue.slice(cursor)
  const insert = `${props.prefix}${option.value} `
  const next = `${before}${insert}${after}`
  emit('update:modelValue', next)
  emit('select', option)
  emit('change', next)
  emitChange('change')
  opened.value = false
  await nextTick()
  const pos = before.length + insert.length
  el.focus()
  el.setSelectionRange(pos, pos)
}
</script>

<template>
  <div
    :class="[ns.b(), ns.is('disabled', isDisabled), ns.is('opened', opened)]"
  >
    <textarea
      ref="textareaRef"
      :class="ns.e('inner')"
      :value="modelValue"
      :disabled="isDisabled"
      :placeholder="placeholder"
      :rows="rows"
      @input="onInput"
      @change="onChange"
    />
    <ul v-if="opened && filtered.length" :class="ns.e('panel')">
      <li
        v-for="option in filtered"
        :key="option.value"
        :class="ns.e('item')"
        @mousedown.prevent="select(option)"
      >
        {{ option.label || option.value }}
      </li>
    </ul>
  </div>
</template>
