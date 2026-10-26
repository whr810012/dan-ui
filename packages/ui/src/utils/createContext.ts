import { inject, provide, type InjectionKey } from 'vue'

export type CreateContextReturn<T> = readonly [
  (value: T) => T,
  (fallback?: T) => T,
  InjectionKey<T>,
]

/**
 * Create a typed provide/inject pair.
 * Used by ConfigProvider / Form / Chat contexts.
 */
export function createContext<T>(
  contextName: string,
  defaultValue?: T,
): CreateContextReturn<T> {
  const key: InjectionKey<T> = Symbol(contextName)

  const provideContext = (value: T) => {
    provide(key, value)
    return value
  }

  const injectContext = (fallback?: T): T => {
    const resolved = inject(key, fallback ?? defaultValue)
    if (resolved === undefined) {
      throw new Error(
        `[dan-ui] <${contextName}> was not provided. Wrap with the matching Provider.`,
      )
    }
    return resolved
  }

  return [provideContext, injectContext, key] as const
}
