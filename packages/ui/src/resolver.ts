export interface ComponentInfo {
  name: string
  from: string
  sideEffects?: string | string[]
}

export interface ComponentResolverObject {
  type: 'component'
  resolve: (name: string) => ComponentInfo | undefined
}

export interface DanResolverOptions {
  /** Auto import `@dandan-ui/ui/style.css`. Default true. */
  importStyle?: boolean
}

/**
 * Resolver for `unplugin-vue-components`.
 * Matches component names starting with `Dan`, e.g. `DanButton`.
 */
export function DanUIResolver(
  options: DanResolverOptions = {},
): ComponentResolverObject {
  const { importStyle = true } = options

  return {
    type: 'component',
    resolve: (name: string) => {
      if (!name.startsWith('Dan')) return undefined
      return {
        name,
        from: '@dandan-ui/ui',
        sideEffects: importStyle ? '@dandan-ui/ui/style.css' : undefined,
      }
    },
  }
}

export default DanUIResolver
