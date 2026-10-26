<script setup lang="ts">
import { computed, provide } from 'vue'
import { useNamespace } from '../../hooks/useNamespace'
import { collapseContextKey } from './collapseContext'
import './style.css'

defineOptions({ name: 'DanCollapse' })

const props = withDefaults(
  defineProps<{
    modelValue?: string | number | Array<string | number>
    accordion?: boolean
  }>(),
  {
    modelValue: () => [],
    accordion: false,
  },
)

const emit = defineEmits<{
  'update:modelValue': [value: string | number | Array<string | number>]
  change: [value: string | number | Array<string | number>]
}>()

const ns = useNamespace('collapse')

const activeNames = computed({
  get() {
    if (props.accordion) {
      const value = Array.isArray(props.modelValue)
        ? props.modelValue[0]
        : props.modelValue
      return value == null || value === '' ? [] : [value]
    }
    return Array.isArray(props.modelValue)
      ? props.modelValue
      : props.modelValue == null || props.modelValue === ''
        ? []
        : [props.modelValue]
  },
  set() {
    /* handled in toggle */
  },
})

function toggle(name: string | number) {
  let next: string | number | Array<string | number>
  if (props.accordion) {
    next = activeNames.value.includes(name) ? '' : name
  } else {
    const set = new Set(activeNames.value)
    if (set.has(name)) set.delete(name)
    else set.add(name)
    next = [...set]
  }
  emit('update:modelValue', next)
  emit('change', next)
}

provide(collapseContextKey, {
  activeNames,
  toggle,
})
</script>

<template>
  <div :class="ns.b()">
    <slot />
  </div>
</template>
