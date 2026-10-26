import type { Ref } from 'vue'
import { createContext } from '../utils/createContext'

export interface FormContext {
  model: Ref<Record<string, unknown>>
  disabled: Ref<boolean>
  size?: Ref<'small' | 'default' | 'large'>
  addField: (field: FormItemContext) => void
  removeField: (field: FormItemContext) => void
}

export interface FormItemContext {
  prop?: string
  validate: (trigger?: string) => Promise<boolean>
  resetField: () => void
  clearValidate: () => void
}

export const [provideForm, injectForm, formContextKey] =
  createContext<FormContext>('DanForm')

export const [provideFormItem, injectFormItem, formItemContextKey] =
  createContext<FormItemContext>('DanFormItem')
