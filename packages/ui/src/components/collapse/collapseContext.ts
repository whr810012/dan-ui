import type { ComputedRef, InjectionKey } from 'vue'

export interface CollapseContext {
  activeNames: ComputedRef<Array<string | number>>
  toggle: (name: string | number) => void
}

export const collapseContextKey: InjectionKey<CollapseContext> =
  Symbol('DanCollapse')
