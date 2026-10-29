<script setup>
import DemoBlock from '../.vitepress/components/DemoBlock.vue'
import Basic from './demos/tree/basic.vue'
import Drag from './demos/tree/drag.vue'
import basicSrc from './demos/tree/basic.vue?raw'
import dragSrc from './demos/tree/drag.vue?raw'
</script>

# Tree 树形控件

展示层级数据，支持展开、勾选与拖拽排序。

## 基础用法

<DemoBlock :source="basicSrc">
  <Basic />
</DemoBlock>

## 拖拽

开启 `draggable`；在 `node-drag-end` 中用返回的 `data` 更新树。投放位置：上沿 before、下沿 after、中间 inner。可用 `allowDrag` / `allowDrop` 限制。

<DemoBlock :source="dragSrc">
  <Drag />
</DemoBlock>

## Props

| 属性 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| data | 树数据 | `TreeNode[]` | `[]` |
| defaultExpandAll | 默认展开全部 | `boolean` | `false` |
| showCheckbox | 显示复选框 | `boolean` | `false` |
| checkedKeys | 勾选 key（可 `v-model`） | `(string \| number)[]` | `[]` |
| draggable | 允许拖拽 | `boolean` | `false` |
| allowDrag | 是否允许拖起某节点 | `(node) => boolean` | — |
| allowDrop | 是否允许投放 | `(drag, drop, type) => boolean` | — |

## Events

| 事件 | 说明 |
|------|------|
| node-click | 点击节点 |
| update:checkedKeys / check | 勾选变化 |
| node-drag-end | `{ dragNode, dropNode, dropType, data }` |
