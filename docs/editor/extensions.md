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

自定义更多扩展时，可通过 `toolbar` / `bubble-menu` 插槽拿到 `editor` 自行 `editor.chain()...`。
