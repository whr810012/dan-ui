import type { ComputedRef, InjectionKey, Ref } from 'vue'
import { inject, provide } from 'vue'

export interface MenuContext {
  mode: ComputedRef<'vertical' | 'horizontal'>
  active: ComputedRef<string>
  select: (index: string) => void
  openedMenus: Ref<string[]>
  toggleOpen: (index: string) => void
  collapse: Ref<boolean>
}

export const menuContextKey: InjectionKey<MenuContext> = Symbol('DanMenu')

export function provideMenu(value: MenuContext) {
  provide(menuContextKey, value)
}

export function injectMenu() {
  const ctx = inject(menuContextKey)
  if (!ctx) {
    throw new Error('[dan-ui] Menu items must be used inside <DanMenu>.')
  }
  return ctx
}
