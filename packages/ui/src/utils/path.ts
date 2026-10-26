export function getByPath(target: unknown, path?: string): unknown {
  if (!path) return undefined
  if (target == null) return undefined
  const segments = path.split('.').filter(Boolean)
  let current: any = target
  for (const segment of segments) {
    if (current == null) return undefined
    current = current[segment]
  }
  return current
}

export function setByPath(
  target: Record<string, unknown>,
  path: string,
  value: unknown,
) {
  const segments = path.split('.').filter(Boolean)
  if (!segments.length) return
  let current: any = target
  for (let i = 0; i < segments.length - 1; i += 1) {
    const key = segments[i]
    if (current[key] == null || typeof current[key] !== 'object') {
      current[key] = {}
    }
    current = current[key]
  }
  current[segments[segments.length - 1]] = value
}
