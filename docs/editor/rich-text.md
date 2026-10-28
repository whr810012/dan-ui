---
title: RichText 富文本
description: 基于 TipTap 的 Vue 3 富文本，支持工具栏、图片上传钩子、表格与 html/json/markdown 输出。
---

<script setup>
import DemoBlock from '../.vitepress/components/DemoBlock.vue'
import Basic from './demos/rich-text/basic.vue'
import FormDemo from './demos/rich-text/form.vue'
import JsonDemo from './demos/rich-text/json.vue'
import basicSrc from './demos/rich-text/basic.vue?raw'
import formSrc from './demos/rich-text/form.vue?raw'
import jsonSrc from './demos/rich-text/json.vue?raw'
</script>

# RichText 富文本

基于 TipTap 的 Vue 3 封装，支持工具栏、选区浮动菜单，以及 `html` / `json` 输出。

## 基础用法

选中文字可出现浮动菜单；工具栏支持标题、列表、链接等。

<DemoBlock :source="basicSrc">
  <Basic />
</DemoBlock>

## JSON 输出

<DemoBlock :source="jsonSrc">
  <JsonDemo />
</DemoBlock>

## 与 Form 联用

<DemoBlock :source="formSrc">
  <FormDemo />
</DemoBlock>

## API

### RichText Props

| 属性 | 说明 | 类型 | 默认值 | 必填 |
|------|------|------|--------|------|
| modelValue / v-model | 编辑器内容 | `string \| JSONContent \| null` | `''` | 否 |
| output | 输出格式 | `'html' \| 'json'` | `'html'` | 否 |
| placeholder | 空态占位 | `string` | `'请输入内容…'` | 否 |
| disabled | 禁用；可继承 Form | `boolean` | `false` | 否 |
| editable | 是否可编辑 | `boolean` | `true` | 否 |
| minHeight | 编辑区最小高度 | `string` | `'160px'` | 否 |
| showToolbar | 显示工具栏 | `boolean` | `true` | 否 |
| showBubbleMenu | 显示选区浮动菜单 | `boolean` | `true` | 否 |
| onImageUpload | 图片上传回调，返回可访问 URL；未提供则无法插图 | `(file: File) => Promise<string> \| string` | — | 否 |

### RichText Events

| 事件名 | 说明 | 回调参数 |
|--------|------|----------|
| update:modelValue | 内容变化 | `(value: string \| JSONContent) => void` |
| change | 内容变化（同步 FormItem） | `(value: string \| JSONContent) => void` |
| focus | 编辑器聚焦 | `(event: FocusEvent) => void` |
| blur | 编辑器失焦（同步 FormItem） | `(event: FocusEvent) => void` |

### RichText Slots

| 插槽名 | 说明 | 作用域参数 |
|--------|------|------------|
| toolbar | 自定义工具栏 | `{ editor, openImagePicker }` |
| bubble-menu | 自定义选区菜单 | `{ editor }` |

### RichText Expose

| 方法 / 属性 | 说明 |
|-------------|------|
| editor | TipTap Editor 实例 Ref |
| getEditor | 获取 Editor |
| openImagePicker | 打开本地图片选择 |
| focus | 聚焦编辑器 |
| clear | 清空内容 |

### 基础扩展

StarterKit（标题/加粗/斜体/删除线/下划线/链接/列表/引用/代码块/撤销重做）+ Placeholder + Image。

### 依赖

请在业务项目安装 TipTap peer 依赖：

```bash
pnpm add @tiptap/vue-3 @tiptap/starter-kit @tiptap/extension-placeholder @tiptap/extension-image @tiptap/pm
```
