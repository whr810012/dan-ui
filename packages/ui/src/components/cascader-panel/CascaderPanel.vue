<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { useNamespace } from '../../hooks/useNamespace'
import type { CascaderOption } from '../cascader/types'
import '../cascader/style.css'
import './style.css'

defineOptions({ name: 'DanCascaderPanel' })

const props = withDefaults(
  defineProps<{
    modelValue?: Array<string | number> | null
    options?: CascaderOption[]
  }>(),
  {
    modelValue: null,
    options: () => [],
  },
)

const emit = defineEmits<{
  'update:modelValue': [value: Array<string | number> | null]
  change: [value: Array<string | number> | null]
}>()

const ns = useNamespace('cascader')
const panelNs = useNamespace('cascader-panel')
const activePath = ref<CascaderOption[]>([])

function syncFromValue() {
  if (!props.modelValue?.length) {
    activePath.value = []
    return
  }
  const path: CascaderOption[] = []
  let list = props.options
  for (const val of props.modelValue) {
    const found = list.find((item) => item.value === val)
    if (!found) break
    path.push(found)
    list = found.children || []
  }
  activePath.value = path
}

watch(
  () => [props.modelValue, props.options] as const,
  () => syncFromValue(),
  { immediate: true, deep: true },
)

const columns = computed(() => {
  const cols: CascaderOption[][] = [props.options]
  for (const node of activePath.value) {
    if (node.children?.length) cols.push(node.children)
  }
  return cols
})

function onSelect(level: number, option: CascaderOption) {
  if (option.disabled) return
  activePath.value = [...activePath.value.slice(0, level), option]
  if (!option.children?.length) {
    const value = activePath.value.map((item) => item.value)
    emit('update:modelValue', value)
    emit('change', value)
  }
}
</script>

<template>
  <div :class="[ns.e('panel'), panelNs.b(), ns.is('embedded', true)]">
    <ul v-for="(col, level) in columns" :key="level" :class="ns.e('menu')">
      <li
        v-for="option in col"
        :key="String(option.value)"
        :class="[
          ns.e('node'),
          ns.is('active', activePath[level]?.value === option.value),
          ns.is('disabled', !!option.disabled),
        ]"
        @click="onSelect(level, option)"
      >
        <span>{{ option.label }}</span>
        <span v-if="option.children?.length" :class="ns.e('arrow')">›</span>
      </li>
    </ul>
  </div>
</template>
