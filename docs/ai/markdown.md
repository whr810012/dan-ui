# Markdown

## 何时使用

渲染助手回复中的 Markdown 内容时使用。默认会做基础 HTML 消毒。

## 基础用法

<<< @/ai/demos/markdown/basic.vue

## API

| 属性 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| content | Markdown 文本 | `string` | `''` |
| breaks | 换行转 `<br>` | `boolean` | `true` |
| html | 是否允许原始 HTML | `boolean` | `false` |
