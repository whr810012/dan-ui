<script setup>
import { DanParagraph, DanSpace, DanText, DanTitle } from '@dandan-ui/ui'
</script>

<template>
  <DanSpace direction="vertical" align="start" style="width: 100%">
    <DanTitle :level="3">dan-ui Typography</DanTitle>
    <DanParagraph>
      用于中后台标题与正文排版。支持
      <DanText type="primary" strong>强调</DanText>、
      <DanText code>code</DanText>、
      <DanText mark>标记</DanText>。
    </DanParagraph>
    <DanText truncated style="max-width: 180px">
      这是一段会被截断的很长很长的文本内容示例
    </DanText>
  </DanSpace>
</template>
