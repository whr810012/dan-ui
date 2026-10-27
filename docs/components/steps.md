<script setup>
import DemoBlock from '../.vitepress/components/DemoBlock.vue'
import Basic from './demos/steps/basic.vue'
import basicSrc from './demos/steps/basic.vue?raw'
import Vertical from './demos/steps/vertical.vue'
import verticalSrc from './demos/steps/vertical.vue?raw'
</script>

# Steps 步骤条

引导用户按流程完成任务。

## 基础用法

<DemoBlock :source="basicSrc">
  <Basic />
</DemoBlock>

## 垂直方向

<DemoBlock :source="verticalSrc">
  <Vertical />
</DemoBlock>

## Steps Props

| 属性 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| active | 当前激活步骤，从 0 开始 | `number` | `0` |
| direction | 显示方向 | `'horizontal' \| 'vertical'` | `'horizontal'` |
| processStatus | 当前步骤状态 | `StepStatus` | `'process'` |
| finishStatus | 已完成步骤状态 | `StepStatus` | `'finish'` |
| simple | 简洁风格 | `boolean` | `false` |

`StepStatus`：`'wait' | 'process' | 'finish' | 'error' | 'success'`

## Step Props

| 属性 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| title | 标题 | `string` | `''` |
| description | 描述文案 | `string` | `''` |
| icon | 自定义图标文案 | `string` | `''` |
| status | 覆盖自动状态 | `StepStatus` | — |
