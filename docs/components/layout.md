<script setup>
import DemoBlock from '../.vitepress/components/DemoBlock.vue'
import Basic from './demos/layout/basic.vue'
import basicSrc from './demos/layout/basic.vue?raw'
</script>

# Layout 布局

页面级骨架：顶栏、侧栏、主区、底栏。常见后台为「外层横向（Aside + 内容）+ 内层纵向（Header / Main / Footer）」。

## 经典侧栏

<DemoBlock :source="basicSrc">
  <Basic />
</DemoBlock>

## Layout Props

| 属性 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| direction | 强制方向；不传则按是否含 Aside 自动判断 | `'horizontal' \| 'vertical'` | — |

## Aside Props

| 属性 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| width | 展开宽度 | `string` | `'220px'` |
| collapsed | 是否折叠（支持 `v-model:collapsed`） | `boolean` | `false` |
| collapsedWidth | 折叠宽度 | `string` | `'64px'` |

## Header / Footer Props

| 属性 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| height | 高度 | `string` | Header `56px` / Footer `48px` |
