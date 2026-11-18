# 无障碍与键盘

面向中后台场景的键盘与朗读约定。Dialog / Drawer / MessageBox 已具备模态焦点路径；列表类组件补齐方向键。

## 已支持

| 场景 | 行为 |
|------|------|
| Dialog / Drawer | `role="dialog"` + `aria-modal` + `aria-labelledby`；Esc 关闭；**焦点陷阱**；关闭后焦点还原 |
| MessageBox | `role="alertdialog"` + `aria-labelledby` / `aria-describedby`；焦点陷阱；默认聚焦确定按钮 |
| Notification / Message | 容器 `aria-live="polite"` |
| Select / Dropdown | Esc 关闭；**方向键**移动高亮；Enter 选中；`role="listbox"` / `option`，禁用项带 `aria-disabled` |
| Tabs | `role="tablist"` + `tab` / `tabpanel`；方向键 / Home / End 切换；`aria-controls` 关联面板；roving `tabindex` |
| Menu | 方向键 / Home / End 在 `menuitem` 间移动焦点；Enter / Space 激活；子菜单 `aria-expanded` 同步 |
| Tree | 方向键在可见节点间移动；左/右展开收起；Enter / Space 点击或勾选；`aria-expanded` / `aria-selected` 同步 |
| 关闭 / 装饰 | 关闭按钮 `aria-label`；装饰箭头等 `aria-hidden` |

底层工具：`useFocusTrap`（已从 `@dandan-ui/ui` 导出），业务自定义模态也可复用。

## 自检清单

发布或大改浮层 / 导航前，建议手测：

1. 仅用键盘打开 Dialog，焦点落在面板内首个可聚焦控件。
2. Tab 不会逃出遮罩到背后页面。
3. Esc 关闭后，焦点回到打开按钮。
4. 屏幕阅读器能读到对话框标题（`aria-labelledby`）。
5. Tabs / Menu / Tree / Select 可用方向键完成主路径。
6. 暗色模式下对比度仍可辨认（边框 / 占位符 / disabled / 固定列阴影）。

## 发版抽样矩阵（2.x）

每发次版本至少抽测一行「组件 × 动作」：

| 组件 | 键盘 | 朗读 / 语义 | 备注 |
|------|------|-------------|------|
| Dialog | Esc、Trap、焦点还原 | `aria-modal` + 标题 | 关 `destroyOnClose` 再测一次 |
| Select | ↓↑ Enter Esc | 触发器可聚焦 | multiple 时 Tag 删除键 |
| Table | 列设置、排序可 Tab 到 | 加载态文案 | 虚拟表仅测可视区 |
| DatePicker | 打开面板、选日、Esc | 触发器 label | month/year/week |
| ChatInput | Tab 到发送 / 停止 | 按钮 `aria-label` | 附件列表可删 |
| Tour | 下一步 / 跳过 | 步骤可读 | — |

自动化：上述 Dialog / Tabs / Menu / Tree / Select 的角色、`aria-*` 状态与键盘路径已纳入单测（`DialogA11y` / `TabsA11y` / `MenuA11y` / `TreeA11y` / `SelectA11y`）；完整 Playwright 视觉回归留待后续工程轨。

## 对比度与焦点环

- 交互控件应保留可见的 `:focus-visible` 轮廓（主题主色描边或浏览器默认环）。
- 不要用 `outline: none` 清掉焦点环而不提供替代样式。
- 暗色下占位符与 disabled 文本使用加深后的 Token（见主题暗色预设）。

## 浮层动效与减少动效

Select / Cascader / DatePicker / TimePicker / TimeSelect / Autocomplete / TreeSelect 的下拉面板共用 `dan-pop` 弹出动画。`@dandan-ui/ui` 的入口已自动引入 `styles/animations.css`，**业务侧无需额外配置**。

当系统开启「减少动态效果」（`prefers-reduced-motion: reduce`）时，上述 7 个面板的动画会自动关闭，避免对动效敏感的用户造成不适。业务自定义浮层可复用 `@keyframes dan-pop`，并应同样提供 reduce 分支：

```css
.my-panel {
  animation: dan-pop var(--dan-duration-normal) var(--dan-ease);
}

@media (prefers-reduced-motion: reduce) {
  .my-panel {
    animation: none;
  }
}
```

发版抽检时建议在系统辅助功能中开启「减少动态效果」，确认下拉面板即时出现且无位移。
