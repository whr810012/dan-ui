---
title: Table 表格
description: Vue 3 中后台表格：筛选、列显隐、固定列、多选、展开行、合计、树表与虚拟滚动。
---

<script setup>
import DemoBlock from '../.vitepress/components/DemoBlock.vue'
import Basic from './demos/table/basic.vue'
import MultiHeader from './demos/table/multi-header.vue'
import TreeDemo from './demos/table/tree.vue'
import VirtualDemo from './demos/table/virtual.vue'
import FixedDemo from './demos/table/fixed.vue'
import SelectionDemo from './demos/table/selection.vue'
import ExpandableDemo from './demos/table/expandable.vue'
import SummaryDemo from './demos/table/summary.vue'
import ResizeDragDemo from './demos/table/resize-drag.vue'
import basicSrc from './demos/table/basic.vue?raw'
import multiHeaderSrc from './demos/table/multi-header.vue?raw'
import treeSrc from './demos/table/tree.vue?raw'
import virtualSrc from './demos/table/virtual.vue?raw'
import fixedSrc from './demos/table/fixed.vue?raw'
import selectionSrc from './demos/table/selection.vue?raw'
import expandableSrc from './demos/table/expandable.vue?raw'
import summarySrc from './demos/table/summary.vue?raw'
import resizeDragSrc from './demos/table/resize-drag.vue?raw'
</script>

# Table 表格

基础数据表格：筛选、列设置、多级表头、树形、虚拟滚动、固定列、多选、展开行、合计。

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

## 树形数据

设置 `tree`，行数据通过 `children`（可用 `treeChildren` 自定义）嵌套；展开图标显示在第一列。

<DemoBlock :source="treeSrc">
  <TreeDemo />
</DemoBlock>

## 虚拟滚动

大数据量时开启 `virtual`，需提供容器 `height` 与定高 `rowHeight`（不支持动态行高）。

<DemoBlock :source="virtualSrc">
  <VirtualDemo />
</DemoBlock>

## 固定列

叶子列设置 `fixed: 'left' | 'right'`。建议同时给出 `width`，以便正确计算粘滞偏移。

<DemoBlock :source="fixedSrc">
  <FixedDemo />
</DemoBlock>

## 行多选

开启 `selection`，可用 `v-model:selected-row-keys` 受控。树表场景仅对当前可见扁平行勾选。

<DemoBlock :source="selectionSrc">
  <SelectionDemo />
</DemoBlock>

## 展开行

`expandable` 提供内容展开列，与 `tree` 的节点展开分开；详情写在 `#expand` 插槽。

<DemoBlock :source="expandableSrc">
  <ExpandableDemo />
</DemoBlock>

## 合计行

`show-summary` 默认对 number 列求和；可用 `summary-method` 自定义。

<DemoBlock :source="summarySrc">
  <SummaryDemo />
</DemoBlock>

## 列宽与行拖拽

拖拽表头右缘调整列宽（叶子列，`resizable: false` 可关闭）；开启 `row-draggable` 显示行手柄，在 `row-drag-end` 中按 `keys` 重排数据。树表不支持行拖拽；分组表头仅叶子列可调宽。

<DemoBlock :source="resizeDragSrc">
  <ResizeDragDemo />
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
| tree | 启用树形表格 | `boolean` | `false` |
| treeChildren | 子节点字段名 | `string` | `'children'` |
| defaultExpandAll | 默认展开全部 | `boolean` | `false` |
| expandRowKeys | 受控展开行 key | `(string \| number)[]` | — |
| indent | 树节点每级缩进（px） | `number` | `16` |
| virtual | 启用虚拟滚动 | `boolean` | `false` |
| height | 虚拟滚动容器高度 | `number \| string` | `400` |
| rowHeight | 虚拟行高（px） | `number` | `48` |
| virtualBuffer | 视口外缓冲行数 | `number` | `5` |
| selection | 行多选 | `boolean` | `false` |
| selectedRowKeys | 受控选中行 key | `(string \| number)[]` | — |
| reserveSelection | 数据变更后保留选中（非受控） | `boolean` | `false` |
| expandable | 内容展开行 | `boolean` | `false` |
| expandedRowKeys | 受控内容展开 key | `(string \| number)[]` | — |
| showSummary | 合计行 | `boolean` | `false` |
| summaryMethod | 自定义合计 | `( { columns, data } ) => Record<string, string>` | — |
| rowDraggable | 行拖拽排序（树表无效） | `boolean` | `false` |

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
| fixed | 固定列 `'left' \| 'right'`（叶子列） |
| editable | 可编辑单元格（叶子列） |
| draggable | 是否可拖列序，默认允许（固定列除外） |
| resizable | 是否可拖列宽，默认 `true`（叶子列） |

## Events

| 事件 | 说明 |
|------|------|
| update:filters / filter-change | 筛选变化 |
| update:visibleColumns / column-visibility-change | 列显隐变化 |
| sort-change | `{ prop, order }` |
| update:expandRowKeys / expand-change | 树节点展开变化 |
| update:selectedRowKeys / selection-change | 多选变化；`selection-change` 参数 `(keys, rows)` |
| update:expandedRowKeys / expandable-change | 内容展开行变化 |
| cell-edit | 可编辑提交 `{ row, prop, value, index }` |
| column-drag-end | 列序变化，参数为 prop 数组 |
| column-resize-end | 列宽变化 `{ prop, width }` |
| row-drag-end | 行序变化 `{ from, to, keys }` |

## Slots

| 插槽 | 说明 |
|------|------|
| `[prop]` | 自定义单元格，参数 `{ row, column, index }` |
| expand | 内容展开区，参数 `{ row, index }`（需 `expandable`） |
