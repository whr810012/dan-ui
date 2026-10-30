<script setup>
import DemoBlock from '../.vitepress/components/DemoBlock.vue'
import Basic from './demos/popconfirm/basic.vue'
import basicSrc from './demos/popconfirm/basic.vue?raw'
import Triggers from './demos/popconfirm/triggers.vue'
import triggersSrc from './demos/popconfirm/triggers.vue?raw'
</script>

# Popconfirm 气泡确认

点击触发元素后弹出确认气泡，适合轻量二次确认。触发方式与延时对齐 Popover。

## 基础用法

<DemoBlock :source="basicSrc">
  <Basic />
</DemoBlock>

## 触发方式

支持 `click` / `hover` / `focus` / `contextmenu`，可用 `showAfter` / `hideAfter` 控制延时。`hover` 时移入面板不会立刻关闭，便于点确认。

<DemoBlock :source="triggersSrc">
  <Triggers />
</DemoBlock>

## Props

| 属性 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| title | 标题文案 | `string` | locale |
| confirmText / cancelText | 按钮文案 | `string` | locale |
| confirmType | 确定按钮类型 | Button `type` | `primary` |
| placement | 弹出位置 | `PopupPlacement` | `top` |
| trigger | 触发方式 | `'click' \| 'hover' \| 'focus' \| 'contextmenu'` | `'click'` |
| showAfter / hideAfter | 延时（ms，hover / focus） | `number` | `100` |
| visible / v-model:visible | 受控显示 | `boolean` | — |
| disabled | 禁用 | `boolean` | `false` |
| width | 面板宽度 | `string \| number` | `220` |
| offset | 间距 | `number` | `8` |

## Events

| 事件 | 说明 |
|------|------|
| confirm / cancel | 点击确定 / 取消 |
| show / hide | 面板显示 / 隐藏 |
