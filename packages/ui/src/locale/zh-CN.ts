import type { LocaleMessages } from './types'

const zhCN: LocaleMessages = {
  name: 'zh-CN',
  empty: {
    description: '暂无数据',
    search: '没有找到相关结果',
    network: '网络异常，请稍后重试',
    permission: '暂无访问权限',
  },
  common: {
    confirm: '确定',
    cancel: '取消',
    clear: '清空',
    loading: '加载中…',
    close: '关闭',
  },
  table: {
    emptyText: '暂无数据',
    columnSettings: '列设置',
    summary: '合计',
    filterClear: '清除',
    filterPlaceholder: '输入关键词',
    filterSelectPlaceholder: '请选择',
    loading: '加载中…',
  },
  select: {
    empty: '暂无数据',
    placeholder: '请选择',
  },
  cascader: {
    placeholder: '请选择',
  },
  treeSelect: {
    placeholder: '请选择',
  },
  pagination: {
    total: '共 {total} 条',
    prev: '上一页',
    next: '下一页',
  },
  dialog: {
    confirm: '确定',
    cancel: '取消',
  },
  popconfirm: {
    title: '确定执行此操作？',
    confirm: '确定',
    cancel: '取消',
  },
  datePicker: {
    placeholder: '选择日期',
    startPlaceholder: '开始日期',
    endPlaceholder: '结束日期',
    today: '今天',
    thisMonth: '本月',
    thisYear: '今年',
    thisWeek: '本周',
    confirm: '确定',
    pickStart: '请选择开始日期',
    pickEnd: '请选择结束日期',
    adjustTime: '可调整时间后确认',
  },
  formList: {
    add: '添加一项',
    remove: '删除',
  },
  tour: {
    skip: '跳过',
    prev: '上一步',
    next: '下一步',
    finish: '完成',
  },
  conversationList: {
    empty: '暂无会话',
  },
  agentSteps: {
    title: '执行计划',
    empty: '暂无步骤',
    pending: '待执行',
    running: '进行中',
    done: '完成',
    error: '失败',
    skipped: '跳过',
  },
  toolCallCard: {
    pending: '等待',
    running: '运行中',
    done: '完成',
    error: '错误',
    empty: '暂无参数',
    streaming: '流式中…',
  },
  promptLibrary: {
    empty: '暂无模板',
    all: '全部',
  },
  mediaPreview: {
    open: '打开',
    pdfHint: 'PDF 预览由业务侧嵌入或新开',
    fileHint: '通用文件占位',
    attachment: '附件',
  },
  infiniteList: {
    loading: '加载中…',
    finished: '没有更多了',
  },
}

export default zhCN
