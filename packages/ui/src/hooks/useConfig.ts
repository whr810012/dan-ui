import { ref, type Ref } from 'vue'
import { createContext } from '../utils/createContext'

export type DanSize = 'small' | 'default' | 'large'

export interface ConfigProviderContext {
  size: Ref<DanSize>
  zIndex: Ref<number>
  namespace: Ref<string>
}

const defaultConfig: ConfigProviderContext = {
  size: ref('default'),
  zIndex: ref(2000),
  namespace: ref('dan'),
}

export const [provideConfig, injectConfig, configProviderContextKey] =
  createContext<ConfigProviderContext>('DanConfigProvider', defaultConfig)
