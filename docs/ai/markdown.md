<script setup>
import DemoBlock from '../.vitepress/components/DemoBlock.vue'
import Basic from './demos/markdown/basic.vue'
import basicSrc from './demos/markdown/basic.vue?raw'
</script>

# Markdown

## 何时使用

渲染助手回复中的 Markdown 内容时使用。默认会做基础 HTML 消毒。

## 基础用法

<DemoBlock :source="basicSrc">
  <Basic />
</DemoBlock>

## API

### Props

| 属性 | 说明 | 类型 | 默认值 | 必填 |
|------|------|------|--------|------|
| content | Markdown 源文本 | `string` | `''` | 否 |
| breaks | 是否将换行转为 `<br>` | `boolean` | `true` | 否 |
| html | 是否允许源码中的原始 HTML（仍会做基础消毒） | `boolean` | `false` | 否 |

### Events / Slots

无。纯展示组件。

### 安全说明

默认会移除 `script` / `style`、内联 `on*` 事件与 `javascript:` 协议。若开启 `html`，请确保内容来源可信，或在业务侧先行消毒。
