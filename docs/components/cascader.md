<script setup>
import DemoBlock from '../.vitepress/components/DemoBlock.vue'
import Basic from './demos/cascader/basic.vue'
import basicSrc from './demos/cascader/basic.vue?raw'
import FilterVirtual from './demos/cascader/filter-virtual.vue'
import filterVirtualSrc from './demos/cascader/filter-virtual.vue?raw'
</script>

# Cascader 级联选择

多级静态选项选择；面板能力由 `DanCascaderPanel` 提供。

## 基础用法

<DemoBlock :source="basicSrc">
  <Basic />
</DemoBlock>

## 搜索与虚拟列

`filterable` 按 label 过滤树；`virtual` 在单列过长时窗口化渲染（适合省级下挂大量城市）。

<DemoBlock :source="filterVirtualSrc">
  <FilterVirtual />
</DemoBlock>

## Props

| 属性 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| modelValue / v-model | 选中路径 | `(string \| number)[] \| null` | `null` |
| options | 选项树 | `CascaderOption[]` | `[]` |
| disabled / clearable | 禁用 / 可清空 | `boolean` | `false` |
| placeholder | 占位 | `string` | locale |
| filterable | 面板搜索 | `boolean` | `false` |
| filterPlaceholder | 搜索框占位 | `string` | `'搜索'` |
| virtual | 长列虚拟滚动 | `boolean` | `false` |
