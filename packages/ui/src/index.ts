import type { App, Plugin } from 'vue'

export { withInstall } from './utils/withInstall'
export type { SFCWithInstall } from './utils/withInstall'
export { useNamespace } from './hooks/useNamespace'
export type { UseNamespaceReturn } from './hooks/useNamespace'

const DanUI: Plugin = {
  install(_app: App) {
    // Components will be registered in later tasks.
  },
}

export default DanUI
export { DanUI }
