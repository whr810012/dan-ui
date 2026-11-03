<script setup>
import DemoBlock from '../.vitepress/components/DemoBlock.vue'
import Basic from './demos/statistic/basic.vue'
import basicSrc from './demos/statistic/basic.vue?raw'
import Format from './demos/statistic/format.vue'
import formatSrc from './demos/statistic/format.vue?raw'
</script>

# Statistic 统计数值

突出展示关键指标数字。

## 基础用法

<DemoBlock :source="basicSrc">
  <Basic />
</DemoBlock>

## 格式化

支持千分位、小数点字符，或完全自定义 `formatter`。

<DemoBlock :source="formatSrc">
  <Format />
</DemoBlock>

## Props

| 属性 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| title | 标题 | `string` | `''` |
| value | 数值 | `string \| number` | `0` |
| prefix / suffix | 前后缀 | `string` | `''` |
| precision | 小数位数 | `number` | `0` |
| groupSeparator | 千分位分隔符（空串关闭） | `string` | `','` |
| decimalSeparator | 小数点 | `string` | `'.'` |
| formatter | 自定义格式化 | `(value) => string` | — |
| valueStyle | 数值样式 | `object` | — |
