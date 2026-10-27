<script setup>
import DemoBlock from '../.vitepress/components/DemoBlock.vue'
import Basic from './demos/rate/basic.vue'
import basicSrc from './demos/rate/basic.vue?raw'
</script>

# Rate 评分

对事物进行等级评估。

## 基础用法

<DemoBlock :source="basicSrc">
  <Basic />
</DemoBlock>

## Rate Props

| 属性 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| modelValue / v-model | 当前分值 | `number` | `0` |
| max | 最大分值 | `number` | `5` |
| allowHalf | 是否允许半选 | `boolean` | `false` |
| disabled | 只读 / 禁用 | `boolean` | `false` |
| voidColor / activeColor | 未选 / 选中颜色 | `string` | — |

## Rate Events

| 事件 | 说明 | 参数 |
|------|------|------|
| change | 分值改变时 | `(value)` |
