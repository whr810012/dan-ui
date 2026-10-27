<script setup>
import DemoBlock from '../.vitepress/components/DemoBlock.vue'
import Basic from './demos/table/basic.vue'
import MultiHeader from './demos/table/multi-header.vue'
import basicSrc from './demos/table/basic.vue?raw'
import multiHeaderSrc from './demos/table/multi-header.vue?raw'
</script>

# Table 表格

基础数据表格，支持**列筛选**、**列显示/隐藏**与**多级表头**。

## 基础用法

表头漏斗可筛选；右上角「列设置」可勾选显示列；点击可排序列表头切换升序 / 降序 / 取消。

<DemoBlock :source="basicSrc">
  <Basic />
</DemoBlock>

## 多级表头

通过 `columns[].children` 嵌套分组；排序 / 筛选 / 列设置仅作用于叶子列。

<DemoBlock :source="multiHeaderSrc">
  <MultiHeader />
</DemoBlock>

## Props

| 属性 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| data | 行数据 | `TableRow[]` | `[]` |
| columns | 列配置 | `TableColumn[]` | `[]` |
| rowKey | 行键 | `string \| (row, index) => string \| number` | `'id'` |
| border | 边框 | `boolean` | `false` |
| stripe | 斑马纹 | `boolean` | `false` |
| emptyText | 空文案 | `string` | `'暂无数据'` |
| showColumnSettings | 列设置入口；默认有 hideable 列时显示 | `boolean` | — |
| filters | 受控筛选条件 | `TableFilters` | — |
| visibleColumns | 受控可见列 `prop` 列表 | `string[]` | — |
| filterMode | `local` 本地过滤 / `remote` 只抛事件 | `'local' \| 'remote'` | `'local'` |

## TableColumn

| 字段 | 说明 |
|------|------|
| prop / label | 字段名（叶子列必填）/ 表头 |
| children | 多级表头子列；有 children 时为分组列 |
| width / minWidth / align | 尺寸与对齐 |
| sortable | 是否可排序（叶子列） |
| filterable | `true` 文本筛选，或 `{ type: 'text' \| 'select', options? }`（叶子列） |
| hideable | 是否可在列设置中隐藏，默认 `true`（叶子列） |
| visible | 初始是否显示，默认 `true`（叶子列） |

## Events

| 事件 | 说明 |
|------|------|
| update:filters / filter-change | 筛选变化 |
| update:visibleColumns / column-visibility-change | 列显隐变化 |
| sort-change | `{ prop, order }` |

## Slots

| 插槽 | 说明 |
|------|------|
| `[prop]` | 自定义单元格，参数 `{ row, column, index }` |
