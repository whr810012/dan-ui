<script setup>
import DemoBlock from '../.vitepress/components/DemoBlock.vue'
import Basic from './demos/stream-text/basic.vue'
import basicSrc from './demos/stream-text/basic.vue?raw'
</script>

# StreamText 流式文本

## 何时使用

展示流式生成中的文本，可附带闪烁光标。

## 基础用法

<DemoBlock :source="basicSrc">
  <Basic />
</DemoBlock>

## API

### Props

| 属性 | 说明 | 类型 | 默认值 | 必填 |
|------|------|------|--------|------|
| content | 当前已生成文本 | `string` | `''` | 否 |
| streaming | 是否仍在生成；为 `true` 时显示光标 | `boolean` | `false` | 否 |
| asMarkdown | 是否按 Markdown 渲染；`false` 时纯文本 | `boolean` | `true` | 否 |

### Events / Slots

无。展示组件；流式数据由父级不断更新 `content`。
