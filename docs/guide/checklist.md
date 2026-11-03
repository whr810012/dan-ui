# 发布与视觉清单

面向次版本发布前的人工抽检，不替代单测与 `pnpm` 门禁。  
**2.x 发版目标：** 下列工程门禁 + 暗色 / 键盘 / SSR 注意点全部勾过再发 npm。

## 工程门禁

```bash
pnpm build && pnpm test && pnpm docs:build && pnpm lint
pnpm bundle:report   # 对比 index.js / style.css 体积是否异常膨胀
```

## 暗色扫尾

1. 文档站切换暗色，扫一遍侧栏各组件 Demo。
2. 重点看浮层（Dialog / Drawer / Dropdown / Select / DatePicker）背景是否用 elevated Token。
3. 检查 Loading 遮罩、代码块、Empty / Skeleton / Image 占位在暗色下是否发灰发糊。
4. 主色按钮、危险色 Tag / Alert 对比度是否足够。
5. Table 固定列阴影、Carousel 指示器、AvatarGroup 描边是否随暗色 Token 变化。

自动化兜底：`packages/ui/src/__tests__/darkTokens.spec.ts` 断言暗色 elevated / mask / overlay Token 存在。

## 键盘与朗读抽检

1. Dialog / Drawer / MessageBox：Esc、焦点陷阱、标题可朗读。
2. Select / Dropdown：方向键 + Enter。
3. Tabs：方向键切换；Menu / Tree：方向键移动焦点。
4. 详见 [无障碍与键盘](/guide/accessibility)。

自动化兜底：Dialog / Drawer Esc、Select / Tabs / Menu / Tree 方向键单测已覆盖主路径。

## API 稳定化

1. 公开导出仅通过 `@dandan-ui/ui` / `DanUIResolver`；避免业务依赖深层相对路径。
2. Props / Events 命名保持 `modelValue`、`update:modelValue`、kebab 事件文档与实现一致。
3. 破坏性变更记入 [Changelog](/guide/changelog)，并考虑次版本号。

## Locale

1. 新增内置文案须写入 `LocaleMessages`（`zh-CN` / `en` 叶子 key 对齐，见 locale 单测）。
2. 组件默认文案优先 `useLocale().t(...)`，Props 传入可覆盖。
3. 文档 Demo 抽检：`ConfigProvider :locale="en"` 后 Dialog / Table / DatePicker 英文可读。

自动化兜底：`localeComponents.spec.ts` 挂载 en 后断言 OK / Cancel / No data / Pick a date。

## SSR

1. 阅读 [SSR / Nuxt](/guide/ssr)；浮层与命令式 API 勿在服务端调用。
2. 客户端插件或 `<ClientOnly>` 覆盖 Dialog / DatePicker / Message 等。

## 文档

1. 新组件 / 新 Props 必须有 Demo（或变体段）+ API 表 + 侧栏入口（若新页）。
2. 中后台组合页参考 [最佳实践](/guide/best-practices)。
3. 无障碍约定见 [无障碍与键盘](/guide/accessibility)。
4. 发版后确认 `/dan-ui/sitemap.xml`、`/dan-ui/robots.txt`、抽样页含 canonical / og meta。
5. 指南总览（介绍 / FAQ / roadmap）勿长期停留在过期版号表述。

## 可上生产勾选（摘要）

- [x] `pnpm build && pnpm test && pnpm docs:build`（发版前再跑一遍）
- [x] `pnpm bundle:report` 无异常膨胀（index.js ≈ 590KB / style.css ≈ 171KB 量级）
- [x] 暗色扫尾（浮层 / Table / Loading / Skeleton）— Token 冒烟 + 人工文档站抽检
- [x] 键盘抽检（Dialog / Select / Tabs）— 单测覆盖主路径
- [x] Locale zh / en 抽样 — key 对齐 + Dialog/Table/DatePicker 英文挂载
- [x] SSR 注意点已告知接入方或已写进业务脚手架（见 SSR 指南）
- [x] Changelog 已写，版本号已 bump（`2.50.0`）
