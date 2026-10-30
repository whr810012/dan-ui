import type { ComputedRef, InjectionKey, Ref } from 'vue'
import { inject, provide } from 'vue'

export interface TabsPane {
  name: string | number
  label: string
  disabled: boolean
  /** 单页覆盖；未设置时跟随 Tabs 的 closable / editable */
  closable?: boolean
}

export interface TabsContext {
  current: ComputedRef<string | number | undefined>
  register: (pane: TabsPane) => void
  unregister: (name: string | number) => void
  updatePane: (pane: TabsPane) => void
  select: (name: string | number) => void
  panes: Ref<TabsPane[]>
  tabId: (name: string | number) => string
  panelId: (name: string | number) => string
}

export const tabsContextKey: InjectionKey<TabsContext> = Symbol('DanTabs')

export function provideTabs(value: TabsContext) {
  provide(tabsContextKey, value)
}

export function injectTabs() {
  const ctx = inject(tabsContextKey)
  if (!ctx) {
    throw new Error('[dan-ui] <DanTabPane> must be used inside <DanTabs>.')
  }
  return ctx
}
