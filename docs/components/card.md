<script setup>
import DemoBlock from '../.vitepress/components/DemoBlock.vue'
import Basic from './demos/card/basic.vue'
import basicSrc from './demos/card/basic.vue?raw'
import Extra from './demos/card/extra.vue'
import extraSrc from './demos/card/extra.vue?raw'
</script>

# Card 卡片

承载一块相对独立的内容。

## 基础用法

<DemoBlock :source="basicSrc">
  <Basic />
</DemoBlock>

## 额外操作 / 紧凑 / 无边框

`#extra` 放在标题右侧；`size="small"` 紧凑内边距；`bordered=false` 去掉描边。

<DemoBlock :source="extraSrc">
  <Extra />
</DemoBlock>

## Props

| 属性 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| header | 标题文案 | `string` | `''` |
| shadow | 阴影时机 | `'always' \| 'hover' \| 'never'` | `'always'` |
| bodyStyle | 内容区样式 | `Record<string, string>` | `{}` |
| bodyClass | 内容区 class | `string \| string[] \| Record<string, boolean>` | — |
| bordered | 是否显示边框 | `boolean` | `true` |
| size | 尺寸 | `'small' \| 'default'` | `'default'` |

## Slots

| 插槽 | 说明 |
|------|------|
| default | 正文 |
| header | 自定义标题 |
| extra | 标题右侧操作 |
| cover | 封面（通常放图片） |
| footer | 底部操作区 |
