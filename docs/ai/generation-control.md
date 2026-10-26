<script setup>
import DemoBlock from '../.vitepress/components/DemoBlock.vue'
import Basic from './demos/generation-control/basic.vue'
import basicSrc from './demos/generation-control/basic.vue?raw'
</script>

# GenerationControl 生成控制

生成中显示停止，空闲时显示重新生成。

<DemoBlock :source="basicSrc">
  <Basic />
</DemoBlock>

## API

### Props

| 属性 | 说明 | 类型 | 默认值 | 必填 |
|------|------|------|--------|------|
| generating | 是否生成中 | `boolean` | `false` | 否 |
| stopText | 停止按钮文案 | `string` | `'停止生成'` | 否 |
| regenerateText | 重生成按钮文案 | `string` | `'重新生成'` | 否 |

### Events

| 事件名 | 说明 | 回调参数 |
|--------|------|----------|
| stop | 点击停止 | `() => void` |
| regenerate | 点击重新生成 | `() => void` |

### Slots

| 插槽名 | 说明 |
|--------|------|
| default | 追加在按钮旁的额外控件 |
