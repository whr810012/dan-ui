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
const uid = `dan-tabs-${Math.random().toString(36).slice(2, 9)}`

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

function enabledPanes() {
  return panes.value.filter((pane) => !pane.disabled)
}

function moveTab(delta: number) {
  const list = enabledPanes()
  if (!list.length) return
  const index = list.findIndex((pane) => pane.name === current.value)
  const next =
    list[(index < 0 ? 0 : index + delta + list.length) % list.length]!
  select(next.name)
  void Promise.resolve().then(() => {
    const el = document.getElementById(tabId(next.name))
    el?.focus()
  })
}

function onNavKeydown(event: KeyboardEvent) {
  const key = event.key
  if (key === 'ArrowRight' || key === 'ArrowDown') {
    event.preventDefault()
    moveTab(1)
  } else if (key === 'ArrowLeft' || key === 'ArrowUp') {
    event.preventDefault()
    moveTab(-1)
  } else if (key === 'Home') {
    event.preventDefault()
    const first = enabledPanes()[0]
    if (first) {
      select(first.name)
      document.getElementById(tabId(first.name))?.focus()
    }
  } else if (key === 'End') {
    event.preventDefault()
    const list = enabledPanes()
    const last = list[list.length - 1]
    if (last) {
      select(last.name)
      document.getElementById(tabId(last.name))?.focus()
    }
  }
}

function tabId(name: string | number) {
  return `${uid}-tab-${String(name)}`
}

function panelId(name: string | number) {
  return `${uid}-panel-${String(name)}`
}

provideTabs({
  current,
  register,
  unregister,
  updatePane,
  select,
  panes,
  tabId,
  panelId,
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
    <div :class="ns.e('nav')" role="tablist" @keydown="onNavKeydown">
      <button
        v-for="pane in panes"
        :id="tabId(pane.name)"
        :key="String(pane.name)"
        type="button"
        :class="[
          ns.e('item'),
          ns.is('active', pane.name === current),
          ns.is('disabled', pane.disabled),
        ]"
        role="tab"
        :aria-selected="pane.name === current"
        :aria-controls="panelId(pane.name)"
        :tabindex="pane.name === current ? 0 : -1"
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
