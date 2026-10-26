<script setup>
import DemoBlock from '../.vitepress/components/DemoBlock.vue'
import Basic from './demos/card/basic.vue'
import basicSrc from './demos/card/basic.vue?raw'
</script>

# Card 卡片

承载一块相对独立的内容。

## 基础用法

<DemoBlock :source="basicSrc">
  <Basic />
</DemoBlock>

## Props

| 属性 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| header | 标题文案 | `string` | `''` |
| shadow | 阴影时机 | `'always' \| 'hover' \| 'never'` | `'always'` |
| bodyStyle | 内容区样式 | `Record<string, string>` | `{}` |

## Slots

| 插槽 | 说明 |
|------|------|
| default | 正文 |
| header | 自定义标题 |
| cover | 封面（通常放图片） |
| footer | 底部操作区 |
