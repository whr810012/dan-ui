# 无障碍与键盘

七期收官对浮层与模态做了基础键盘路径补齐。下文是当前约定与自检清单。

## 已支持

| 场景 | 行为 |
|------|------|
| Dialog / Drawer | `role="dialog"` + `aria-modal`；Esc 关闭；**焦点陷阱**（Tab / Shift+Tab 循环）；关闭后焦点还原 |
| Select / Dropdown / Popover | Esc 关闭面板 |
| 图标装饰 | 常见箭头等使用 `aria-hidden` |
| 关闭按钮 | 提供 `aria-label="关闭"` |

底层工具：`useFocusTrap`（已从 `@dan-ui/ui` 导出），业务自定义模态也可复用。

## 自检清单

发布或大改浮层前，建议手测：

1. 仅用键盘打开 Dialog，焦点落在面板内首个可聚焦控件。
2. Tab 不会逃出遮罩到背后页面。
3. Esc 关闭后，焦点回到打开按钮。
4. 屏幕阅读器能读到对话框标题（必要时给面板加 `aria-labelledby`）。
5. 暗色模式下对比度仍可辨认（尤其边框 / 占位符 / disabled）。

## 后续可选

- MessageBox / Notification 焦点与朗读优先级
- 下拉列表方向键选中
- 全量组件 `aria-*` 巡检与对比度自动化
