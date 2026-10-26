<script setup>
import Basic from './demos/icon/basic.vue'
</script>

# Icon 图标

## 何时使用

需要内置状态图标或自定义 SVG 时使用。

## 基础用法

<Basic />

<<< @/components/demos/icon/basic.vue

## API

### Props

| 属性 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| name | 具名图标 | `'loading' \| 'close' \| 'check' \| 'plus'` | — |
| size | 尺寸 | `number \| string` | 继承字体 |
| color | 颜色 | `string` | 继承颜色 |
| spin | 旋转动画 | `boolean` | `false` |

### Slots

| 插槽名 | 说明 |
|--------|------|
| default | 自定义 SVG / 内容（未传 name 时） |
