<script setup>
import DemoBlock from '../.vitepress/components/DemoBlock.vue'
import Basic from './demos/autocomplete/basic.vue'
import basicSrc from './demos/autocomplete/basic.vue?raw'
import Debounce from './demos/autocomplete/debounce.vue'
import debounceSrc from './demos/autocomplete/debounce.vue?raw'
</script>

# Autocomplete 自动完成

输入建议列表；支持防抖、加载态与键盘选择。

## 基础用法

<DemoBlock :source="basicSrc">
  <Basic />
</DemoBlock>

## 防抖与加载

`debounce` 控制请求节流；`loading` 由业务在异步回调前后切换。支持方向键 / Enter / Esc。

<DemoBlock :source="debounceSrc">
  <Debounce />
</DemoBlock>

## Props

| 属性 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| modelValue / v-model | 输入值 | `string` | `''` |
| fetchSuggestions | 拉取建议 | `(query, cb) => void` | — |
| debounce | 防抖毫秒 | `number` | `300` |
| loading | 加载中 | `boolean` | `false` |
| triggerOnFocus | 聚焦时触发查询 | `boolean` | `true` |
| clearable / disabled | 清空 / 禁用 | `boolean` | `false` |
| placeholder | 占位 | `string` | `''` |
| size | 尺寸 | `DanSize` | — |

## Events

| 事件 | 说明 |
|------|------|
| select | 选中建议项 |
| change / clear | 变更 / 清空 |
