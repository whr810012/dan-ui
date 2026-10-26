<script setup>
import DemoBlock from '../.vitepress/components/DemoBlock.vue'
import Basic from './demos/model-select/basic.vue'
import basicSrc from './demos/model-select/basic.vue?raw'
</script>

# ModelSelect 模型选择

基于 Select 的模型切换器。

<DemoBlock :source="basicSrc">
  <Basic />
</DemoBlock>

## API

### Props

| 属性 | 说明 | 类型 | 默认值 | 必填 |
|------|------|------|--------|------|
| modelValue / v-model | 当前模型值 | `string` | — | 否 |
| options | 模型选项，结构同 `SelectOption` | `SelectOption[]` | `[]` | 否 |
| disabled | 禁用 | `boolean` | `false` | 否 |
| placeholder | 占位文案 | `string` | `'选择模型'` | 否 |

### Events

| 事件名 | 说明 | 回调参数 |
|--------|------|----------|
| update:modelValue | `v-model` 更新 | `(value: string \| number \| boolean \| null) => void` |
| change | 选择变化 | `(value: string \| number \| boolean \| null) => void` |

### Slots

无；选项通过 `options` 传入。
