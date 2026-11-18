# 贡献指南

感谢你愿意参与 dan-ui。本文覆盖本地开发、代码约定、测试要求与提交规范，目标是让改动容易评审、容易回滚。

## 环境

- Node.js ≥ 20
- pnpm ≥ 9（仓库使用 workspace，请勿用 npm / yarn 装依赖）

```bash
pnpm install
pnpm build        # 先构建 theme + ui，docs / playground 依赖产物
pnpm dev:docs     # 文档站 http://localhost:5173/dan-ui/
pnpm dev:play     # playground 联调
```

## 目录

```text
packages/ui      组件库（组件源码、样式、单测）
packages/theme   主题 Token 与暗色预设
docs/            VitePress 文档站（组件页 + demos）
playground/      本地联调
scripts/         构建与工程脚本
```

## 新增或修改组件

1. `pnpm gen <name>` 生成骨架（组件目录、`index.ts`、`style.css` 与导出占位）。
2. 组件根节点保持 `useNamespace('xxx')` 的 BEM 类名，样式写在组件目录内的 `style.css`，由组件自身 `import './style.css'`。
3. 颜色 / 间距 / 圆角走 CSS 变量（`--dan-*`），不要写死色值，保证暗色与主题切换可用。
4. 在 `packages/ui/src/components/index.ts` 与 `packages/ui/src/index.ts` 补齐导出。
5. 文档页放在 `docs/components/<name>.md`，示例放 `docs/components/demos/<name>/*.vue`，并用 `?raw` 引入源码给 `DemoBlock`。
6. 交互控件必须有可见焦点样式（`:focus-visible`），浮层需要 `role` / `aria-*` 与键盘路径。

## 测试要求

- 单测用 Vitest + `@vue/test-utils`，放在组件目录的 `__tests__/*.spec.ts`。
- 新组件至少覆盖：默认渲染、主要交互事件、禁用 / 边界分支；修 bug 需要先补一条能复现的用例。
- 提交前必须跑通：

```bash
pnpm test     # 全量单测
pnpm lint     # ESLint + Prettier
```

### 测试环境备忘（jsdom）

写用例时容易踩的坑，按此处理即可：

| 现象 | 处理方式 |
|------|----------|
| `v-show` 元素用 `isVisible()` 判断不稳 | 断言 `style` 是否含 `display: none` |
| Teleport 到 `body` 的浮层 `wrapper.get()` 找不到 | 用 `document.querySelector` |
| 没有 `URL.createObjectURL` / `navigator.clipboard` | 用例内 `Object.defineProperty` 打桩 |
| canvas 无实现（Watermark 等） | `getContext` 返回 `null`，或桩成带方法记录的对象 |
| `Image` 不会真的加载 | `vi.stubGlobal('Image', FakeImage)`，手动触发 `onload` / `onerror` |
| 受控组件不回写 props 就不更新 | 用宿主组件 + `v-model` 验证渲染结果 |
| 异步钩子跨宏任务 | `await new Promise((r) => setTimeout(r, 0))` 后再断言 |

## 代码约定

- TypeScript 严格模式，组件 props 用 `withDefaults(defineProps<{...}>(), {...})` 并写注释说明非直觉项。
- 不使用 `any`；确需逃生时写 `unknown` + 收窄。
- 事件命名用 kebab-case（`update:modelValue`、`sort-change`），对外暴露能力用 `defineExpose`。
- 改动公开 API 需同步：组件文档、`docs/guide/changelog.md`、类型导出。
- 不提交 `dist`、`.vitepress/dist`、`.workbuddy/`、`docs/plans/`（本地规划文档）。

## 提交规范

使用 Conventional Commits，一句话说明「做了什么」：

```text
feat(carousel): support vertical direction
fix(select): expose aria-disabled on disabled options
test: cover form, select and table boundaries
docs: clarify watermark image fallback
chore(release): prepare 2.51.0
```

- 一类改动一次提交，测试与实现同属一个提交；纯格式化单独提交。
- 提交信息正文写清动机与影响面（是否改公开 API、是否有行为变更）。
- 不force push 到 `master`；大改动先开分支 + PR。

## 发版

发版流程、验收清单与体积基准见 `docs/guide/checklist.md`；版本语义见 `docs/guide/versioning.md`。维护者执行：

```bash
pnpm test && pnpm lint && pnpm docs:build && pnpm bundle:report
pnpm publish:packages
git tag v<version> && git push origin v<version>
```

## 许可

提交即表示同意以 [MIT](./LICENSE) 许可发布你的贡献。
