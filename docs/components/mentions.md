<script setup>
import DemoBlock from '../.vitepress/components/DemoBlock.vue'
import Basic from './demos/mentions/basic.vue'
import basicSrc from './demos/mentions/basic.vue?raw'
</script>

# Mentions 提及

在文本域中输入 `@` 触发候选项并插入提及。

## 基础用法

<DemoBlock :source="basicSrc">
  <Basic />
</DemoBlock>

## API

### Props

| 属性 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| modelValue / v-model | 文本内容 | `string` | `''` |
| options | 候选项 | `MentionOption[]` | `[]` |
| prefix | 触发前缀 | `string` | `@` |
| disabled | 是否禁用 | `boolean` | `false` |
| placeholder | 占位文案 | `string` | `''` |
| rows | 行数 | `number` | `3` |

### Events

| 事件 | 说明 | 参数 |
|------|------|------|
| update:modelValue | 内容变化 | `(value)` |
| change | 失焦或确认变化 | `(value)` |
| select | 选择候选项 | `(option)` |

### MentionOption

| 字段 | 说明 | 类型 |
|------|------|------|
| value | 插入值 | `string` |
| label | 展示文案 | `string` |
