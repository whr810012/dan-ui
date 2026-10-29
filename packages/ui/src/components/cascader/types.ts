export interface CascaderOption {
  value: string | number
  label: string
  disabled?: boolean
  children?: CascaderOption[]
}

export type CascaderPath = Array<string | number>
/** 单选为一条路径；多选为路径数组 */
export type CascaderModelValue = CascaderPath | CascaderPath[] | null

export function cascaderPathEqual(a: CascaderPath, b: CascaderPath) {
  return a.length === b.length && a.every((v, i) => v === b[i])
}

/** 将 v-model 规范为路径列表；非法形态返回空数组 */
export function normalizeCascaderPaths(
  value: CascaderModelValue | undefined,
  multiple: boolean,
): CascaderPath[] {
  if (value == null) return []
  if (!Array.isArray(value)) return []
  if (value.length === 0) return []
  if (multiple) {
    return Array.isArray(value[0]) ? (value as CascaderPath[]) : []
  }
  // 单选：必须是一条路径（元素为原始值，而非嵌套数组）
  if (Array.isArray(value[0])) return []
  return [value as CascaderPath]
}

