import type { App, Plugin } from 'vue'

export type SFCWithInstall<T> = T & Plugin

export type SFCInstallWithContext<T> = SFCWithInstall<T> & {
  _context: App['_context'] | null
}

export function withInstall<T extends object, E extends Record<string, any>>(
  main: T,
  extra?: E,
  name?: string,
) {
  const comp = main as SFCWithInstall<T> & E
  comp.install = (app: App) => {
    const componentName =
      name ||
      (main as { name?: string }).name ||
      (main as { __name?: string }).__name
    if (componentName) {
      app.component(componentName, main)
    }
    if (extra) {
      for (const [key, component] of Object.entries(extra)) {
        app.component(key, component)
      }
    }
  }

  if (extra) {
    for (const [key, component] of Object.entries(extra)) {
      ;(comp as Record<string, unknown>)[key] = component
    }
  }

  return comp as SFCWithInstall<T> & E
}

export function withInstallFunction<T extends (...args: any[]) => any>(
  fn: T,
  name: string,
) {
  ;(fn as SFCInstallWithContext<T>).install = (app: App) => {
    ;(fn as SFCInstallWithContext<T>)._context = app._context
    app.config.globalProperties[name] = fn
  }
  return fn as SFCInstallWithContext<T>
}
