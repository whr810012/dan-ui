<script setup>
import DemoBlock from '../.vitepress/components/DemoBlock.vue'
import Basic from './demos/pagination/basic.vue'
import basicSrc from './demos/pagination/basic.vue?raw'
import Advanced from './demos/pagination/advanced.vue'
import advancedSrc from './demos/pagination/advanced.vue?raw'
</script>

# Pagination 分页

当数据量过多时，使用分页分隔浏览。

## 基础用法

`background` 可为页码按钮铺底。

<DemoBlock :source="basicSrc">
  <Basic />
</DemoBlock>

## 每页条数与跳转

`layout` 可组合 `sizes` / `jumper`；配合 `v-model:page-size` 与 `pageSizes`。

<DemoBlock :source="advancedSrc">
  <Advanced />
</DemoBlock>

## Pagination Props

| 属性 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| total | 总条目数 | `number` | `0` |
| pageSize / v-model:pageSize | 每页条数 | `number` | `10` |
| currentPage / v-model:currentPage | 当前页 | `number` | `1` |
| pageSizes | 每页条数候选项 | `number[]` | `[10, 20, 50, 100]` |
| pagerCount | 页码按钮数量 | `number` | `7` |
| layout | 布局，逗号分隔：`prev` / `pager` / `next` / `total` / `sizes` / `jumper` | `string` | `'prev, pager, next, total'` |
| background | 是否带背景色 | `boolean` | `false` |
| disabled | 禁用 | `boolean` | `false` |

## Pagination Events

| 事件 | 说明 | 参数 |
|------|------|------|
| current-change | 当前页改变时 | `(page)` |
| size-change | 每页条数改变时 | `(size)` |
