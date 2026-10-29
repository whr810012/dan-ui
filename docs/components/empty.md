<script setup>
import DemoBlock from '../.vitepress/components/DemoBlock.vue'
import Basic from './demos/empty/basic.vue'
import basicSrc from './demos/empty/basic.vue?raw'
import Types from './demos/empty/types.vue'
import typesSrc from './demos/empty/types.vue?raw'
</script>

# Empty 空状态

## 基础用法

<DemoBlock :source="basicSrc">
  <Basic />
</DemoBlock>

## 预设类型

`type` 提供搜索 / 网络 / 权限等常见空态插画与默认文案；也可用 `image` 传入自定义图片 URL，或 `#image` 插槽完全自定义。

<DemoBlock :source="typesSrc">
  <Types />
</DemoBlock>

## Props

| 属性 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| description | 描述文案 | `string` | locale / 类型默认 |
| imageSize | 插画宽度 px | `number` | `96` |
| image | 自定义图片 URL | `string` | `''` |
| type | 内置类型 | `'default' \| 'search' \| 'network' \| 'permission'` | `'default'` |

## Slots

| 插槽 | 说明 |
|------|------|
| image | 自定义插画 |
| description | 自定义描述 |
| default | 底部额外操作 |
