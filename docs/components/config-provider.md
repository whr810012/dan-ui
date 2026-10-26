# ConfigProvider 全局配置

## 何时使用

需要统一设置组件尺寸、层级，或局部覆盖主题 CSS 变量时使用。

## 基础用法

<<< @/components/demos/config-provider/basic.vue

## API

### Props

| 属性 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| size | 子组件默认尺寸 | `'small' \| 'default' \| 'large'` | `'default'` |
| zIndex | 浮层起始层级 | `number` | `2000` |
| namespace | 命名空间前缀 | `string` | `'dan'` |
| theme | CSS 变量覆盖 | `Record<string, string>` | `{}` |

`theme` 的 key 可写 `color-primary`（自动加 `--dan-` 前缀），或完整 `--dan-color-primary`。

### Slots

| 插槽名 | 说明 |
|--------|------|
| default | 子应用内容 |
