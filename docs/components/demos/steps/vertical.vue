<script setup>
import { DanSteps, DanStep } from '@dandan-ui/ui'
</script>

<template>
  <DanSteps :active="1" direction="vertical" style="max-width: 320px">
    <DanStep title="创建项目" description="初始化仓库与脚手架" />
    <DanStep title="开发组件" description="按 Sprint 推进导航能力" />
    <DanStep title="文档验收" description="Demo 与 API 同步" />
  </DanSteps>
</template>
