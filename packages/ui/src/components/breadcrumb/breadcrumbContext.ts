import type { ComputedRef, InjectionKey, Ref, Slot } from 'vue'
import { inject, provide } from 'vue'

export interface BreadcrumbContext {
  separator: Ref<string>
  separatorSlot: ComputedRef<Slot | undefined>
  register: (uid: number) => void
  unregister: (uid: number) => void
  isVisible: (uid: number) => boolean
  showEllipsisBefore: (uid: number) => boolean
}

export const breadcrumbContextKey: InjectionKey<BreadcrumbContext> =
  Symbol('DanBreadcrumb')

export function provideBreadcrumb(value: BreadcrumbContext) {
  provide(breadcrumbContextKey, value)
}

export function injectBreadcrumb() {
  return inject(breadcrumbContextKey)
}
