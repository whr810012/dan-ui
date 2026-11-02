<script setup>
import DemoBlock from '../.vitepress/components/DemoBlock.vue'
import Basic from './demos/cascader/basic.vue'
import basicSrc from './demos/cascader/basic.vue?raw'
import FilterVirtual from './demos/cascader/filter-virtual.vue'
import filterVirtualSrc from './demos/cascader/filter-virtual.vue?raw'
import Multiple from './demos/cascader/multiple.vue'
import multipleSrc from './demos/cascader/multiple.vue?raw'
import Strict from './demos/cascader/strict.vue'
import strictSrc from './demos/cascader/strict.vue?raw'
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

## 多选

`multiple` 下 `v-model` 为路径数组 `Array<Array<string | number>>`；点选叶子切换勾选，面板保持打开。可用 `max-tag-count` 折叠标签。

<DemoBlock :source="multipleSrc">
  <Multiple />
</DemoBlock>

## 展示与任选一级

`show-all-levels=false` 仅显示末级；`separator` 自定义路径分隔符；`check-strictly` 可选中任意一级（非仅叶子）。

<DemoBlock :source="strictSrc">
  <Strict />
</DemoBlock>

## Props

| 属性 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| modelValue / v-model | 单选为一条路径；多选为路径数组 | `(string \| number)[] \| Array<(string \| number)[]> \| null` | `null` |
| options | 选项树 | `CascaderOption[]` | `[]` |
| disabled / clearable | 禁用 / 可清空 | `boolean` | `false` |
| placeholder | 占位 | `string` | locale |
| filterable | 面板搜索 | `boolean` | `false` |
| filterPlaceholder | 搜索框占位 | `string` | `'搜索'` |
| virtual | 长列虚拟滚动 | `boolean` | `false` |
| multiple | 多选路径 | `boolean` | `false` |
| maxTagCount | 多选标签折叠数量，`0` 不折叠 | `number` | `0` |
| showAllLevels | 是否显示完整路径 | `boolean` | `true` |
| separator | 路径分隔符 | `string` | `' / '` |
| checkStrictly | 可选中任意一级 | `boolean` | `false` |
