import { inject } from 'vue'
import {
  formContextKey,
  formItemContextKey,
  type FormContext,
  type FormItemContext,
} from './useFormContext'

export function useFormItem() {
  const form = inject(formContextKey, undefined) as FormContext | undefined
  const formItem = inject(formItemContextKey, undefined) as
    FormItemContext | undefined

  const emitChange = (trigger: 'change' | 'blur' = 'change') => {
    formItem?.validate?.(trigger).catch(() => undefined)
  }

  return {
    form,
    formItem,
    emitChange,
  }
}
