<script setup lang="ts">
import { computed, ref } from 'vue'
import { useFormItem } from '../../hooks/useFormItem'
import { useNamespace } from '../../hooks/useNamespace'
import './style.css'

defineOptions({ name: 'DanRate' })

const props = withDefaults(
  defineProps<{
    modelValue?: number
    max?: number
    allowHalf?: boolean
    /** 再次点击相同分值时清空为 0 */
    clearable?: boolean
    disabled?: boolean
    voidColor?: string
    activeColor?: string
  }>(),
  {
    modelValue: 0,
    max: 5,
    allowHalf: false,
    clearable: false,
    disabled: false,
    voidColor: '',
    activeColor: '',
  },
)

const emit = defineEmits<{
  'update:modelValue': [value: number]
  change: [value: number]
}>()

const ns = useNamespace('rate')
const { form, emitChange } = useFormItem()
const hoverValue = ref<number | null>(null)

const isDisabled = computed(
  () => props.disabled || form?.disabled.value === true,
)

const current = computed(() => hoverValue.value ?? props.modelValue)

const items = computed(() =>
  Array.from({ length: Math.max(1, props.max) }, (_, index) => index + 1),
)

function scoreFromEvent(index: number, event: MouseEvent) {
  if (!props.allowHalf) return index
  const target = event.currentTarget as HTMLElement
  const rect = target.getBoundingClientRect()
  const isLeft = event.clientX - rect.left < rect.width / 2
  return isLeft ? index - 0.5 : index
}

function setValue(value: number) {
  if (isDisabled.value) return
  emit('update:modelValue', value)
  emit('change', value)
  emitChange('change')
}

function onMove(index: number, event: MouseEvent) {
  if (isDisabled.value) return
  hoverValue.value = scoreFromEvent(index, event)
}

function onLeave() {
  hoverValue.value = null
}

function onClick(index: number, event: MouseEvent) {
  const next = scoreFromEvent(index, event)
  if (props.clearable && next === props.modelValue) {
    setValue(0)
    return
  }
  setValue(next)
}

function itemClass(index: number) {
  const value = current.value
  if (value >= index) return 'full'
  if (props.allowHalf && value >= index - 0.5) return 'half'
  return 'void'
}
</script>

<template>
  <div
    :class="[ns.b(), ns.is('disabled', isDisabled)]"
    role="slider"
    tabindex="0"
    :aria-valuemin="0"
    :aria-valuemax="max"
    :aria-valuenow="modelValue"
    :aria-disabled="isDisabled || undefined"
    @mouseleave="onLeave"
  >
    <span
      v-for="index in items"
      :key="index"
      :class="[ns.e('item'), ns.is(itemClass(index), true)]"
      @mousemove="onMove(index, $event)"
      @click="onClick(index, $event)"
    >
      <span
        :class="ns.e('icon')"
        :style="{
          color:
            itemClass(index) === 'void'
              ? voidColor || undefined
              : activeColor || undefined,
        }"
        >★</span
      >
      <span
        v-if="allowHalf"
        :class="ns.e('icon-half')"
        :style="{ color: activeColor || undefined }"
        >★</span
      >
    </span>
  </div>
</template>
