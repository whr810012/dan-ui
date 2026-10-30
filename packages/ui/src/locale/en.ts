import type { LocaleMessages } from './types'

const en: LocaleMessages = {
  name: 'en',
  empty: {
    description: 'No data',
    search: 'No matching results',
    network: 'Network error, please try again',
    permission: 'No access permission',
  },
  common: {
    confirm: 'OK',
    cancel: 'Cancel',
    clear: 'Clear',
    loading: 'Loading…',
    close: 'Close',
  },
  table: {
    emptyText: 'No data',
    columnSettings: 'Columns',
    summary: 'Total',
    filterClear: 'Clear',
    filterConfirm: 'Filter',
    filterReset: 'Reset',
    filterPlaceholder: 'Keyword',
    filterSelectPlaceholder: 'Select',
    filterEmptyText: 'No matching results',
    filterEmptyClear: 'Clear filters',
    loading: 'Loading…',
  },
  select: {
    empty: 'No data',
    placeholder: 'Select',
  },
  cascader: {
    placeholder: 'Select',
  },
  treeSelect: {
    placeholder: 'Select',
  },
  pagination: {
    total: '{total} in total',
    prev: 'Prev',
    next: 'Next',
    goto: 'Go to',
    pageClassifier: '',
    pageSize: '{size}/page',
  },
  dialog: {
    confirm: 'OK',
    cancel: 'Cancel',
  },
  popconfirm: {
    title: 'Are you sure?',
    confirm: 'OK',
    cancel: 'Cancel',
  },
  datePicker: {
    placeholder: 'Pick a date',
    startPlaceholder: 'Start date',
    endPlaceholder: 'End date',
    today: 'Today',
    thisMonth: 'This month',
    thisYear: 'This year',
    thisWeek: 'This week',
    confirm: 'OK',
    pickStart: 'Select start date',
    pickEnd: 'Select end date',
    adjustTime: 'Adjust time then confirm',
  },
  formList: {
    add: 'Add item',
    remove: 'Remove',
  },
  tour: {
    skip: 'Skip',
    prev: 'Previous',
    next: 'Next',
    finish: 'Done',
  },
  conversationList: {
    empty: 'No conversations',
  },
  agentSteps: {
    title: 'Plan',
    empty: 'No steps',
    pending: 'Pending',
    running: 'Running',
    done: 'Done',
    error: 'Failed',
    skipped: 'Skipped',
  },
  toolCallCard: {
    pending: 'Pending',
    running: 'Running',
    done: 'Done',
    error: 'Error',
    empty: 'No payload',
    streaming: 'Streaming…',
  },
  promptLibrary: {
    empty: 'No templates',
    all: 'All',
  },
  mediaPreview: {
    open: 'Open',
    pdfHint: 'Embed or open PDF in your app',
    fileHint: 'File placeholder',
    attachment: 'Attachment',
  },
  infiniteList: {
    loading: 'Loading…',
    finished: 'No more',
  },
  upload: {
    select: 'Select file',
    dragText: 'Drop file here, or click to upload',
    dragActive: 'Release to upload',
    limitHint: 'Up to {limit} files',
    acceptHint: 'Accepted: {accept}',
    cardAdd: 'Upload',
  },
}

export default en
