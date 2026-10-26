import type { App, Plugin } from 'vue'

export type SFCWithInstall<T> = T & Plugin

export function withInstall<T extends object>(component: T, name?: string) {
  const comp = component as SFCWithInstall<T>
  comp.install = (app: App) => {
    const componentName =
      name ||
      (component as { name?: string }).name ||
      (component as { __name?: string }).__name
    if (componentName) {
      app.component(componentName, component)
    }
  }
  return comp
}
