---
title: Admin 模板配方
description: 用 dan-ui 拼中后台登录壳、Layout 侧栏与权限菜单，不绑定后端。
---

<script setup>
import DemoBlock from '../.vitepress/components/DemoBlock.vue'
import Shell from './demos/admin-template/shell.vue'
import shellSrc from './demos/admin-template/shell.vue?raw'
</script>

# Admin 模板配方

2.0 起提供可复制的 **中后台壳**：登录占位 → Layout + Menu → 按 permission 过滤菜单。  
**不**包含真实鉴权、路由守卫或后端 SDK——业务侧自行接线。

## 在线演示

试试「一键管理员 / 编辑 / 访客」：侧栏菜单会随权限变化。

<DemoBlock :source="shellSrc">
  <Shell />
</DemoBlock>

## 结构

```text
未登录          已登录
┌─────────┐     ┌──────────┬────────────────┐
│ 登录表单 │     │ Aside    │ Header + 用户  │
│         │ →   │ Menu*    │ Main 路由占位  │
└─────────┘     └──────────┴────────────────┘
                  * Menu 项带 permission，按会话 permissions 过滤
```

## 接入真实项目时

1. **会话**：把 Demo 里的 `session` 换成 Pinia / 接口返回的 user + permissions。
2. **路由**：`active` 对应 `vue-router` 的 `route.name` / `path`；点击 Menu 时 `router.push`。
3. **鉴权**：路由 `meta.permission` 与菜单同一套码表；无权限跳 403 页。
4. **布局**：继续用 `DanLayout` / `DanAside` / `DanHeader` / `DanMain`；列表页拼 Form + Table 见 [最佳实践](/guide/best-practices)。

## 相关

- [从零搭建](/guide/scaffold)
- [最佳实践](/guide/best-practices)
- [版本与迁移](/guide/versioning)
