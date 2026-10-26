import type { InjectionKey, Ref } from 'vue'
import { inject } from 'vue'

export interface BreadcrumbContext {
  separator: Ref<string>
}

export const breadcrumbContextKey: InjectionKey<BreadcrumbContext> =
  Symbol('DanBreadcrumb')

export function injectBreadcrumb() {
  return inject(breadcrumbContextKey)
}
