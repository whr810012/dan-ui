import type { Ref } from 'vue'
import { createContext } from '../utils/createContext'
import type { FormRule, FormRules } from '../utils/validate'

export interface FormContext {
  model: Ref<Record<string, unknown>>
  rules: Ref<FormRules>
  disabled: Ref<boolean>
  size?: Ref<'small' | 'default' | 'large' | undefined>
  labelWidth?: Ref<string | undefined>
  addField: (field: FormItemContext) => void
  removeField: (field: FormItemContext) => void
}

export interface FormItemContext {
  prop?: string
  validate: (trigger?: string) => Promise<boolean>
  resetField: () => void
  clearValidate: () => void
}

export type { FormRule, FormRules }

export const [provideForm, injectForm, formContextKey] =
  createContext<FormContext>('DanForm')

export const [provideFormItem, injectFormItem, formItemContextKey] =
  createContext<FormItemContext>('DanFormItem')
