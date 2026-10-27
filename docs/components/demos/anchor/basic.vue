<script setup>
import { DanAnchor, DanAnchorLink } from '@dan-ui/ui'
</script>

<template>
  <div style="display: flex; gap: 32px; align-items: flex-start">
    <DanAnchor
      :offset="80"
      style="min-width: 140px; position: sticky; top: 96px"
    >
      <DanAnchorLink href="#part-a" title="基础能力" />
      <DanAnchorLink href="#part-b" title="布局导航" />
      <DanAnchorLink href="#part-c" title="验收说明" />
    </DanAnchor>
    <div style="flex: 1; min-width: 0">
      <section id="part-a" style="margin-bottom: 48px">
        <h4 style="margin: 0 0 8px">基础能力</h4>
        <p style="margin: 0; color: var(--dan-color-text-secondary)">
          组件库提供统一 Token、按需导出与文档站 Demo。
        </p>
      </section>
      <section id="part-b" style="margin-bottom: 48px">
        <h4 style="margin: 0 0 8px">布局导航</h4>
        <p style="margin: 0; color: var(--dan-color-text-secondary)">
          Layout、Tabs、Menu、Steps、Anchor 等覆盖中后台常见结构。
        </p>
      </section>
      <section id="part-c" style="margin-bottom: 12px">
        <h4 style="margin: 0 0 8px">验收说明</h4>
        <p style="margin: 0; color: var(--dan-color-text-secondary)">
          点击左侧锚点可平滑滚动，并随滚动位置高亮当前章节。
        </p>
      </section>
    </div>
  </div>
</template>
