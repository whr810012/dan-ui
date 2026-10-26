<script setup>
import Basic from './demos/button/basic.vue'
import Plain from './demos/button/plain.vue'
import Loading from './demos/button/loading.vue'
</script>

# Button 按钮

## 何时使用

触发操作时使用，支持主次操作、危险操作与加载态。

## 基础用法

<Basic />

<<< @/components/demos/button/basic.vue

## 描边按钮

<Plain />

<<< @/components/demos/button/plain.vue

## 加载与禁用

<Loading />

<<< @/components/demos/button/loading.vue

## API

### Props

| 属性 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| type | 类型 | `'default' \| 'primary' \| 'success' \| 'warning' \| 'danger' \| 'info'` | `'default'` |
| size | 尺寸，未传时继承 ConfigProvider | `'small' \| 'default' \| 'large'` | — |
| plain | 描边风格 | `boolean` | `false` |
| round | 圆角 | `boolean` | `false` |
| circle | 圆形 | `boolean` | `false` |
| text | 文字按钮 | `boolean` | `false` |
| link | 链接按钮 | `boolean` | `false` |
| loading | 加载中 | `boolean` | `false` |
| disabled | 禁用 | `boolean` | `false` |
| nativeType | 原生 type | `'button' \| 'submit' \| 'reset'` | `'button'` |

### Events

| 事件名 | 说明 | 参数 |
|--------|------|------|
| click | 点击时触发（禁用/加载时不触发） | `(event: MouseEvent)` |

### Slots

| 插槽名 | 说明 |
|--------|------|
| default | 按钮文案 |
| icon | 前置图标（loading 时会被替换） |

### Token

- `--dan-color-primary` / `--dan-color-success` / `--dan-color-warning` / `--dan-color-danger`
- `--dan-control-height-sm|md|lg`
- `--dan-radius-md` / `--dan-duration-fast`
