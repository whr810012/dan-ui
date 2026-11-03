<script setup>
import DemoBlock from '../.vitepress/components/DemoBlock.vue'
import Basic from './demos/avatar/basic.vue'
import basicSrc from './demos/avatar/basic.vue?raw'
import Group from './demos/avatar/group.vue'
import groupSrc from './demos/avatar/group.vue?raw'
</script>

# Avatar 头像

用于展示用户头像，支持图片与文字回退；可用 `AvatarGroup` 叠放并折叠多余项。

## 基础用法

<DemoBlock :source="basicSrc">
  <Basic />
</DemoBlock>

## 头像组

`max` 超出后显示 `+N`；`size` / `shape` 会下发给子头像。

<DemoBlock :source="groupSrc">
  <Group />
</DemoBlock>

## Avatar Props

| 属性 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| src | 图片地址 | `string` | — |
| srcset | 响应式图片源 | `string` | — |
| alt | 替代文本 / 失败时取首字 | `string` | `''` |
| size | 尺寸（组内可继承） | `number \| 'small' \| 'default' \| 'large'` | `'default'` |
| shape | 形状（组内可继承） | `'circle' \| 'square'` | `'circle'` |
| fit | 图片适应 | `'fill' \| 'contain' \| 'cover' \| 'none' \| 'scale-down'` | `'cover'` |

## Avatar Events

| 事件 | 说明 | 参数 |
|------|------|------|
| load | 图片加载成功 | `Event` |
| error | 图片加载失败（同时回退到插槽） | `Event` |

## AvatarGroup Props

| 属性 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| max | 最多展示个数，超出显示 +N | `number` | — |
| size | 统一尺寸 | `number \| 'small' \| 'default' \| 'large'` | `'default'` |
| shape | 统一形状 | `'circle' \| 'square'` | `'circle'` |
