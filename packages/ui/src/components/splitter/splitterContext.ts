import type { ComputedRef, InjectionKey, Ref } from 'vue'
import { inject, provide } from 'vue'

export interface SplitterContext {
  layout: ComputedRef<'horizontal' | 'vertical'>
  sizes: Ref<number[]>
  register: (defaultSize: number) => number
  startResize: (index: number, event: MouseEvent) => void
}

export const splitterContextKey: InjectionKey<SplitterContext> =
  Symbol('DanSplitter')

export function provideSplitter(value: SplitterContext) {
  provide(splitterContextKey, value)
}

export function injectSplitter() {
  const ctx = inject(splitterContextKey)
  if (!ctx) {
    throw new Error('[dan-ui] <DanSplitterPanel> must be used inside <DanSplitter>.')
  }
  return ctx
}
