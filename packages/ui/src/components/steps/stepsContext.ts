import type { ComputedRef, InjectionKey, Ref } from 'vue'
import { inject, provide } from 'vue'

export type StepStatus = 'wait' | 'process' | 'finish' | 'error' | 'success'

export interface StepsContext {
  active: ComputedRef<number>
  direction: ComputedRef<'horizontal' | 'vertical'>
  processStatus: ComputedRef<StepStatus>
  finishStatus: ComputedRef<StepStatus>
  simple: ComputedRef<boolean>
  uids: Ref<number[]>
  register: (uid: number) => void
  unregister: (uid: number) => void
}

export const stepsContextKey: InjectionKey<StepsContext> = Symbol('DanSteps')

export function provideSteps(value: StepsContext) {
  provide(stepsContextKey, value)
}

export function injectSteps() {
  const ctx = inject(stepsContextKey)
  if (!ctx) {
    throw new Error('[dan-ui] <DanStep> must be used inside <DanSteps>.')
  }
  return ctx
}
