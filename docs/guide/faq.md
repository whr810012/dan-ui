---
title: 常见问题
description: dan-ui 安装、按需引入、主题暗色、AI 是否内置模型、npm 包名与文档地址等常见问题。
---

# 常见问题

## 如何安装 dan-ui？

```bash
pnpm add @dandan-ui/ui @dandan-ui/theme
```

入口引入主题与样式，并 `app.use(DanUI)`，或按需导入组件。详见 [快速开始](/guide/quickstart)。

## dan-ui 支持按需引入吗？

支持。可配合 `unplugin-vue-components` 使用 `DanUIResolver`。按需时仍需引入 `@dandan-ui/theme` 与 `@dandan-ui/ui/style.css`。详见 [引入方式](/guide/import)。

## 如何定制主题与暗色？

覆盖 `--dan-*` CSS 变量，或使用 `DanConfigProvider` 的 `theme`。根节点加 `class="dark"` 或 `data-theme="dark"` 启用内置暗色 Token。详见 [主题定制](/guide/theming)。

## AI 组件是否内置大模型？

**不内置。** Chat、StreamText 等只提供界面、事件与插槽；SSE / WebSocket 与模型调用由业务侧完成。详见 [AI 概览](/ai/overview)。

## npm 包名与文档地址是什么？

- 包：`@dandan-ui/ui`、`@dandan-ui/theme`
- 文档：[https://dandanhub.vip/dan-ui/](https://dandanhub.vip/dan-ui/)
- 仓库：[https://github.com/whr810012/dan-ui](https://github.com/whr810012/dan-ui)

## 和 Element Plus / Ant Design Vue 是什么关系？

都是 Vue 3 组件库。dan-ui 额外把 **AI 对话壳** 与 **富文本** 收进同一文档站，并强调不绑定模型与云厂商 SDK。选型见 [何时用 dan-ui](/guide/why-dan-ui)。

## 版本如何升级？

查看 [更新日志](/guide/changelog)。次版本（如 1.3 → 1.4）通常兼容；破坏性变更会写在 changelog。
