<script setup>
import DemoBlock from '../.vitepress/components/DemoBlock.vue'
import Basic from './demos/extensions/basic.vue'
import basicSrc from './demos/extensions/basic.vue?raw'
</script>

# 编辑器扩展

RichText 默认启用以下能力：

| 能力 | 来源 |
|------|------|
| 段落 / 硬换行 | StarterKit |
| 标题 H1–H3 | StarterKit Heading |
| 加粗 / 斜体 / 删除线 / 下划线 | StarterKit |
| 无序 / 有序列表 | StarterKit |
| 引用 | StarterKit |
| 行内代码 / 代码块 | StarterKit |
| 撤销 / 重做 | StarterKit History |
| 链接 | StarterKit Link |
| 占位符 | `@tiptap/extension-placeholder` |
| 图片 | `@tiptap/extension-image`（需 `onImageUpload`） |

## 能力演示

下方 Demo 预置了标题、列表、引用与代码块，可用工具栏继续编辑。

<DemoBlock :source="basicSrc">
  <Basic />
</DemoBlock>

自定义更多扩展时，可通过 `toolbar` / `bubble-menu` 插槽拿到 `editor` 自行 `editor.chain()...`。
