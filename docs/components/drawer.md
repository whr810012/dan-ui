<script setup>
import DemoBlock from '../.vitepress/components/DemoBlock.vue'
import Basic from './demos/drawer/basic.vue'
import basicSrc from './demos/drawer/basic.vue?raw'
</script>

# Drawer 抽屉

从屏幕边缘滑出的面板，适合表单与详情。

## 基础用法

<DemoBlock :source="basicSrc">
  <Basic />
</DemoBlock>

## Props

| 属性 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| modelValue / v-model | 是否显示 | `boolean` | `false` |
| title | 标题 | `string` | `''` |
| size | 宽度或高度 | `string` | `'30%'` |
| direction | 方向 | `'rtl' \| 'ltr' \| 'ttb' \| 'btt'` | `'rtl'` |
| showClose | 显示关闭按钮 | `boolean` | `true` |
| closeOnClickModal | 点击遮罩关闭 | `boolean` | `true` |
| closeOnPressEscape | Esc 关闭 | `boolean` | `true` |
| destroyOnClose | 关闭后销毁 | `boolean` | `false` |
| withHeader | 是否显示头部 | `boolean` | `true` |
