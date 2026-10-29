<script setup>
import DemoBlock from '../.vitepress/components/DemoBlock.vue'
import Basic from './demos/input-tag/basic.vue'
import basicSrc from './demos/input-tag/basic.vue?raw'
</script>

# InputTag 标签输入

自由输入标签（非选项列表）。与 Select 多选可搜索语义不同。

## 基础用法

<DemoBlock :source="basicSrc">
  <Basic />
</DemoBlock>

## Props

| 属性 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| modelValue / v-model | 标签列表 | `string[]` | `[]` |
| size | 尺寸 | `DanSize` | 继承 |
| disabled | 禁用 | `boolean` | `false` |
| clearable | 可清空 | `boolean` | `false` |
| collapseTags | 折叠多余标签 | `boolean` | `false` |
| max | 最大标签数 | `number` | — |
| placeholder | 占位 | `string` | `''` |
| delimiter | 额外分隔符（Enter 始终添加） | `string` | `','` |

## Events

| 事件 | 说明 | 参数 |
|------|------|------|
| change / input | 值变化 | `(value: string[])` |
| add / remove | 添加 / 删除单个 | `(value: string)` |
| clear | 清空 | — |
| focus / blur | 焦点 | `(event: FocusEvent)` |
