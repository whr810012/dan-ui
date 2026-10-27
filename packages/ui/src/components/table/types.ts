export type TableAlign = 'left' | 'center' | 'right'

export interface TableFilterOption {
  label: string
  value: string | number
}

export interface TableColumnFilter {
  type?: 'text' | 'select'
  options?: TableFilterOption[]
}

export interface TableColumn {
  /** 叶子列必填；分组列可省略 */
  prop?: string
  label: string
  width?: string | number
  minWidth?: string | number
  align?: TableAlign
  sortable?: boolean
  /** false 关闭；true 默认文本筛选；或自定义配置（仅叶子列） */
  filterable?: boolean | TableColumnFilter
  /** 是否允许被「列设置」隐藏，默认 true（仅叶子列） */
  hideable?: boolean
  /** 初始是否显示，默认 true（仅叶子列） */
  visible?: boolean
  /** 多级表头子列 */
  children?: TableColumn[]
}

export type TableRow = Record<string, unknown>

export type TableFilters = Record<string, string | number | null | undefined>

export type TableSortOrder = 'asc' | 'desc' | null

export interface TableSortState {
  prop: string | null
  order: TableSortOrder
}
