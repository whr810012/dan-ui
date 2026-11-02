<script setup>
import DemoBlock from '../.vitepress/components/DemoBlock.vue'
import Basic from './demos/breadcrumb/basic.vue'
import basicSrc from './demos/breadcrumb/basic.vue?raw'
import Max from './demos/breadcrumb/max.vue'
import maxSrc from './demos/breadcrumb/max.vue?raw'
</script>

# Breadcrumb 面包屑

显示当前页面在系统层级结构中的位置。

## 基础用法

<DemoBlock :source="basicSrc">
  <Basic />
</DemoBlock>

## 自定义分隔符与折叠

`#separator` 自定义分隔符；`max-items` 超过时中间折叠为省略号。

<DemoBlock :source="maxSrc">
  <Max />
</DemoBlock>

## Breadcrumb Props

| 属性 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| separator | 分隔符 | `string` | `'/'` |
| maxItems | 最大展示项数，`0` 不折叠 | `number` | `0` |

## BreadcrumbSlots

| 插槽 | 说明 |
|------|------|
| default | 面包屑项 |
| separator | 自定义分隔符 |

## BreadcrumbItem Props

| 属性 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| to | 链接地址 | `string` | `''` |
