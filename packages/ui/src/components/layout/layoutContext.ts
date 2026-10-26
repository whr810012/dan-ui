import type { ComputedRef, Ref } from 'vue'
import { createContext } from '../../utils/createContext'

export interface LayoutContext {
  hasAside: Ref<boolean> | ComputedRef<boolean>
  registerAside: () => void
  unregisterAside: () => void
}

export const [provideLayout, injectLayout, layoutContextKey] =
  createContext<LayoutContext>('DanLayout')
