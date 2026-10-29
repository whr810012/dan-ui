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
  /** 固定列（仅叶子列） */
  fixed?: 'left' | 'right'
  /** 是否可编辑（仅叶子列） */
  editable?: boolean
  /** 是否允许拖拽调整列序（仅叶子列；固定列默认不可拖） */
  draggable?: boolean
  /** 是否允许拖拽调整列宽（仅叶子列；默认 true） */
  resizable?: boolean
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

/** 多列排序项（prop 必填） */
export interface TableSortItem {
  prop: string
  order: 'asc' | 'desc'
}
