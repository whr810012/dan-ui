import type { Ref } from 'vue'
import { createContext } from '../utils/createContext'
import type { FormRule, FormRules } from '../utils/validate'

export interface FormContext {
  model: Ref<Record<string, unknown>>
  rules: Ref<FormRules>
  disabled: Ref<boolean>
  size?: Ref<'small' | 'default' | 'large' | undefined>
  labelWidth?: Ref<string | undefined>
  requireAsteriskPosition?: Ref<'left' | 'right'>
  addField: (field: FormItemContext) => void
  removeField: (field: FormItemContext) => void
  validateField: (prop: string) => Promise<boolean>
}

export interface FormItemContext {
  prop?: string
  validate: (trigger?: string) => Promise<boolean>
  resetField: () => void
  clearValidate: () => void
  /** FormItem 根节点，用于滚到字段 */
  $el?: HTMLElement | null
  validateState?: string
  validateMessage?: string
}

export interface FormFieldState {
  prop?: string
  valid: boolean
  message: string
  validateState: string
}

export type { FormRule, FormRules }

export const [provideForm, injectForm, formContextKey] =
  createContext<FormContext>('DanForm')

export const [provideFormItem, injectFormItem, formItemContextKey] =
  createContext<FormItemContext>('DanFormItem')
