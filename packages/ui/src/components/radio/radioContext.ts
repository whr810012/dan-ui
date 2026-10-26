import type { Ref } from 'vue'
import { createContext } from '../../utils/createContext'

export interface RadioGroupContext {
  modelValue: Ref<string | number | boolean | undefined>
  disabled: Ref<boolean>
  changeEvent: (value: string | number | boolean) => void
}

export const [provideRadioGroup, injectRadioGroup, radioGroupKey] =
  createContext<RadioGroupContext>('DanRadioGroup')
