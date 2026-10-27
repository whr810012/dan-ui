<script setup>
import DemoBlock from '../.vitepress/components/DemoBlock.vue'
import Basic from './demos/upload/basic.vue'
import basicSrc from './demos/upload/basic.vue?raw'
import Drag from './demos/upload/drag.vue'
import dragSrc from './demos/upload/drag.vue?raw'
import Chunk from './demos/upload/chunk.vue'
import chunkSrc from './demos/upload/chunk.vue?raw'
</script>

# Upload 上传

选择并管理待上传文件。默认提供本地 mock 进度；可通过 `http-request` 接入真实上传，支持中断与分片钩子（不绑定云厂商 SDK）。

## 基础用法

<DemoBlock :source="basicSrc">
  <Basic />
</DemoBlock>

## 拖拽上传

<DemoBlock :source="dragSrc">
  <Drag />
</DemoBlock>

## 可中断与分片上传

`httpRequest` 可返回 `{ abort }`；组件暴露 `abort` / `abortAll` / `retry`。设置 `chunk-size` 后按片调用同一 handler，并传入 `chunk` 元数据。

<DemoBlock :source="chunkSrc">
  <Chunk />
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
| autoUpload | 选中后是否自动上传 | `boolean` | `true` |
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

## Upload 方法

通过 ref 调用：`submit()`、`clearFiles()`、`openFileDialog()`、`abort(file?)`、`abortAll()`、`retry(file)`。
