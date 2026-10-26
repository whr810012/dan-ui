<script setup>
import { ref } from 'vue'
import { DanTabs, DanTabPane } from '@dan-ui/ui'

const active = ref('profile')
</script>

<template>
  <DanTabs v-model="active">
    <DanTabPane label="用户管理" name="user">用户管理内容</DanTabPane>
    <DanTabPane label="配置管理" name="config">配置管理内容</DanTabPane>
    <DanTabPane label="角色管理" name="role" disabled>角色管理内容</DanTabPane>
    <DanTabPane label="定时任务" name="profile">定时任务内容</DanTabPane>
  </DanTabs>
</template>
