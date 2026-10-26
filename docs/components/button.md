<script setup>
import DemoBlock from '../.vitepress/components/DemoBlock.vue'
import Basic from './demos/button/basic.vue'
import Plain from './demos/button/plain.vue'
import Loading from './demos/button/loading.vue'
import WithIcon from './demos/button/with-icon.vue'
import Sizes from './demos/button/sizes.vue'
import Round from './demos/button/round.vue'
import basicSrc from './demos/button/basic.vue?raw'
import plainSrc from './demos/button/plain.vue?raw'
import loadingSrc from './demos/button/loading.vue?raw'
import withIconSrc from './demos/button/with-icon.vue?raw'
import sizesSrc from './demos/button/sizes.vue?raw'
import roundSrc from './demos/button/round.vue?raw'
</script>

# Button 按钮

## 何时使用

触发操作时使用，支持主次操作、危险操作与加载态。

## 基础用法

<DemoBlock :source="basicSrc">
  <Basic />
</DemoBlock>

## 描边按钮

<DemoBlock :source="plainSrc">
  <Plain />
</DemoBlock>

## 尺寸

<DemoBlock :source="sizesSrc">
  <Sizes />
</DemoBlock>

## 图标按钮

<DemoBlock :source="withIconSrc">
  <WithIcon />
</DemoBlock>

## 圆角 / 圆形 / 文字

<DemoBlock :source="roundSrc">
  <Round />
</DemoBlock>

## 加载与禁用

<DemoBlock :source="loadingSrc">
  <Loading />
</DemoBlock>

## API

### Props

| 属性 | 说明 | 类型 | 默认值 | 必填 |
|------|------|------|--------|------|
| type | 按钮语义类型，影响颜色与强调级别 | `'default' \| 'primary' \| 'success' \| 'warning' \| 'danger' \| 'info'` | `'default'` | 否 |
| size | 按钮尺寸；未传时继承最近的 `ConfigProvider.size` | `'small' \| 'default' \| 'large'` | — | 否 |
| plain | 是否使用描边（浅底）风格 | `boolean` | `false` | 否 |
| round | 是否大圆角 | `boolean` | `false` | 否 |
| circle | 是否圆形按钮，通常配合 `icon` 插槽 | `boolean` | `false` | 否 |
| text | 是否为文字按钮（无边框背景） | `boolean` | `false` | 否 |
| link | 是否为链接风格按钮 | `boolean` | `false` | 否 |
| loading | 是否加载中；为 `true` 时显示转圈并禁止点击 | `boolean` | `false` | 否 |
| disabled | 是否禁用 | `boolean` | `false` | 否 |
| autofocus | 是否自动聚焦 | `boolean` | `false` | 否 |
| nativeType | 原生 `button` 的 `type`，用于表单提交场景 | `'button' \| 'submit' \| 'reset'` | `'button'` | 否 |

### Events

| 事件名 | 说明 | 回调参数 |
|--------|------|----------|
| click | 点击按钮时触发；`disabled` 或 `loading` 时不触发 | `(event: MouseEvent) => void` |

### Slots

| 插槽名 | 说明 | 作用域参数 |
|--------|------|------------|
| default | 按钮主文案 / 内容 | — |
| icon | 前置图标区域；当 `loading=true` 时会被内置 loading 图标替换 | — |

### 注意事项

- `text` / `link` 与实心类型可组合，但视觉上以文字/链接样式为主。
- 在 `Form` 内使用时，可用 `nativeType="submit"` 触发表单提交（需自行监听）。

### Token

| 变量 | 说明 |
|------|------|
| `--dan-color-primary` 等状态色 | 各 `type` 的主色 |
| `--dan-control-height-sm/md/lg` | 对应 small/default/large 高度 |
| `--dan-radius-md` / `--dan-radius-full` | 常规圆角与 round/circle |
| `--dan-duration-fast` | 悬停/点击过渡时长 |
