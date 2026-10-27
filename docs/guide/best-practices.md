<script setup>
import DemoBlock from '../.vitepress/components/DemoBlock.vue'
import AdminShell from './demos/best-practices/admin-shell.vue'
import adminShellSrc from './demos/best-practices/admin-shell.vue?raw'
</script>

# 最佳实践

面向中后台的推荐组合：**Layout 壳子 + Form 录入 + Table 列表**。

## Layout + Form + Table

侧栏导航、顶栏标题、主区表单筛选与表格列表是最常见的页面骨架。下面示例展示三者如何拼在一起（精简数据，便于文档演示）。

<DemoBlock :source="adminShellSrc">
  <AdminShell />
</DemoBlock>

## 表单建议

- 用 `DanForm` + `DanFormItem` 统一校验与禁用态，控件尽量走 `v-model`。
- 复杂录入优先复用现有字段组件（DatePicker / Cascader / Transfer），避免在业务侧自造面板。
- 不可选日期用 `disabledDate`；常用区间用 `shortcuts`；需要时刻用 `datetime` / `datetimerange`。
- 提交前调用 `formRef.validate()`；异步提交时用按钮 `loading` 防重复。

## 表格建议

- 列定义放在 `columns` 数组，筛选与排序交给 Table 内置能力。
- 左右固定列用 `fixed: 'left' | 'right'`；操作列建议固定右侧。
- 批量操作：`selection` + 受控 `selectedRowKeys`；树表仅对当前可见扁平行勾选。
- 行详情用 `expandable` + `#expand`，与树表 `tree` 展开区分开。
- 合计用 `showSummary` / `summaryMethod`；大数据量再评估 `virtual` 或 `DanPagination`。
- 行内操作（编辑 / 删除）放在自定义列 slot，避免把业务逻辑塞进表格组件本身。

## 上传建议

- 自定义直传实现 `httpRequest`，可返回 `{ abort }`；组件侧用 `abort` / `abortAll` / `retry`。
- 大文件设 `chunkSize`，在 `beforeChunkUpload` 里申请分片凭证；**不要**在组件库内绑定云厂商 SDK。

## 浮层建议

- Dialog / Drawer / MessageBox 已启用焦点陷阱：打开后 Tab 循环在面板内，关闭后焦点回到触发元素。
- 需要确认的破坏性操作优先 `MessageBox`；轻量提示用 `Message` / `Notification`。
- 键盘路径约定见 [无障碍与键盘](/guide/accessibility)。

## 暗色建议

- 业务页根节点与文档站一致：`html.dark` 或 `data-theme="dark"`。
- 自研浮层背景用 `--dan-color-bg-elevated`，遮罩用 `--dan-color-mask` / `--dan-color-loading-mask`。
- 抽检清单见 [发布与视觉清单](/guide/checklist)。
