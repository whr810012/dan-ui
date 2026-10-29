<script setup>
import DemoBlock from '../.vitepress/components/DemoBlock.vue'
import Basic from './demos/link/basic.vue'
import basicSrc from './demos/link/basic.vue?raw'
</script>

# Link 文字链接

## 基础用法

<DemoBlock :source="basicSrc">
  <Basic />
</DemoBlock>

## Props

| 属性 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| type | 类型 | `'default' \| 'primary' \| 'success' \| 'warning' \| 'danger' \| 'info'` | `'default'` |
| href | 链接地址 | `string` | — |
| target | 同 a[target] | `string` | — |
| disabled | 禁用 | `boolean` | `false` |
| underline | 下划线：始终 / 悬停 / 无 | `boolean \| 'hover'` | `'hover'` |

## Events

| 事件 | 说明 |
|------|------|
| click | 点击（禁用时不触发） |
