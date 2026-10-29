---
title: 从零搭建
description: 用 Vite + Vue 3 新建项目并接入 @dandan-ui/ui / theme，十五分钟跑起中后台骨架。
---

# 从零搭建

无需 `create-dan-ui` CLI：按下列步骤即可在空仓库接入 dan-ui（约 15 分钟）。

## 1. 创建 Vite 应用

```bash
pnpm create vite my-admin --template vue-ts
cd my-admin
pnpm install
pnpm add @dandan-ui/ui @dandan-ui/theme
pnpm add vue-router
```

若需要富文本，再装 TipTap peer（见 [快速开始](/guide/quickstart)）。

## 2. 入口注册

`src/main.ts`：

```ts
import { createApp } from 'vue'
import DanUI from '@dandan-ui/ui'
import '@dandan-ui/theme'
import '@dandan-ui/ui/style.css'
import App from './App.vue'
import router from './router'

createApp(App).use(DanUI).use(router).mount('#app')
```

按需引入见 [引入方式](/guide/import)。

## 3. 最小路由 + 布局

```ts
// src/router/index.ts
import { createRouter, createWebHistory } from 'vue-router'
import AdminLayout from '../layouts/AdminLayout.vue'

export default createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      component: AdminLayout,
      children: [
        { path: '', name: 'dashboard', component: () => import('../views/Dashboard.vue') },
      ],
    },
    { path: '/login', component: () => import('../views/Login.vue') },
  ],
})
```

`AdminLayout` 内使用 `DanLayout` + `DanMenu`，完整交互可复制 [Admin 模板配方](/guide/admin-template) 的 Demo 源码。

## 4. 暗色（可选）

在 `html` 上切换 `class="dark"`，与文档站一致。Token 说明见 [主题定制](/guide/theming)。

## 5. SSR / Nuxt

服务端渲染注意点见 [SSR / Nuxt](/guide/ssr)：浮层与命令式 Message 请放在客户端。

## 验收

- [ ] 页面能看到带主题的 `DanButton`
- [ ] Layout 侧栏可切换
- [ ] 登录壳 Demo 行为可复现（权限菜单过滤）
