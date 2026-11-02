<script setup>
import { DanBreadcrumb, DanBreadcrumbItem } from '@dandan-ui/ui'
</script>

<template>
  <div style="display: flex; flex-direction: column; gap: 16px">
    <DanBreadcrumb>
      <template #separator>
        <span style="color: var(--dan-color-primary)">›</span>
      </template>
      <DanBreadcrumbItem to="/">首页</DanBreadcrumbItem>
      <DanBreadcrumbItem to="/docs">文档</DanBreadcrumbItem>
      <DanBreadcrumbItem>当前页</DanBreadcrumbItem>
    </DanBreadcrumb>

    <DanBreadcrumb :max-items="3" separator=">">
      <DanBreadcrumbItem to="/">首页</DanBreadcrumbItem>
      <DanBreadcrumbItem to="/a">一级</DanBreadcrumbItem>
      <DanBreadcrumbItem to="/a/b">二级</DanBreadcrumbItem>
      <DanBreadcrumbItem to="/a/b/c">三级</DanBreadcrumbItem>
      <DanBreadcrumbItem>当前页</DanBreadcrumbItem>
    </DanBreadcrumb>
  </div>
</template>
