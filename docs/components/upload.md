<script setup>
import DemoBlock from '../.vitepress/components/DemoBlock.vue'
import Basic from './demos/upload/basic.vue'
import basicSrc from './demos/upload/basic.vue?raw'
import Drag from './demos/upload/drag.vue'
import dragSrc from './demos/upload/drag.vue?raw'
import TipSlot from './demos/upload/tip-slot.vue'
import tipSlotSrc from './demos/upload/tip-slot.vue?raw'
import Chunk from './demos/upload/chunk.vue'
import chunkSrc from './demos/upload/chunk.vue?raw'
import PictureCard from './demos/upload/picture-card.vue'
import pictureCardSrc from './demos/upload/picture-card.vue?raw'
</script>

# Upload 上传

选择并管理待上传文件。默认提供本地 mock 进度；可通过 `http-request` 接入真实上传，支持中断与分片钩子（不绑定云厂商 SDK）。

## 基础用法

<DemoBlock :source="basicSrc">
  <Basic />
</DemoBlock>

## 拖拽上传

拖拽区展示图标与 locale 文案；`limit` / `accept` 会自动出现在副文案。可用 `tip` 或 `#tip` 在触发区下方补充说明。

<DemoBlock :source="dragSrc">
  <Drag />
</DemoBlock>

## 自定义文案与 tip

`drag-text` 覆盖主文案；`#tip` 自定义底部提示（优先于 `tip` 属性的默认渲染）。

<DemoBlock :source="tipSlotSrc">
  <TipSlot />
</DemoBlock>

## 可中断与分片上传

`httpRequest` 可返回 `{ abort }`；组件暴露 `abort` / `abortAll` / `retry`。设置 `chunk-size` 后按片调用同一 handler，并传入 `chunk` 元数据。

<DemoBlock :source="chunkSrc">
  <Chunk />
</DemoBlock>

## 照片墙

`list-type="picture-card"` 以卡片缩略图展示；图片会自动生成本地预览 URL。

<DemoBlock :source="pictureCardSrc">
  <PictureCard />
</DemoBlock>

## Upload Props

| 属性 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| fileList / v-model:fileList | 文件列表 | `UploadFile[]` | `[]` |
| accept | 接受的文件类型 | `string` | `''` |
| multiple | 是否多选 | `boolean` | `false` |
| disabled | 禁用 | `boolean` | `false` |
| limit | 最大上传数量 | `number` | — |
| drag | 是否启用拖拽 | `boolean` | `false` |
| dragText | 拖拽区主文案 | `string` | locale |
| tip | 触发区下方提示 | `string` | `''` |
| autoUpload | 选中后是否自动上传 | `boolean` | `true` |
| listType | 列表样式 | `'text' \| 'picture-card'` | `'text'` |
| httpRequest | 自定义上传方法 | `UploadRequestHandler` | 内置 mock |
| chunkSize | 分片大小（字节）；`>0` 且文件更大时启用分片 | `number` | `0` |
| beforeChunkUpload | 每片上传前钩子，返回 `false` 中断 | `(chunk, file) => boolean \| Promise<boolean>` | — |


## Upload Events

| 事件 | 说明 | 参数 |
|------|------|------|
| change | 文件状态改变 | `(file, fileList)` |
| remove | 移除文件 | `(file, fileList)` |
| exceed | 超出 limit | `(files, fileList)` |
| success / error / progress | 上传过程 | 见类型 |

## Upload Slots

| 插槽 | 说明 |
|------|------|
| default | 触发区内容（按钮 / 拖拽区内部） |
| tip | 触发区下方提示（覆盖 `tip` 属性文本） |

## Upload 方法

通过 ref 调用：`submit()`、`clearFiles()`、`openFileDialog()`、`abort(file?)`、`abortAll()`、`retry(file)`。
