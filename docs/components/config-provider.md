<script setup>
import DemoBlock from '../.vitepress/components/DemoBlock.vue'
import Basic from './demos/config-provider/basic.vue'
import Size from './demos/config-provider/size.vue'
import basicSrc from './demos/config-provider/basic.vue?raw'
import sizeSrc from './demos/config-provider/size.vue?raw'
</script>

# ConfigProvider 全局配置

## 何时使用

需要统一设置组件尺寸、层级，或局部覆盖主题 CSS 变量时使用。

## 主题变量覆盖

<DemoBlock :source="basicSrc">
  <Basic />
</DemoBlock>

## 统一尺寸

切换下方尺寸后，输入框与按钮会一起变化。

<DemoBlock :source="sizeSrc">
  <Size />
</DemoBlock>

## API

### Props

| 属性 | 说明 | 类型 | 默认值 | 必填 |
|------|------|------|--------|------|
| size | 向下提供的默认控件尺寸 | `'small' \| 'default' \| 'large'` | `'default'` | 否 |
| zIndex | 浮层类组件起始层级（预留给 Dialog 等） | `number` | `2000` | 否 |
| namespace | CSS / BEM 命名空间前缀 | `string` | `'dan'` | 否 |
| theme | 局部覆盖 CSS 变量 | `Record<string, string>` | `{}` | 否 |

### theme 写法

| key 示例 | 实际写入 |
|----------|----------|
| `color-primary` | `--dan-color-primary`（自动加 `--{namespace}-`） |
| `--dan-color-primary` | 原样使用完整变量名 |

### Slots

| 插槽名 | 说明 | 作用域参数 |
|--------|------|------------|
| default | 子树内容，可嵌套表单、按钮等组件 | — |

### 注入上下文

子组件可通过内部 `injectConfig()` 读取：

| 字段 | 类型 | 说明 |
|------|------|------|
| size | `Ref<DanSize>` | 默认尺寸 |
| zIndex | `Ref<number>` | 浮层起点 |
| namespace | `Ref<string>` | 命名空间 |

### 注意事项

- 使用 `display: contents`，一般不会破坏原有布局。
- 可多层嵌套；更内层的 Provider 优先生效。
