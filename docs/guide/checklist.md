# 发布与视觉清单

面向 `1.0.0-rc` 前的人工抽检，不替代单测与 `pnpm` 门禁。

## 工程门禁

```bash
pnpm build && pnpm test && pnpm docs:build && pnpm lint
```

## 暗色扫尾

1. 文档站切换暗色，扫一遍侧栏各组件 Demo。
2. 重点看浮层（Dialog / Drawer / Dropdown / Select / DatePicker）背景是否用 elevated Token。
3. 检查 Loading 遮罩、代码块、Empty / Skeleton 在暗色下是否发灰发糊。
4. 主色按钮、危险色 Tag / Alert 对比度是否足够。

## API 稳定化

1. 公开导出仅通过 `@dandan-ui/ui` / `DanUIResolver`；避免业务依赖深层相对路径。
2. Props / Events 命名保持 `modelValue`、`update:modelValue`、kebab 事件文档与实现一致。
3. 破坏性变更记入 [Changelog](/guide/changelog)，并考虑次版本号。

## 文档

1. 新组件必须有 Demo + API 表 + 侧栏入口。
2. 中后台组合页参考 [最佳实践](/guide/best-practices)。
3. 无障碍约定见 [无障碍与键盘](/guide/accessibility)。
