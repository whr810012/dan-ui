<script setup>
import DemoBlock from '../.vitepress/components/DemoBlock.vue'
import Basic from './demos/menu/basic.vue'
import basicSrc from './demos/menu/basic.vue?raw'
</script>

# Menu 菜单

为页面提供导航的菜单列表，可配合 Layout Aside 使用。

## 基础用法

<DemoBlock :source="basicSrc">
  <Basic />
</DemoBlock>

## Menu Props

| 属性 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| modelValue / v-model | 当前激活项 index | `string` | `''` |
| mode | 模式 | `'vertical' \| 'horizontal'` | `'vertical'` |
| defaultOpeneds | 默认展开的 SubMenu index | `string[]` | `[]` |
| collapse | 是否折叠（仅垂直模式） | `boolean` | `false` |

## Menu Events

| 事件 | 说明 | 参数 |
|------|------|------|
| select | 选中菜单项 | `(index)` |
| open / close | 展开 / 收起子菜单 | `(index)` |

## MenuItem / SubMenu Props

| 属性 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| index | 唯一标识 | `string` | — |
| title | SubMenu 标题（也可用 `#title`） | `string` | `''` |
| disabled | 禁用 | `boolean` | `false` |
