<script setup>
import DemoBlock from '../.vitepress/components/DemoBlock.vue'
import Basic from './demos/back-top/basic.vue'
import basicSrc from './demos/back-top/basic.vue?raw'
</script>

# BackTop 回到顶部

返回页面顶部的快捷按钮。

## 基础用法

<DemoBlock :source="basicSrc">
  <Basic />
</DemoBlock>

## BackTop Props

| 属性 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| visibilityHeight | 滚动高度达到此值才显示 | `number` | `200` |
| right | 距离页面右边距 | `number` | `40` |
| bottom | 距离页面底边距 | `number` | `40` |
| target | 滚动容器 | `string \| HTMLElement \| null` | `null` |
