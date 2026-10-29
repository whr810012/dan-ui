export interface LocaleMessages {
  name: string
  empty: {
    description: string
  }
  table: {
    emptyText: string
    columnSettings: string
    summary: string
    filterClear: string
    filterPlaceholder: string
    filterSelectPlaceholder: string
  }
  select: {
    empty: string
  }
  pagination: {
    /** 支持 `{total}` 占位 */
    total: string
    prev: string
    next: string
  }
  tour: {
    skip: string
    prev: string
    next: string
    finish: string
  }
  conversationList: {
    empty: string
  }
}
