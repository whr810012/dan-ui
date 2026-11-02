<script setup>
import DemoBlock from '../.vitepress/components/DemoBlock.vue'
import Basic from './demos/menu/basic.vue'
import basicSrc from './demos/menu/basic.vue?raw'
import Accordion from './demos/menu/accordion.vue'
import accordionSrc from './demos/menu/accordion.vue?raw'
</script>

# Menu 菜单

为页面提供导航的菜单列表，可配合 Layout Aside 使用。

## 基础用法

<DemoBlock :source="basicSrc">
  <Basic />
</DemoBlock>

## 手风琴与展开动画

`unique-opened` 同时只展开一个子菜单；垂直模式子菜单带折叠高度动画，水平模式为淡入下拉。

<DemoBlock :source="accordionSrc">
  <Accordion />
</DemoBlock>

## Menu Props

| 属性 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| modelValue / v-model | 当前激活项 index | `string` | `''` |
| mode | 模式 | `'vertical' \| 'horizontal'` | `'vertical'` |
| defaultOpeneds | 默认展开的 SubMenu index | `string[]` | `[]` |
| openeds / v-model:openeds | 受控展开项 | `string[]` | — |
| collapse | 是否折叠（仅垂直模式） | `boolean` | `false` |
| uniqueOpened | 手风琴：同时只展开一个 | `boolean` | `false` |

## Menu Events

| 事件 | 说明 | 参数 |
|------|------|------|
| select | 选中菜单项 | `(index)` |
| open / close | 展开 / 收起子菜单 | `(index)` |
| update:openeds | 展开项变化 | `(openeds)` |

## MenuItem / SubMenu Props

| 属性 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| index | 唯一标识 | `string` | — |
| title | SubMenu 标题（也可用 `#title`） | `string` | `''` |
| disabled | 禁用 | `boolean` | `false` |
