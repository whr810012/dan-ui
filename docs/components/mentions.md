<script setup>
import DemoBlock from '../.vitepress/components/DemoBlock.vue'
import Basic from './demos/mentions/basic.vue'
import basicSrc from './demos/mentions/basic.vue?raw'
import Keyboard from './demos/mentions/keyboard.vue'
import keyboardSrc from './demos/mentions/keyboard.vue?raw'
</script>

# Mentions 提及

在文本域中输入 `@`（或自定义 `prefix`）触发候选项并插入提及。

## 基础用法

<DemoBlock :source="basicSrc">
  <Basic />
</DemoBlock>

## 键盘与加载

面板打开后可用方向键移动、Enter 选中、Esc 关闭。`loading` 由业务在 `search` 异步查询时切换；可用 `filterOption` 自定义过滤。

<DemoBlock :source="keyboardSrc">
  <Keyboard />
</DemoBlock>

## API

### Props

| 属性 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| modelValue / v-model | 文本内容 | `string` | `''` |
| options | 候选项 | `MentionOption[]` | `[]` |
| prefix | 触发前缀 | `string` | `@` |
| loading | 加载中（显示状态行） | `boolean` | `false` |
| filterOption | 自定义过滤；返回 `true` 保留 | `(query, option) => boolean` | — |
| disabled | 是否禁用 | `boolean` | `false` |
| placeholder | 占位文案 | `string` | `''` |
| rows | 行数 | `number` | `3` |

### Events

| 事件 | 说明 | 参数 |
|------|------|------|
| update:modelValue | 内容变化 | `(value)` |
| change | 失焦或确认变化 | `(value)` |
| select | 选择候选项 | `(option)` |
| search | 触发前缀后查询串变化 | `(query)` |

### MentionOption

| 字段 | 说明 | 类型 |
|------|------|------|
| value | 插入值 | `string` |
| label | 展示文案 | `string` |
