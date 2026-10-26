<script setup>
import DemoBlock from '../.vitepress/components/DemoBlock.vue'
import Basic from './demos/pagination/basic.vue'
import basicSrc from './demos/pagination/basic.vue?raw'
</script>

# Pagination 分页

当数据量过多时，使用分页分隔浏览。

## 基础用法

<DemoBlock :source="basicSrc">
  <Basic />
</DemoBlock>

## Pagination Props

| 属性 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| total | 总条目数 | `number` | `0` |
| pageSize | 每页条数 | `number` | `10` |
| currentPage / v-model:currentPage | 当前页 | `number` | `1` |
| pagerCount | 页码按钮数量 | `number` | `7` |
| layout | 布局，逗号分隔 | `string` | `'prev, pager, next, total'` |
| background | 是否带背景色 | `boolean` | `false` |
| disabled | 禁用 | `boolean` | `false` |

## Pagination Events

| 事件 | 说明 | 参数 |
|------|------|------|
| current-change | 当前页改变时 | `(page)` |
