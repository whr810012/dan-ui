<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { useNamespace } from '../../hooks/useNamespace'
import { DanIcon } from '../icon'
import { provideTabs, type TabsPane } from './tabsContext'
import './style.css'

defineOptions({ name: 'DanTabs' })

const props = withDefaults(
  defineProps<{
    modelValue?: string | number
    type?: 'line' | 'card'
    /** 显示关闭按钮（可由 TabPane.closable 覆盖） */
    closable?: boolean
    /** 显示新增按钮 */
    addable?: boolean
    /** 等价于 closable + addable */
    editable?: boolean
  }>(),
  {
    type: 'line',
    closable: false,
    addable: false,
    editable: false,
  },
)

const emit = defineEmits<{
  'update:modelValue': [value: string | number]
  change: [value: string | number]
  tabClick: [name: string | number]
  tabRemove: [name: string | number]
  tabAdd: []
  edit: [name: string | number | null, action: 'remove' | 'add']
}>()

const ns = useNamespace('tabs')
const panes = ref<TabsPane[]>([])
const uid = `dan-tabs-${Math.random().toString(36).slice(2, 9)}`

const showAdd = computed(() => props.editable || props.addable)

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

function isPaneClosable(pane: TabsPane) {
  if (pane.closable != null) return pane.closable
  return props.editable || props.closable
}

function removeTab(name: string | number, event?: Event) {
  event?.stopPropagation()
  event?.preventDefault()
  const pane = panes.value.find((item) => item.name === name)
  if (!pane || pane.disabled || !isPaneClosable(pane)) return
  emit('tabRemove', name)
  emit('edit', name, 'remove')
}

function addTab() {
  if (!showAdd.value) return
  emit('tabAdd')
  emit('edit', null, 'add')
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
  } else if (key === 'Delete' || key === 'Backspace') {
    const name = current.value
    if (name == null) return
    const pane = panes.value.find((item) => item.name === name)
    if (!pane || !isPaneClosable(pane)) return
    event.preventDefault()
    removeTab(name)
  }
}

function onTabKeydown(name: string | number, event: KeyboardEvent) {
  if (event.key === 'Enter' || event.key === ' ') {
    event.preventDefault()
    select(name)
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
  <div
    :class="[
      ns.b(),
      ns.m(type),
      ns.is('editable', editable || closable || addable),
    ]"
  >
    <div :class="ns.e('nav')" role="tablist" @keydown="onNavKeydown">
      <div
        v-for="pane in panes"
        :id="tabId(pane.name)"
        :key="String(pane.name)"
        :class="[
          ns.e('item'),
          ns.is('active', pane.name === current),
          ns.is('disabled', pane.disabled),
          ns.is('closable', isPaneClosable(pane)),
        ]"
        role="tab"
        :aria-selected="pane.name === current"
        :aria-controls="panelId(pane.name)"
        :aria-disabled="pane.disabled || undefined"
        :tabindex="pane.disabled ? -1 : pane.name === current ? 0 : -1"
        @click="select(pane.name)"
        @keydown="onTabKeydown(pane.name, $event)"
      >
        <span :class="ns.e('label')">{{ pane.label }}</span>
        <button
          v-if="isPaneClosable(pane)"
          type="button"
          :class="ns.e('close')"
          :disabled="pane.disabled"
          aria-label="关闭标签"
          tabindex="-1"
          @click="removeTab(pane.name, $event)"
        >
          <DanIcon name="close" :size="12" />
        </button>
      </div>
      <button
        v-if="showAdd"
        type="button"
        :class="ns.e('new')"
        aria-label="新增标签"
        @click="addTab"
      >
        <DanIcon name="plus" :size="14" />
      </button>
    </div>
    <div :class="ns.e('content')">
      <slot />
    </div>
  </div>
</template>
