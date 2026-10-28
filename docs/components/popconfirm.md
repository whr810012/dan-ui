<script setup>
import DemoBlock from '../.vitepress/components/DemoBlock.vue'
import Basic from './demos/popconfirm/basic.vue'
import basicSrc from './demos/popconfirm/basic.vue?raw'
</script>

# Popconfirm 气泡确认

点击触发元素后弹出确认气泡，适合轻量二次确认。

## 基础用法

<DemoBlock :source="basicSrc">
  <Basic />
</DemoBlock>

## Props

| 属性 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| title | 标题文案 | `string` | `确定执行此操作？` |
| confirmText / cancelText | 按钮文案 | `string` | `确定` / `取消` |
| confirmType | 确定按钮类型 | Button `type` | `primary` |
| placement | 弹出位置 | `PopupPlacement` | `top` |
| visible / v-model:visible | 受控显示 | `boolean` | — |
| disabled | 禁用 | `boolean` | `false` |
| width | 面板宽度 | `string \| number` | `220` |

## Events

| 事件 | 说明 |
|------|------|
| confirm / cancel | 点击确定 / 取消 |
| show / hide | 面板显示 / 隐藏 |
