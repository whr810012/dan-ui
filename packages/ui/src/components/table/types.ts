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
  prop: string
  label: string
  width?: string | number
  minWidth?: string | number
  align?: TableAlign
  sortable?: boolean
  /** false 关闭；true 默认文本筛选；或自定义配置 */
  filterable?: boolean | TableColumnFilter
  /** 是否允许被「列设置」隐藏，默认 true */
  hideable?: boolean
  /** 初始是否显示，默认 true */
  visible?: boolean
}

export type TableRow = Record<string, unknown>

export type TableFilters = Record<string, string | number | null | undefined>

export type TableSortOrder = 'asc' | 'desc' | null

export interface TableSortState {
  prop: string | null
  order: TableSortOrder
}
