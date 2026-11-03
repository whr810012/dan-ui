<script setup>
import DemoBlock from '../.vitepress/components/DemoBlock.vue'
import Basic from './demos/skeleton/basic.vue'
import basicSrc from './demos/skeleton/basic.vue?raw'
import Throttle from './demos/skeleton/throttle.vue'
import throttleSrc from './demos/skeleton/throttle.vue?raw'
</script>

# Skeleton 骨架屏

在内容加载完成前占位，避免布局跳动。

## 基础用法

<DemoBlock :source="basicSrc">
  <Basic />
</DemoBlock>

## 延迟显示

`throttle` 可推迟骨架出现，短时 loading 不会闪一下。

<DemoBlock :source="throttleSrc">
  <Throttle />
</DemoBlock>

## Props

| 属性 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| loading | 是否展示骨架 | `boolean` | `true` |
| rows | 内容行数 | `number` | `3` |
| animated | 是否开启动画 | `boolean` | `true` |
| avatar | 是否显示头像占位 | `boolean` | `false` |
| throttle | 延迟显示骨架的毫秒数 | `number` | `0` |
