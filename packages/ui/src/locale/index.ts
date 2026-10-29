import { computed, type ComputedRef, type Ref } from 'vue'
import { injectConfig } from '../hooks/useConfig'
import en from './en'
import type { LocaleMessages } from './types'
import zhCN from './zh-CN'

export type { LocaleMessages }
export { zhCN, en }

export function useLocale(): {
  locale: ComputedRef<LocaleMessages>
  t: (path: string, vars?: Record<string, string | number>) => string
} {
  const config = injectConfig()
  const locale = computed(() => config.locale?.value ?? zhCN)

  function t(path: string, vars?: Record<string, string | number>) {
    const segments = path.split('.')
    let current: unknown = locale.value
    for (const key of segments) {
      if (current == null || typeof current !== 'object') {
        current = undefined
        break
      }
      current = (current as Record<string, unknown>)[key]
    }
    let text = typeof current === 'string' ? current : path
    if (vars) {
      for (const [key, value] of Object.entries(vars)) {
        text = text.replace(new RegExp(`\\{${key}\\}`, 'g'), String(value))
      }
    }
    return text
  }

  return { locale, t }
}

export type LocaleRef = Ref<LocaleMessages>
