<script setup>
import DemoBlock from '../.vitepress/components/DemoBlock.vue'
import Basic from './demos/dropdown/basic.vue'
import basicSrc from './demos/dropdown/basic.vue?raw'
import Triggers from './demos/dropdown/triggers.vue'
import triggersSrc from './demos/dropdown/triggers.vue?raw'
</script>

# Dropdown 下拉菜单

将一组操作收纳到弹出菜单中，适合作为表格「列设置」等入口。

## 基础用法

<DemoBlock :source="basicSrc">
  <Basic />
</DemoBlock>

## 触发方式

支持 `click` / `hover` / `focus` / `contextmenu`，可用 `showAfter` / `hideAfter` 控制延时。

<DemoBlock :source="triggersSrc">
  <Triggers />
</DemoBlock>

## Dropdown Props

| 属性 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| trigger | 触发方式 | `'click' \| 'hover' \| 'focus' \| 'contextmenu'` | `'click'` |
| placement | 菜单位置 | `'top' \| 'bottom' \| 'left' \| 'right'` | `'bottom'` |
| disabled | 是否禁用 | `boolean` | `false` |
| hideOnClick | 点击菜单项后是否关闭 | `boolean` | `true` |
| showAfter / hideAfter | 延时（ms，hover / focus） | `number` | `100` |
| offset | 间距 | `number` | `8` |

## Dropdown Events

| 事件 | 说明 |
|------|------|
| command | 点击菜单项，参数为 `command` |
| visibleChange | 显隐变化 |

## DropdownItem Props

| 属性 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| command | 指令值 | `string \| number \| object` | `''` |
| disabled | 禁用 | `boolean` | `false` |
| divided | 顶部分割线 | `boolean` | `false` |
