# dan-ui「完整开发完成」计划

> 基线：本地 **`2.46.3`**｜npm 公开发布仍为 **`1.2.0`**｜组件目录约 **103**｜有单测约 **84**｜文档组件页约 **79**  
> 日期：2026-11-03  
> 目标：把「能演示」收成「可对外宣称 2.x 生产可用」的完成态，而不是无限追齐 Element Plus。

---

## 1. 什么叫「做完」

在产品边界不变的前提下（中后台 + AI 壳 + 富文本；**不做**图表 / LLM SDK / 云上传 SDK / 移动端专用包），满足下面全部条件即视为完整开发完成：

| # | 完成标准 | 当前状态 |
|---|----------|----------|
| D1 | 组件面覆盖中后台主路径 + AI 壳 + RichText，侧栏与导出齐全 | ✅ 基本达成 |
| D2 | 高频路径有单测；无 Critical/High 已知缺陷 | 🟡 84/103 有测；缺 CI 门禁 |
| D3 | 文档：每个公开组件有 Demo + API；指南与 changelog 对齐 2.x | 🟡 主体有，深度不均 |
| D4 | 暗色 / 键盘 / Locale / SSR 约定已抽检并写进清单 | ⬜ checklist 未勾完 |
| D5 | `@dandan-ui/ui` / `@dandan-ui/theme` **npm 发布到 2.x**，与仓库同号 | ❌ npm 仍 1.2.0 |
| D6 | 有可重复的发版流水线（至少本地脚本 + 建议 CI） | ⬜ 无 GitHub Actions |
| D7 | 明确冻结范围：后续只做 bugfix / 小增强，不再开大面新组件 | ⬜ 待签字 |

**一句话：** 功能面已齐，完成态卡在 **质量门禁 + 正式发 2.x + 冻结范围**。

---

## 2. 现状差距（按优先级）

### P0 — 阻塞「可上生产 / 可对外发 2.x」

1. **npm 未跟上仓库**  
   本地已到 `2.46.x`，registry 仍是 `1.2.0`。对外「完整」必须以公开发布为准。
2. **无 CI**  
   仓库无 `.github/workflows`；`build / test / lint / docs:build` 全靠人工。
3. **发布清单未闭环**  
   `docs/guide/checklist.md` 勾选项仍空：暗色扫尾、键盘抽检、Locale、bundle 体积。
4. **关键缺测**  
   无 `__tests__`：`config-provider`、`loading`、`icon`、`space`、`divider`、`result`，以及多块 AI 叶子组件（`markdown` / `stream-text` / `chat-input` 等）。ConfigProvider / Loading 属于底座，应补。

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

- [ ] 确认「2.x 完成」= 上表 D1–D7  
- [ ] 更新 `docs/components-roadmap.md` 版本号与「冻结后只修不扩」声明  
- [ ] 选定发版号策略：建议 **先发 `2.47.0`（质量修补）或直接 `2.50.0` 作为完成里程碑**，避免再无计划冲到 2.99  

**产出：** 本文档定稿 + roadmap 一句「完成定义」。

### 阶段 B — 质量门禁（2–4 天）

1. **补 CI（GitHub Actions）**  
   - `pnpm build && pnpm test && pnpm lint && pnpm docs:build`  
   - 可选：`bundle:report` 体积阈值告警  
2. **补关键单测**  
   - 必做：`ConfigProvider`、`Loading`、`Icon`、`Space`、`Result`  
   - 选做：AI 叶子组件各 1 个冒烟（渲染 + 主事件）  
3. **跑通 checklist**  
   - 暗色：浮层 / Table / Skeleton / Empty / Message  
   - 键盘：Dialog、Select、Tabs、Menu  
   - Locale：`en` 下 Dialog / Table / DatePicker  
4. **修 High/Medium**  
   - 构建期 dts 已知噪音（AvatarGroup slots、Breadcrumb separator、Button disabled 类型等）择要清理，避免发版带红  

**产出：** CI 绿；checklist 勾选；无已知 High 缺陷。

### 阶段 C — 正式发布 2.x（0.5–1 天）

1. changelog 写「2.x 生产里程碑」摘要（相对 1.2 的能力跃迁）  
2. `pnpm publish:packages`（OTP / 登录就绪）  
3. 验证：`npm view @dandan-ui/ui version` == 仓库 version  
4. 文档站确认已部署最新（CF Pages / Hub 反代）  
5. GitHub Release tag（如 `v2.50.0`）  

**产出：** 用户 `pnpm add @dandan-ui/ui@^2` 装到完成版。

### 阶段 D — 深度打磨包（可选，1–2 周，可发 2.51+）

按 P1 表逐项，每项小 PR + 小版本，不再开「新组件大面」。建议顺序：

1. Form / Table / Select 边界与文档  
2. a11y 矩阵扫尾  
3. Upload / Image 体验  
4. Watermark 图水印、Carousel 竖向  

### 阶段 E — 工程加分（可选）

- starter / Nuxt example  
- 视觉回归  
- 按需 CSS  

---

## 4. 建议里程碑排期

| 里程碑 | 内容 | 预估 | 版本建议 |
|--------|------|------|----------|
| M0 | 完成定义签字、范围冻结 | 0.5d | — |
| M1 | CI + 关键单测 + checklist | 2–4d | `2.47.0` |
| M2 | npm 发布 2.x + GitHub Release | 0.5–1d | `2.50.0`（完成徽章） |
| M3 | P1 深度（按需） | 1–2w | `2.51+` |
| M4 | P2 生态（按需） | 灵活 | `2.60` 或独立 repo |

**最短路径到「完整」：** 只做 **M0 → M1 → M2**（大约一周内可收口）。

---

## 5. 风险与注意

- **版本跳变：** npm 从 1.2 → 2.x，changelog 必须写清相对 1.x 的破坏点（Form.validate 形状、ChatInput send 载荷等，见 `versioning.md`）。  
- **Windows 文档 dev：** VitePress `@fs` 路径曾出现 SyntaxError；截图/验收优先用 `docs:build` + 静态预览。  
- **范围蠕变：** 「再做一个组件」会无限推迟完成；新组件默认进「完成后再说」池。  
- **OTP / 发布权限：** `publish:packages` 依赖 npm 登录，需人工在场。  

---

## 6. 下一步（立刻可做）

1. 你确认完成定义是否同意「M0–M2 = 完整」。  
2. 同意后执行顺序：**加 CI → 补 ConfigProvider/Loading 等测 → 勾 checklist → 发布 2.50.0**。  
3. P1/P2 排进完成之后的维护轨，不挡「完整」宣告。

---

## 7. 验收口令（给自己用）

当下列命令与检查都成立，即可在 README / 文档首页写「2.x 生产可用」：

```bash
pnpm build && pnpm test && pnpm lint && pnpm docs:build
npm view @dandan-ui/ui version   # 期望 2.50.x（或约定里程碑号）
npm view @dandan-ui/theme version
```

- [ ] CI 最近一次 main 绿灯  
- [ ] checklist 人工项已勾  
- [ ] GitHub Release 已打 tag  
- [ ] 文档站 changelog 可见该版本  
