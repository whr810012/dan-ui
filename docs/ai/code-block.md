<script setup>
import DemoBlock from '../.vitepress/components/DemoBlock.vue'
import Basic from './demos/code-block/basic.vue'
import basicSrc from './demos/code-block/basic.vue?raw'
</script>

# CodeBlock 代码块

带语言标签与复制按钮的代码展示组件。

<DemoBlock :source="basicSrc">
  <Basic />
</DemoBlock>

## API

### Props

| 属性 | 说明 | 类型 | 默认值 | 必填 |
|------|------|------|--------|------|
| code | 代码文本 | `string` | `''` | 否 |
| language | 语言标签展示名，如 `ts` / `vue` | `string` | `''` | 否 |

### Events

无。复制使用浏览器 `clipboard` API，失败时静默忽略。

### Slots

无。
