<script setup>
import DemoBlock from '../.vitepress/components/DemoBlock.vue'
import Basic from './demos/alert/basic.vue'
import basicSrc from './demos/alert/basic.vue?raw'
import Extra from './demos/alert/extra.vue'
import extraSrc from './demos/alert/extra.vue?raw'
</script>

# Alert 警告

## 基础用法

<DemoBlock :source="basicSrc">
  <Basic />
</DemoBlock>

## 居中与自定义关闭文案

`center` 居中标题与描述；`closeText` 显示文字关闭按钮（同时隐含可关闭）。

<DemoBlock :source="extraSrc">
  <Extra />
</DemoBlock>

## Props

| 属性 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| title | 标题 | `string` | — |
| type | 类型 | `'success' \| 'warning' \| 'info' \| 'error'` | `'info'` |
| description | 描述文案 | `string` | — |
| closable | 是否可关闭 | `boolean` | `false` |
| closeText | 关闭按钮文案；有值时显示文字 | `string` | — |
| showIcon | 是否显示图标 | `boolean` | `true` |
| center | 内容居中 | `boolean` | `false` |
| effect | 主题 | `'light' \| 'dark'` | `'light'` |

## Events

| 事件 | 说明 | 参数 |
|------|------|------|
| close | 关闭时触发 | `(event)` |

## Slots

| 插槽 | 说明 |
|------|------|
| default | 描述内容 |
| title | 自定义标题 |
