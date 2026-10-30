<script setup lang="ts">
import { computed, onBeforeUnmount, watch } from 'vue'
import { useNamespace } from '../../hooks/useNamespace'
import { injectTabs } from './tabsContext'
import './style.css'

defineOptions({ name: 'DanTabPane' })

const props = withDefaults(
  defineProps<{
    name: string | number
    label?: string
    disabled?: boolean
    /**
     * 覆盖 Tabs 级 closable / editable。
     * 默认 `undefined` 表示跟随父级（需显式默认，避免 Boolean 缺省被转成 false）。
     */
    closable?: boolean
  }>(),
  {
    label: '',
    disabled: false,
    closable: undefined,
  },
)

const ns = useNamespace('tab-pane')
const tabs = injectTabs()

const active = computed(() => tabs.current.value === props.name)

const paneInfo = computed(() => ({
  name: props.name,
  label: props.label || String(props.name),
  disabled: props.disabled,
  closable: props.closable,
}))

tabs.register(paneInfo.value)

watch(
  paneInfo,
  (value) => {
    tabs.updatePane(value)
  },
  { deep: true },
)

onBeforeUnmount(() => {
  tabs.unregister(props.name)
})
</script>

<template>
  <div
    v-show="active"
    :id="tabs.panelId(name)"
    :class="[ns.b(), ns.is('active', active)]"
    role="tabpanel"
    :aria-labelledby="tabs.tabId(name)"
    :tabindex="active ? 0 : -1"
  >
    <slot />
  </div>
</template>
