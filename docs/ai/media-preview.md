<script setup>
import DemoBlock from '../.vitepress/components/DemoBlock.vue'
import { DanMediaPreview, DanSpace } from '@dandan-ui/ui'
</script>

# MediaPreview 多模态预览

图片直接预览；PDF / 通用文件为占位壳，`open` 交给业务。

<DemoBlock>
  <DanSpace direction="vertical" style="width: 100%">
    <DanMediaPreview type="pdf" name="report.pdf" />
    <DanMediaPreview type="file" name="data.csv" src="#" />
  </DanSpace>
</DemoBlock>

## Props

| 属性 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| src | 资源地址 | `string` | — |
| type | `image` / `pdf` / `file` / `auto` | `string` | `'auto'` |
| name | 显示名 | `string` | — |
| alt | 图片 alt | `string` | — |

## Events

| 事件 | 说明 |
|------|------|
| open | 点击打开 |
| error | 图片加载失败 |
