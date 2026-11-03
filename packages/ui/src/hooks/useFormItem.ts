import { inject } from 'vue'
import { injectConfig, type DanSize } from './useConfig'
import {
  formContextKey,
  formItemContextKey,
  type FormContext,
  type FormItemContext,
} from './useFormContext'

export function useFormItem() {
  const form = inject(formContextKey, undefined) as FormContext | undefined
  const formItem = inject(formItemContextKey, undefined) as
    | FormItemContext
    | undefined
  const config = injectConfig()

  const emitChange = (trigger: 'change' | 'blur' = 'change') => {
    formItem?.validate?.(trigger).catch(() => undefined)
  }

  /** 控件 size：自身 prop > Form.size > ConfigProvider.size */
  const resolveSize = (size?: DanSize | null) =>
    size ?? form?.size?.value ?? config.size.value

  return {
    form,
    formItem,
    config,
    emitChange,
    resolveSize,
  }
}
