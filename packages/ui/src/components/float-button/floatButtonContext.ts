import type { ComputedRef, InjectionKey } from 'vue'

export interface FloatButtonGroupContext {
  shape: ComputedRef<'circle' | 'square'>
}

export const floatButtonGroupKey: InjectionKey<FloatButtonGroupContext> =
  Symbol('DanFloatButtonGroup')
