export interface LocaleMessages {
  name: string
  empty: {
    description: string
  }
  common: {
    confirm: string
    cancel: string
    clear: string
    loading: string
    close: string
  }
  table: {
    emptyText: string
    columnSettings: string
    summary: string
    filterClear: string
    filterPlaceholder: string
    filterSelectPlaceholder: string
    loading: string
  }
  select: {
    empty: string
    placeholder: string
  }
  cascader: {
    placeholder: string
  }
  treeSelect: {
    placeholder: string
  }
  pagination: {
    /** 支持 `{total}` 占位 */
    total: string
    prev: string
    next: string
  }
  dialog: {
    confirm: string
    cancel: string
  }
  popconfirm: {
    title: string
    confirm: string
    cancel: string
  }
  datePicker: {
    placeholder: string
    startPlaceholder: string
    endPlaceholder: string
    today: string
    thisMonth: string
    thisYear: string
    thisWeek: string
    confirm: string
    pickStart: string
    pickEnd: string
    adjustTime: string
  }
  formList: {
    add: string
    remove: string
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
  agentSteps: {
    title: string
    empty: string
    pending: string
    running: string
    done: string
    error: string
    skipped: string
  }
  toolCallCard: {
    pending: string
    running: string
    done: string
    error: string
    empty: string
    streaming: string
  }
  promptLibrary: {
    empty: string
    all: string
  }
  mediaPreview: {
    open: string
    pdfHint: string
    fileHint: string
    attachment: string
  }
  infiniteList: {
    loading: string
    finished: string
  }
}
