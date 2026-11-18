# dan-ui「完整开发完成」计划

> 基线：仓库 **`2.51.0`（待发布）**｜npm 当前 **`2.50.0`**（2026-11-03 发布，发版前曾为 `1.2.0`）｜组件目录约 **103**  
> 日期：2026-11-03 制定，**2026-11-13 状态复核**  
> 目标：把「能演示」收成「可对外宣称 2.x 生产可用」的完成态，而不是无限追齐 Element Plus。  
> 当前执行计划：[`2026-11-13-next-development.md`](./2026-11-13-next-development.md)

---

## 0. 状态更新（2026-11-13 复核）

| 项 | 11-03 记录 | 复核结论 |
|----|-----------|----------|
| npm 2.x | 🟡 待 `publish:packages` | ✅ `2.50.0` 已发布（`@dandan-ui/ui` / `@dandan-ui/theme` 同号，`2026-11-03T07:48Z`） |
| CI | 待建 | ✅ `.github/workflows/ci.yml` 已建；11-06 SEO 提交曾让 `pnpm lint` 红灯，11-13 已修 Prettier 格式转绿 |
| checklist | 待勾 | ✅ 摘要项已勾并补「浮层 reduce 动效」抽检 |
| 文档站 SEO/GEO | — | ✅ 已上线（线上 `robots.txt` 含 AI 爬虫规则，与仓库一致） |
| 品牌 Logo | — | ✅ 已定稿并接入顶栏 / favicon / OG / README |
| 仓库增量 | — | ⚠️ 11-04～11-06 有 10 个提交、`packages/ui/src` 改 20 文件，**尚未发到 npm**；已 bump `2.51.0` 待发布 |
| Release tag | 未打 | ❌ 远程仍只有 v1.0.x，2.x 无 tag |

**结论：M0–M1 已收口，M2 的「npm 发 2.x」已完成；剩余 = `2.51.0` 同步发布 + 2.x Release tag + 文档叙述对齐。**

---

## 1. 什么叫「做完」

在产品边界不变的前提下（中后台 + AI 壳 + 富文本；**不做**图表 / LLM SDK / 云上传 SDK / 移动端专用包），满足下面全部条件即视为完整开发完成：

| # | 完成标准 | 当前状态 |
|---|----------|----------|
| D1 | 组件面覆盖中后台主路径 + AI 壳 + RichText，侧栏与导出齐全 | ✅ |
| D2 | 高频路径有单测；无 Critical/High 已知缺陷 | ✅ CI + 关键单测；Esc 初始打开缺陷已修；新增 popper 回归 10 例 |
| D3 | 文档：每个公开组件有 Demo + API；指南与 changelog 对齐 2.x | ✅ changelog `2.50.0` + `2.51.0` 条目 |
| D4 | 暗色 / 键盘 / Locale / SSR 约定已抽检并写进清单 | ✅ checklist 已勾（含 reduce 动效与自动化兜底） |
| D5 | `@dandan-ui/ui` / `@dandan-ui/theme` **npm 发布到 2.x**，与仓库同号 | ✅ `2.50.0` 已同号发布；仓库现为 `2.51.0` 待发，需再次对齐 |
| D6 | 有可重复的发版流水线（本地 `build/test/lint/docs` + `publish:packages`） | ✅ 不依赖 GitHub CI 绿灯 |
| D7 | 明确冻结范围：后续只做 bugfix / 小增强，不再开大面新组件 | ✅ roadmap 已冻结 |

**一句话：** M0–M1 已收口；M2 的 npm 2.x 发布已完成，剩余 **2.51.0 同步发布 + 2.x Release tag**。

---

## 2. 现状差距（11-03 基线记录，闭环情况见第 0 节）

### P0 — 阻塞「可上生产 / 可对外发 2.x」

1. **npm 未跟上仓库** → ✅ `2.50.0` 已发布；⚠️ 但 11-04～11-06 的增量又形成新差距，见第 0 节。
2. **无 CI** → ✅ 已建 `.github/workflows/ci.yml`。
3. **发布清单未闭环** → ✅ checklist 已勾。
4. **关键缺测** → ✅ ConfigProvider / Loading / Icon / Space / Result / Divider 已补；新增 popperPolish 回归。

### P1 — 体验与 API 深度（不阻塞发版，但影响「完整感」）

| 域 | 建议补齐 |
|----|----------|
| Select | 大数据虚拟列表（若文档已宣称需核对实现深度） |
| Cascader / TreeSelect | 超大选项、空态、禁用节点边界 |
| Table | 虚拟滚动边界、空数据 + 筛选组合、固定列 + 展开交叉 |
| Form | 动态 rules、dependencies、scrollToError 场景文档化 |
| Upload | 分片失败重试 Demo、abort 文档抽检 |
| Image / Preview | 缩放旋转（若要对齐常见中后台预期） |
| Watermark | 图片水印 |
| Carousel | 竖向 `direction` |
| Skeleton | throttle 对象文档 Demo 已有；可补 SkeletonItem 组合页 |
| a11y | Dialog/Select/Tabs/Menu/Tree 按 `accessibility.md` 矩阵人工过一遍 |
| AI 叶子组件 | chat-input / stream-text / markdown / thinking / chat-message 仍无 spec |

### P2 — 工程与生态（「完整」加分项）

- 按组件拆 CSS / 更细的 tree-shaking 体积说明  
- Playwright 视觉回归（可复用 `pnpm shots`）  
- Nuxt 最小示例仓库或 `examples/nuxt`  
- Admin 模板从文档 Demo 抽成可 clone 的 starter  
- 贡献指南 `CONTRIBUTING.md`、Issue / PR 模板  

### 明确不做（写进完成定义，避免范围漂移）

- 图表、看板大屏  
- 内置 OpenAI/Claude/OSS SDK  
- React / 小程序 / 纯移动端包  
- 富文本多人 CRDT  

---

## 3. 分阶段执行计划

### 阶段 A — 定义冻结与发版基线（0.5 天）

- [x] 确认「2.x 完成」= 上表 D1–D7（用户确认按 plan 执行）  
- [x] 更新 `docs/components-roadmap.md`：冻结大面新组件 + 指向完成计划  
- [x] 发版号策略：**`2.47.0` = M1 质量门禁**；**`2.50.0` = M2 完成里程碑（npm 正式 2.x）**  
- [x] 追加：**`2.51.0` = 11-04～11-06 增量的同步发布**

**产出：** 本文档定稿 + roadmap「完成定义」。

### 阶段 B — 质量门禁（2–4 天）

1. **质量门禁（本地，不强制 GitHub CI）**  
   - [x] 本地 `pnpm build / test / lint / docs:build / bundle:report`  
   - [x] 可选保留 `.github/workflows/ci.yml`，**不作为完成条件**  
2. **补关键单测**  
   - [x] `ConfigProvider`、`Loading`、`Icon`、`Space`、`Result`、`Divider`  
   - [x] popper 打磨回归（中文文案 / 动画 / reduced-motion），见 `popperPolish.spec.ts`  
   - [ ] 选做：AI 叶子组件冒烟  
3. **跑通 checklist**  
   - [x] 暗色：Token 冒烟 + checklist 说明  
   - [x] 键盘：Dialog / Drawer Esc、Select / Tabs / Menu / Tree 单测  
   - [x] Locale：`en` 下 Dialog / Table / DatePicker  
   - [x] 浮层动效：`prefers-reduced-motion: reduce` 下关闭动画  
4. **修 High/Medium**  
   - [x] Button `ns.is` ComputedRef、AvatarGroup / Breadcrumb slots 类型噪音  
   - [x] ESLint：Drawer 无用赋值、ConversationList 未用 props、Pagination 模板 shadow  
   - [x] Prettier 全仓格式化，使 `pnpm lint` 可通过  
   - [x] Dialog/Drawer 初始打开 Esc；Tour demo 语法；RichText validate 断言  
   - [x] 表单浮层中文乱码修复；SEO 配置 Prettier 格式回正

**产出：** CI 配置就绪；关键单测与 lint 本地绿；checklist 已勾。

### 阶段 C — 正式发布 2.x（0.5–1 天）

1. [x] changelog 写「2.x 生产里程碑」摘要（`2.50.0`）  
2. [x] `pnpm publish:packages` — `2.50.0` 已于 2026-11-03 发布（两包同号）  
3. [x] 验证：`npm view @dandan-ui/ui version` 与当时仓库 version 一致（`2.50.0`）  
4. [x] 文档站确认已部署最新（CF Pages / Hub 反代；线上 robots.txt 已含 AI 爬虫规则）  
5. [ ] GitHub Release tag（2.x 仍缺；建议随 `2.51.0` 打 `v2.51.0`）  
6. [ ] **`2.51.0` 同步发布**：11-04～11-06 的仓库增量尚未发到 npm，见 [`2026-11-13-next-development.md`](./2026-11-13-next-development.md)

**产出：** 用户 `pnpm add @dandan-ui/ui@^2` 装到完成版；需再次对齐到 `2.51.0` 才含乱码修复与新动画。

### 阶段 D — 深度打磨包（可选，1–2 周，可发 2.52+）

按 P1 表逐项，每项小 PR + 小版本，不再开「新组件大面」。建议顺序：

1. AI 叶子组件冒烟测试  
2. Form / Table / Select 边界与文档  
3. a11y 矩阵扫尾  
4. Upload / Image 体验  
5. Watermark 图水印、Carousel 竖向  

### 阶段 E — 工程加分（可选）

- starter / Nuxt example  
- 视觉回归  
- 按需 CSS  

---

## 4. 建议里程碑排期

| 里程碑 | 内容 | 预估 | 版本建议 |
|--------|------|------|----------|
| M0 | 完成定义签字、范围冻结 | 0.5d | — |
| M1 | CI + 关键单测 + checklist | 2–4d | `2.47.0` ✅ |
| M2 | npm 发布 2.x + GitHub Release | 0.5–1d | `2.50.0` ✅ 已发布；tag ❌ 待打 |
| M2' | 同步 11-04～11-06 增量 | 0.5d | `2.51.0`（进行中） |
| M3 | P1 深度（按需） | 1–2w | `2.52+` |
| M4 | P2 生态（按需） | 灵活 | `2.60` 或独立 repo |

**最短路径到「完整」：** M0 → M1 → M2 已完成主体；现只需 **M2' 发布 + 打 tag** 即可收口。

---

## 5. 风险与注意

- **版本跳变：** npm 从 1.2 → 2.x，changelog 必须写清相对 1.x 的破坏点（Form.validate 形状、ChatInput send 载荷等，见 `versioning.md`）；`2.51.0` 的 changelog 需说明相对 npm `2.50.0` 的差异。  
- **Windows 文档 dev：** VitePress `@fs` 路径曾出现 SyntaxError；截图/验收优先用 `docs:build` + 静态预览。  
- **本机构建限制：** `pnpm build` / `docs:build` 清理 `dist` 时会被本地批量删除保护钩子拦截（非代码缺陷），全量门禁需在正常环境复跑。  
- **范围蠕变：** 「再做一个组件」会无限推迟完成；新组件默认进「完成后再说」池。  
- **OTP / 发布权限：** `publish:packages` 依赖 npm 登录，需人工在场。  

---

## 6. 下一步（2026-11-13 起）

按 [`2026-11-13-next-development.md`](./2026-11-13-next-development.md) 执行：

1. ✅ 阶段 0 — 修 Prettier 红灯，`pnpm lint` 转绿。  
2. 🟡 阶段 1 — `2.51.0` 本地内容已完成（版本 / changelog / 单测 / 文档），待门禁复跑与 `publish:packages`。  
3. ⬜ 阶段 2 — 打 `v2.51.0` tag、线上抽检、README 写「2.x 生产可用」。  
4. ⬜ 阶段 3 — 可选维护轨（AI 叶子组件、P1 深度、P2 生态）。

---

## 7. 验收口令

当下列命令与检查都成立，即可在 README / 文档首页写「2.x 生产可用」：

```bash
pnpm build && pnpm test && pnpm lint && pnpm docs:build
npm view @dandan-ui/ui version      # 期望 2.51.0（当前仍为 2.50.0）
npm view @dandan-ui/theme version   # 期望 2.51.0
git ls-remote --tags origin         # 期望含 v2.51.0
```

- [x] `pnpm test` 全绿（104+ spec / 256+ 用例，含 popperPolish 回归）  
- [x] `pnpm lint` 全绿（11-13 修复 SEO 配置格式）  
- [x] `pnpm build` JS 产物正常（`index.js` ≈ 606KB / `style.css` ≈ 175KB）；d.ts 阶段需正常环境复验  
- [x] checklist 人工项已勾  
- [ ] `2.51.0` 已发布且 npm 两包同号  
- [ ] GitHub Release 已打 tag  
- [x] 文档站 changelog 可见该版本（源码已写 `2.50.0` / `2.51.0`）  
