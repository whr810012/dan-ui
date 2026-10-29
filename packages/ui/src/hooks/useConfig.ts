import { ref, type Ref } from 'vue'
import { createContext } from '../utils/createContext'
import zhCN from '../locale/zh-CN'
import type { LocaleMessages } from '../locale/types'

export type DanSize = 'small' | 'default' | 'large'

export interface ConfigProviderContext {
  size: Ref<DanSize>
  zIndex: Ref<number>
  namespace: Ref<string>
  locale: Ref<LocaleMessages>
}

const defaultConfig: ConfigProviderContext = {
  size: ref('default'),
  zIndex: ref(2000),
  namespace: ref('dan'),
  locale: ref(zhCN),
}

export const [provideConfig, injectConfig, configProviderContextKey] =
  createContext<ConfigProviderContext>('DanConfigProvider', defaultConfig)
