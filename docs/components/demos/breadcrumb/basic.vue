<script setup>
import { DanBreadcrumb, DanBreadcrumbItem } from '@dandan-ui/ui'
</script>

<template>
  <DanBreadcrumb separator="/">
    <DanBreadcrumbItem to="/">首页</DanBreadcrumbItem>
    <DanBreadcrumbItem to="/components">组件</DanBreadcrumbItem>
    <DanBreadcrumbItem>面包屑</DanBreadcrumbItem>
  </DanBreadcrumb>
</template>
