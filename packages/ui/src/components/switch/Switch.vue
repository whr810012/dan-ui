<script setup lang="ts">
import { computed } from 'vue'
import { useFormItem } from '../../hooks/useFormItem'
import { useNamespace } from '../../hooks/useNamespace'
import './style.css'

defineOptions({ name: 'DanSwitch' })

const props = withDefaults(
  defineProps<{
    modelValue?: boolean | string | number
    disabled?: boolean
    activeValue?: boolean | string | number
    inactiveValue?: boolean | string | number
    activeText?: string
    inactiveText?: string
  }>(),
  {
    modelValue: false,
    disabled: false,
    activeValue: true,
    inactiveValue: false,
  },
)

const emit = defineEmits<{
  'update:modelValue': [value: boolean | string | number]
  change: [value: boolean | string | number]
}>()

const ns = useNamespace('switch')
const { form, emitChange } = useFormItem()

const isDisabled = computed(
  () => props.disabled || form?.disabled.value === true,
)
const checked = computed(() => props.modelValue === props.activeValue)

function toggle() {
  if (isDisabled.value) return
  const next = checked.value ? props.inactiveValue : props.activeValue
  emit('update:modelValue', next)
  emit('change', next)
  emitChange('change')
}
</script>

<template>
  <button
    :class="[ns.b(), ns.is('checked', checked), ns.is('disabled', isDisabled)]"
    type="button"
    role="switch"
    :aria-checked="checked"
    :disabled="isDisabled"
    @click="toggle"
  >
    <span v-if="inactiveText" :class="ns.e('label')">{{ inactiveText }}</span>
    <span :class="ns.e('core')">
      <span :class="ns.e('action')" />
    </span>
    <span v-if="activeText" :class="ns.e('label')">{{ activeText }}</span>
  </button>
</template>
