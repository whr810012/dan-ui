<script setup>
import DemoBlock from '../.vitepress/components/DemoBlock.vue'
import Basic from './demos/breadcrumb/basic.vue'
import basicSrc from './demos/breadcrumb/basic.vue?raw'
</script>

# Breadcrumb 面包屑

显示当前页面在系统层级结构中的位置。

## 基础用法

<DemoBlock :source="basicSrc">
  <Basic />
</DemoBlock>

## Breadcrumb Props

| 属性 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| separator | 分隔符 | `string` | `'/'` |

## BreadcrumbItem Props

| 属性 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| to | 链接地址 | `string` | `''` |
