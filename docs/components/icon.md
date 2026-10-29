<script setup>
import DemoBlock from '../.vitepress/components/DemoBlock.vue'
import Basic from './demos/icon/basic.vue'
import Gallery from './demos/icon/gallery.vue'
import basicSrc from './demos/icon/basic.vue?raw'
import gallerySrc from './demos/icon/gallery.vue?raw'
</script>

# Icon 图标

## 何时使用

需要状态图标、操作图标，或自定义 SVG 时使用。扩展方式（插槽 / 外置库）见 [图标扩展](/guide/icons)。

## 基础用法

<DemoBlock :source="basicSrc">
  <Basic />
</DemoBlock>

## 全部图标

点击复制名称：`name="search"`。

<DemoBlock :source="gallerySrc">
  <Gallery />
</DemoBlock>

## API

### Props

| 属性 | 说明 | 类型 | 默认值 | 必填 |
|------|------|------|--------|------|
| name | 内置具名图标，见上方「全部图标」 | `IconName` | — | 否 |
| size | 图标尺寸；数字按 `px`，也可传 `'1.2em'` | `number \| string` | 继承当前字体大小 | 否 |
| color | 图标颜色，任意合法 CSS 颜色值 | `string` | 继承 `currentColor` | 否 |
| spin | 是否持续旋转（适合 loading） | `boolean` | `false` | 否 |

### Events

无组件级自定义事件；点击等请绑在外层元素，或直接监听根节点原生事件。

### Slots

| 插槽名 | 说明 | 作用域参数 |
|--------|------|------------|
| default | 自定义 SVG / 内容；仅在未传 `name` 时渲染 | — |

### 导出

| 导出 | 说明 |
|------|------|
| `iconMap` | 名称到图标组件的映射 |
| `iconNames` | 全部图标名称数组 |

### Token

图标本身使用 `currentColor`；旋转动画时长受 `--dan-duration-slow` 影响。
