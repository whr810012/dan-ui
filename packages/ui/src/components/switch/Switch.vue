<script setup lang="ts">
import { computed, ref } from 'vue'
import { useFormItem } from '../../hooks/useFormItem'
import { useNamespace } from '../../hooks/useNamespace'
import { DanIcon } from '../icon'
import './style.css'

defineOptions({ name: 'DanSwitch' })

const props = withDefaults(
  defineProps<{
    modelValue?: boolean | string | number
    disabled?: boolean
    loading?: boolean
    /** 切换前钩子；返回 false / Promise.reject 则阻止切换 */
    beforeChange?: () => boolean | Promise<boolean>
    activeValue?: boolean | string | number
    inactiveValue?: boolean | string | number
    activeText?: string
    inactiveText?: string
  }>(),
  {
    modelValue: false,
    disabled: false,
    loading: false,
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
const pending = ref(false)

const isDisabled = computed(
  () => props.disabled || form?.disabled.value === true,
)
const isLoading = computed(() => props.loading || pending.value)
const checked = computed(() => props.modelValue === props.activeValue)

function applyValue(next: boolean | string | number) {
  emit('update:modelValue', next)
  emit('change', next)
  emitChange('change')
}

async function toggle() {
  if (isDisabled.value || isLoading.value) return
  const next = checked.value ? props.inactiveValue : props.activeValue
  if (!props.beforeChange) {
    applyValue(next)
    return
  }

  pending.value = true
  try {
    const ok = await props.beforeChange()
    if (ok !== false) applyValue(next)
  } catch {
    // beforeChange rejected → keep current value
  } finally {
    pending.value = false
  }
}
</script>

<template>
  <button
    :class="[
      ns.b(),
      ns.is('checked', checked),
      ns.is('disabled', isDisabled),
      ns.is('loading', isLoading),
    ]"
    type="button"
    role="switch"
    :aria-checked="checked"
    :aria-busy="isLoading || undefined"
    :disabled="isDisabled || isLoading"
    @click="toggle"
  >
    <span v-if="inactiveText" :class="ns.e('label')">{{ inactiveText }}</span>
    <span :class="ns.e('core')">
      <span :class="ns.e('action')">
        <DanIcon
          v-if="isLoading"
          name="loading"
          spin
          :size="12"
          :class="ns.e('loading')"
        />
      </span>
    </span>
    <span v-if="activeText" :class="ns.e('label')">{{ activeText }}</span>
  </button>
</template>
