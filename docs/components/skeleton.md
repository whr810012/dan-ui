<script setup>
import DemoBlock from '../.vitepress/components/DemoBlock.vue'
import Basic from './demos/skeleton/basic.vue'
import basicSrc from './demos/skeleton/basic.vue?raw'
import Throttle from './demos/skeleton/throttle.vue'
import throttleSrc from './demos/skeleton/throttle.vue?raw'
import Template from './demos/skeleton/template.vue'
import templateSrc from './demos/skeleton/template.vue?raw'
</script>

# Skeleton 骨架屏

在内容加载完成前占位，避免布局跳动。

## 基础用法

<DemoBlock :source="basicSrc">
  <Basic />
</DemoBlock>

## 自定义模板

用 `#template` + `SkeletonItem` 拼结构；`count` 可重复多份。

<DemoBlock :source="templateSrc">
  <Template />
</DemoBlock>

## 延迟显示

`throttle` 可推迟骨架出现/消失，短时 loading 不会闪一下。

<DemoBlock :source="throttleSrc">
  <Throttle />
</DemoBlock>

## Skeleton Props

| 属性 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| loading | 是否展示骨架 | `boolean` | `true` |
| rows | 默认模板内容行数 | `number` | `3` |
| animated | 是否开启动画 | `boolean` | `true` |
| avatar | 默认模板是否显示头像占位 | `boolean` | `false` |
| count | 重复渲染模板份数 | `number` | `1` |
| throttle | 延迟毫秒；或 `{ leading, trailing, initVal }` | `number \| object` | `0` |

## SkeletonItem Props

| 属性 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| variant | 形态 | `'text' \| 'circle' \| 'rect' \| 'button' \| 'image' \| 'caption'` | `'text'` |
| width | 宽度 | `string \| number` | — |
| height | 高度 | `string \| number` | — |
| animated | 覆盖父级动画 | `boolean` | 继承 |
