<script setup>
import DemoBlock from '../.vitepress/components/DemoBlock.vue'
import Basic from './demos/select/basic.vue'
import Clearable from './demos/select/clearable.vue'
import Sizes from './demos/select/sizes.vue'
import Disabled from './demos/select/disabled.vue'
import Multiple from './demos/select/multiple.vue'
import Remote from './demos/select/remote.vue'
import basicSrc from './demos/select/basic.vue?raw'
import clearableSrc from './demos/select/clearable.vue?raw'
import sizesSrc from './demos/select/sizes.vue?raw'
import disabledSrc from './demos/select/disabled.vue?raw'
import multipleSrc from './demos/select/multiple.vue?raw'
import remoteSrc from './demos/select/remote.vue?raw'
</script>

# Select 选择器

## 何时使用

从预设选项中选择一项或多项时使用。

## 基础用法

<DemoBlock :source="basicSrc">
  <Basic />
</DemoBlock>

## 多选与搜索

`multiple` + `filterable`；选项很多时可再开 `virtual`。

<DemoBlock :source="multipleSrc">
  <Multiple />
</DemoBlock>

## 远程搜索

`remote` 开启后由 `remoteMethod(query)` 拉取选项；配合 `loading` 展示加载态。选中后即使 options 被替换，仍会缓存 label。

<DemoBlock :source="remoteSrc">
  <Remote />
</DemoBlock>

## 可清空与禁用选项

<DemoBlock :source="clearableSrc">
  <Clearable />
</DemoBlock>

## 尺寸

<DemoBlock :source="sizesSrc">
  <Sizes />
</DemoBlock>

## 禁用

<DemoBlock :source="disabledSrc">
  <Disabled />
</DemoBlock>

## API

### Props

| 属性 | 说明 | 类型 | 默认值 | 必填 |
|------|------|------|--------|------|
| modelValue / v-model | 当前选中值；清空后为 `null` / `[]` | `string \| number \| boolean \| null \| Array` | — | 否 |
| options | 选项列表 | `SelectOption[]` | `[]` | 否 |
| placeholder | 未选择时的占位项文案 | `string` | `'请选择'` | 否 |
| clearable | 是否显示清空 | `boolean` | `false` | 否 |
| disabled | 禁用；可继承 Form | `boolean` | `false` | 否 |
| size | 尺寸；未传继承 ConfigProvider | `'small' \| 'default' \| 'large'` | — | 否 |
| multiple / filterable / virtual | 多选 / 本地搜索 / 虚拟列表 | `boolean` | `false` | 否 |
| collapseTags | 多选时折叠标签 | `boolean` | `false` | 否 |
| maxCollapseTags | 折叠时最多展示的标签数 | `number` | `1` | 否 |
| remote | 远程搜索（自动显示搜索框） | `boolean` | `false` | 否 |
| remoteMethod | 远程查询回调 | `(query: string) => void` | — | 否 |
| loading | 远程加载中 | `boolean` | `false` | 否 |
| remoteDebounce | 远程防抖毫秒 | `number` | `300` | 否 |


### SelectOption

| 字段 | 说明 | 类型 | 必填 |
|------|------|------|------|
| label | 展示文案 | `string` | 是 |
| value | 选项值 | `string \| number \| boolean` | 是 |
| disabled | 是否禁用该选项 | `boolean` | 否 |

### Events

| 事件名 | 说明 | 回调参数 |
|--------|------|----------|
| update:modelValue | `v-model` 更新 | `(value: string \| number \| boolean \| null) => void` |
| change | 选择变化，并联动 FormItem | `(value: string \| number \| boolean \| null) => void` |
| clear | 点击清空 | `() => void` |

### Slots

当前为基础原生 select 封装，无选项级插槽。

### 与 Form 联用

`change` / `blur` 会触发 FormItem 校验；适合必选城市、类型等字段。

### Token

| 变量 | 说明 |
|------|------|
| `--dan-control-height-sm/md/lg` | 高度 |
| `--dan-color-border` / `--dan-color-primary` | 边框与聚焦 |
