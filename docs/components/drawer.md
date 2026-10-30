<script setup>
import DemoBlock from '../.vitepress/components/DemoBlock.vue'
import Basic from './demos/drawer/basic.vue'
import basicSrc from './demos/drawer/basic.vue?raw'
import Resizable from './demos/drawer/resizable.vue'
import resizableSrc from './demos/drawer/resizable.vue?raw'
</script>

# Drawer 抽屉

从屏幕边缘滑出的面板，适合表单与详情。

## 基础用法

<DemoBlock :source="basicSrc">
  <Basic />
</DemoBlock>

## 可调整尺寸

`resizable` 可拖拽边缘改宽/高；配合 `v-model:size`。`destroyOnClose` 关闭后销毁内容。

<DemoBlock :source="resizableSrc">
  <Resizable />
</DemoBlock>

## Props

| 属性 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| modelValue / v-model | 是否显示 | `boolean` | `false` |
| title | 标题 | `string` | `''` |
| size / v-model:size | 宽度或高度 | `string` | `'30%'` |
| direction | 方向 | `'rtl' \| 'ltr' \| 'ttb' \| 'btt'` | `'rtl'` |
| resizable | 拖拽边缘调整尺寸 | `boolean` | `false` |
| minSize | 最小尺寸（px） | `number` | `200` |
| showClose | 显示关闭按钮 | `boolean` | `true` |
| closeOnClickModal | 点击遮罩关闭 | `boolean` | `true` |
| closeOnPressEscape | Esc 关闭 | `boolean` | `true` |
| destroyOnClose | 关闭后销毁 | `boolean` | `false` |
| withHeader | 是否显示头部 | `boolean` | `true` |

## Events

| 事件 | 说明 |
|------|------|
| open / close | 打开 / 关闭 |
| size-change | 拖拽调整尺寸结束 |
| update:modelValue / update:size | v-model |
