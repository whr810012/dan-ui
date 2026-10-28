<script setup>
import DemoBlock from '../.vitepress/components/DemoBlock.vue'
import Basic from './demos/segmented/basic.vue'
import basicSrc from './demos/segmented/basic.vue?raw'
</script>

# Segmented 分段控制器

紧凑的选项切换，适合视图维度切换。

## 基础用法

<DemoBlock :source="basicSrc">
  <Basic />
</DemoBlock>

## Props

| 属性 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| modelValue / v-model | 当前值 | `string \| number` | — |
| options | 选项 | `SegmentedOption[]` | `[]` |
| size | 尺寸 | `DanSize` | 继承 |
| disabled | 禁用 | `boolean` | `false` |
| block | 撑满宽度 | `boolean` | `false` |
