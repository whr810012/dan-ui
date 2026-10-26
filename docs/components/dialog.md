<script setup>
import DemoBlock from '../.vitepress/components/DemoBlock.vue'
import Basic from './demos/dialog/basic.vue'
import basicSrc from './demos/dialog/basic.vue?raw'
</script>

# Dialog 对话框

模态对话框，适合确认与简短表单。

## 基础用法

<DemoBlock :source="basicSrc">
  <Basic />
</DemoBlock>

## Props

| 属性 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| modelValue / v-model | 是否显示 | `boolean` | `false` |
| title | 标题 | `string` | `''` |
| width | 宽度 | `string` | `'480px'` |
| top | 距顶部距离 | `string` | `'15vh'` |
| showClose | 显示关闭按钮 | `boolean` | `true` |
| closeOnClickModal | 点击遮罩关闭 | `boolean` | `true` |
| closeOnPressEscape | Esc 关闭 | `boolean` | `true` |
| showCancel / showConfirm | 底部按钮 | `boolean` | `true` |
| cancelText / confirmText | 按钮文案 | `string` | `取消` / `确定` |
| confirmLoading | 确认按钮加载 | `boolean` | `false` |

## Events

`open` / `close` / `cancel` / `confirm` / `update:modelValue`
