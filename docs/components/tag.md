<script setup>
import DemoBlock from '../.vitepress/components/DemoBlock.vue'
import Basic from './demos/tag/basic.vue'
import basicSrc from './demos/tag/basic.vue?raw'
import Hit from './demos/tag/hit.vue'
import hitSrc from './demos/tag/hit.vue?raw'
</script>

# Tag 标签

## 基础用法

<DemoBlock :source="basicSrc">
  <Basic />
</DemoBlock>

## 描边强调

`hit` 用当前文字色描边，突出标签。

<DemoBlock :source="hitSrc">
  <Hit />
</DemoBlock>

## Props

| 属性 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| type | 类型 | `'default' \| 'primary' \| 'success' \| 'warning' \| 'danger' \| 'info'` | `'default'` |
| size | 尺寸 | `'small' \| 'default' \| 'large'` | `'default'` |
| effect | 主题 | `'light' \| 'dark' \| 'plain'` | `'light'` |
| round | 圆角胶囊 | `boolean` | `false` |
| hit | 描边强调 | `boolean` | `false` |
| closable | 可关闭 | `boolean` | `false` |
| disabled | 禁用 | `boolean` | `false` |

## Events

| 事件 | 说明 | 参数 |
|------|------|------|
| click | 点击标签 | `(event)` |
| close | 点击关闭 | `(event)` |
