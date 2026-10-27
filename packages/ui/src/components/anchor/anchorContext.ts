import type { ComputedRef, InjectionKey } from 'vue'
import { inject } from 'vue'

export interface AnchorLinkItem {
  href: string
  title: string
}

export interface AnchorContext {
  current: ComputedRef<string>
  register: (link: AnchorLinkItem) => void
  unregister: (href: string) => void
  scrollTo: (href: string, event?: MouseEvent) => void
}

export const anchorContextKey: InjectionKey<AnchorContext> = Symbol('DanAnchor')

export function injectAnchor() {
  const ctx = inject(anchorContextKey)
  if (!ctx) {
    throw new Error('[dan-ui] <DanAnchorLink> must be used inside <DanAnchor>.')
  }
  return ctx
}
