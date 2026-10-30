import type { Ref } from 'vue'
import { createContext } from '../../utils/createContext'

export interface CheckboxGroupContext {
  modelValue: Ref<Array<string | number | boolean>>
  disabled: Ref<boolean>
  border: Ref<boolean>
  button: Ref<boolean>
  changeEvent: (value: Array<string | number | boolean>) => void
}

export const [provideCheckboxGroup, injectCheckboxGroup, checkboxGroupKey] =
  createContext<CheckboxGroupContext>('DanCheckboxGroup')
