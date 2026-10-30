<script setup>
import DemoBlock from '../.vitepress/components/DemoBlock.vue'
import Basic from './demos/tabs/basic.vue'
import basicSrc from './demos/tabs/basic.vue?raw'
import Card from './demos/tabs/card.vue'
import cardSrc from './demos/tabs/card.vue?raw'
import Editable from './demos/tabs/editable.vue'
import editableSrc from './demos/tabs/editable.vue?raw'
</script>

# Tabs 标签页

分隔内容上等同层级的视图。

## 基础用法

<DemoBlock :source="basicSrc">
  <Basic />
</DemoBlock>

## 卡片样式

<DemoBlock :source="cardSrc">
  <Card />
</DemoBlock>

## 动态增减

`editable`（或分别设置 `closable` / `addable`）后，由业务侧维护 pane 列表；关闭/新增通过事件回调处理。单页可用 `TabPane.closable` 覆盖。

<DemoBlock :source="editableSrc">
  <Editable />
</DemoBlock>

## Tabs Props

| 属性 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| modelValue / v-model | 当前激活 tab 的 name | `string \| number` | — |
| type | 风格 | `'line' \| 'card'` | `'line'` |
| closable | 显示关闭按钮 | `boolean` | `false` |
| addable | 显示新增按钮 | `boolean` | `false` |
| editable | 等价于 `closable` + `addable` | `boolean` | `false` |

## Tabs Events

| 事件 | 说明 | 参数 |
|------|------|------|
| change | 激活项变化时 | `(name)` |
| tabClick | 点击 tab 时 | `(name)` |
| tabRemove | 点击关闭时 | `(name)` |
| tabAdd | 点击新增时 | `()` |
| edit | 新增或关闭时 | `(name \| null, 'add' \| 'remove')` |

## TabPane Props

| 属性 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| name | 唯一标识 | `string \| number` | — |
| label | 标题 | `string` | `''` |
| disabled | 禁用 | `boolean` | `false` |
| closable | 覆盖 Tabs 级关闭能力 | `boolean` | — |
