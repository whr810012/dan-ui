<script setup>
import DemoBlock from '../.vitepress/components/DemoBlock.vue'
import Basic from './demos/float-button/basic.vue'
import basicSrc from './demos/float-button/basic.vue?raw'
</script>

# FloatButton 悬浮按钮

固定在视口角落的快捷操作按钮；可用 `DanFloatButtonGroup` 组合展开。

## 基础用法

<DemoBlock :source="basicSrc">
  <Basic />
</DemoBlock>

## Props

| 属性 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| type | 类型 | `default \| primary` | `default` |
| shape | 形状 | `circle \| square` | `circle` |
| icon | 图标名 | `IconName` | `plus` |
| href / target | 链接模式 | `string` | — |
| badge | 徽标 | `number \| string` | — |
| bottom / right | 偏移 | `number \| string` | `40` |
