<script setup lang="ts">
import { computed } from 'vue'
import { useFormItem } from '../../hooks/useFormItem'
import { useNamespace } from '../../hooks/useNamespace'
import './style.css'

defineOptions({ name: 'DanColorPicker' })

const props = withDefaults(
  defineProps<{
    modelValue?: string
    disabled?: boolean
    showAlpha?: boolean
    predefine?: string[]
  }>(),
  {
    modelValue: '#2563eb',
    disabled: false,
    showAlpha: false,
    predefine: () => [
      '#2563eb',
      '#16a34a',
      '#d97706',
      '#dc2626',
      '#7c3aed',
      '#0f172a',
      '#ffffff',
    ],
  },
)

const emit = defineEmits<{
  'update:modelValue': [value: string]
  change: [value: string]
}>()

const ns = useNamespace('color-picker')
const { form, emitChange } = useFormItem()
const isDisabled = computed(
  () => props.disabled || form?.disabled.value === true,
)

function setColor(value: string) {
  if (isDisabled.value) return
  emit('update:modelValue', value)
  emit('change', value)
  emitChange('change')
}

function onNative(event: Event) {
  setColor((event.target as HTMLInputElement).value)
}
</script>

<template>
  <div :class="[ns.b(), ns.is('disabled', isDisabled)]">
    <label :class="ns.e('trigger')">
      <span :class="ns.e('swatch')" :style="{ background: modelValue }" />
      <input
        :class="ns.e('native')"
        type="color"
        :value="modelValue.slice(0, 7)"
        :disabled="isDisabled"
        @input="onNative"
      />
      <span :class="ns.e('value')">{{ modelValue }}</span>
    </label>
    <div v-if="predefine.length" :class="ns.e('predefine')">
      <button
        v-for="color in predefine"
        :key="color"
        type="button"
        :class="[ns.e('preset'), ns.is('active', color === modelValue)]"
        :style="{ background: color }"
        :disabled="isDisabled"
        :aria-label="color"
        @click="setColor(color)"
      />
    </div>
  </div>
</template>
