<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { useNamespace } from '../../hooks/useNamespace'
import { provideTabs, type TabsPane } from './tabsContext'
import './style.css'

defineOptions({ name: 'DanTabs' })

const props = withDefaults(
  defineProps<{
    modelValue?: string | number
    type?: 'line' | 'card'
  }>(),
  {
    type: 'line',
  },
)

const emit = defineEmits<{
  'update:modelValue': [value: string | number]
  change: [value: string | number]
  tabClick: [name: string | number]
}>()

const ns = useNamespace('tabs')
const panes = ref<TabsPane[]>([])

const current = computed(() => {
  if (props.modelValue != null && props.modelValue !== '') {
    return props.modelValue
  }
  return panes.value.find((pane) => !pane.disabled)?.name
})

function register(pane: TabsPane) {
  if (!panes.value.some((item) => item.name === pane.name)) {
    panes.value.push(pane)
  }
}

function unregister(name: string | number) {
  panes.value = panes.value.filter((item) => item.name !== name)
}

function updatePane(pane: TabsPane) {
  const index = panes.value.findIndex((item) => item.name === pane.name)
  if (index >= 0) panes.value[index] = pane
}

function select(name: string | number) {
  const pane = panes.value.find((item) => item.name === name)
  if (!pane || pane.disabled) return
  emit('tabClick', name)
  if (name === current.value) return
  emit('update:modelValue', name)
  emit('change', name)
}

provideTabs({
  current,
  register,
  unregister,
  updatePane,
  select,
  panes,
})

watch(
  panes,
  (list) => {
    if (props.modelValue != null && props.modelValue !== '') return
    const first = list.find((pane) => !pane.disabled)
    if (first) emit('update:modelValue', first.name)
  },
  { deep: true },
)
</script>

<template>
  <div :class="[ns.b(), ns.m(type)]">
    <div :class="ns.e('nav')" role="tablist">
      <button
        v-for="pane in panes"
        :key="String(pane.name)"
        type="button"
        :class="[
          ns.e('item'),
          ns.is('active', pane.name === current),
          ns.is('disabled', pane.disabled),
        ]"
        role="tab"
        :aria-selected="pane.name === current"
        :disabled="pane.disabled"
        @click="select(pane.name)"
      >
        {{ pane.label }}
      </button>
    </div>
    <div :class="ns.e('content')">
      <slot />
    </div>
  </div>
</template>
