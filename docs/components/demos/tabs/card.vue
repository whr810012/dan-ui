<script setup>
import { ref } from 'vue'
import { DanTabs, DanTabPane } from '@dan-ui/ui'

const active = ref('a')
</script>

<template>
  <DanTabs v-model="active" type="card">
    <DanTabPane label="选项一" name="a">卡片样式选项一</DanTabPane>
    <DanTabPane label="选项二" name="b">卡片样式选项二</DanTabPane>
    <DanTabPane label="选项三" name="c">卡片样式选项三</DanTabPane>
  </DanTabs>
</template>
