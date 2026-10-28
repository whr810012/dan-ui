<script setup>
import DemoBlock from '../.vitepress/components/DemoBlock.vue'
import Basic from './demos/tour/basic.vue'
import basicSrc from './demos/tour/basic.vue?raw'
</script>

# Tour 漫游式引导

分步高亮页面元素，帮助用户了解界面。

## 基础用法

<DemoBlock :source="basicSrc">
  <Basic />
</DemoBlock>

## Props

| 属性 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| modelValue / v-model | 是否打开 | `boolean` | `false` |
| current / v-model:current | 当前步骤 | `number` | `0` |
| steps | 步骤 | `TourStep[]` | `[]` |

`TourStep`：`target`（选择器或元素）、`title`、`description`、`placement`。
