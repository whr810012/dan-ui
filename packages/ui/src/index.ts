import type { App, Plugin } from 'vue'
import * as components from './components'

export * from './components'

export { withInstall, withInstallFunction } from './utils/withInstall'
export type {
  SFCWithInstall,
  SFCInstallWithContext,
} from './utils/withInstall'
export { createContext } from './utils/createContext'
export type { CreateContextReturn } from './utils/createContext'

export { useNamespace, defaultNamespace } from './hooks/useNamespace'
export type { UseNamespaceReturn } from './hooks/useNamespace'

export {
  provideConfig,
  injectConfig,
  configProviderContextKey,
} from './hooks/useConfig'
export type { ConfigProviderContext, DanSize } from './hooks/useConfig'

export {
  provideForm,
  injectForm,
  formContextKey,
  provideFormItem,
  injectFormItem,
  formItemContextKey,
} from './hooks/useFormContext'
export type {
  FormContext,
  FormItemContext,
  FormRule,
  FormRules,
} from './hooks/useFormContext'
export { useFormItem } from './hooks/useFormItem'
export { validateValue } from './utils/validate'
export { getByPath, setByPath } from './utils/path'

export {
  provideChat,
  injectChat,
  chatContextKey,
} from './hooks/useChatContext'
export type {
  ChatContext,
  ChatMessageModel,
  ChatMessageStatus,
  ChatRole,
} from './hooks/useChatContext'

const DanUI: Plugin = {
  install(app: App) {
    for (const component of Object.values(components)) {
      if (
        component &&
        typeof component === 'object' &&
        'install' in component &&
        typeof (component as Plugin).install === 'function'
      ) {
        app.use(component as Plugin)
      }
    }
  },
}

export default DanUI
export { DanUI }
