<script setup>
import DemoBlock from '../.vitepress/components/DemoBlock.vue'
import Basic from './demos/page-header/basic.vue'
import basicSrc from './demos/page-header/basic.vue?raw'
</script>

# PageHeader 页头

中后台列表 / 详情顶栏壳，不绑定路由库。

## 基础用法

<DemoBlock :source="basicSrc">
  <Basic />
</DemoBlock>

## Props

| 属性 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| title | 标题 | `string` | `''` |
| subtitle | 副标题 | `string` | `''` |
| showBack | 显示返回按钮 | `boolean` | `true` |

## Events

| 事件 | 说明 |
|------|------|
| back | 点击返回 |

## Slots

| 插槽 | 说明 |
|------|------|
| breadcrumb | 面包屑区域 |
| title / subtitle | 覆盖标题文案 |
| extra | 右侧操作区 |
| default | 下方内容区 |
