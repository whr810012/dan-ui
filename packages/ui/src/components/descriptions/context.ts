import type { InjectionKey, Ref } from 'vue'

export interface DescriptionsContext {
  border: Ref<boolean>
  direction: Ref<'horizontal' | 'vertical'>
  column: Ref<number>
}

export const descriptionsContextKey: InjectionKey<DescriptionsContext> =
  Symbol('DanDescriptions')
