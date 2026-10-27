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
- 提交前调用 `formRef.validate()`；异步提交时用按钮 `loading` 防重复。

## 表格建议

- 列定义放在 `columns` 数组，筛选与排序交给 Table 内置能力。
- 大数据量再评估虚拟滚动或分页；当前请优先 `DanPagination` 控制页码。
- 行内操作（编辑 / 删除）放在自定义列 slot，避免把业务逻辑塞进表格组件本身。

## 浮层建议

- Dialog / Drawer 已启用焦点陷阱：打开后 Tab 循环在面板内，关闭后焦点回到触发元素。
- 需要确认的破坏性操作优先 `MessageBox`；轻量提示用 `Message` / `Notification`。
