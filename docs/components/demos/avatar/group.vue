<script setup>
import { DanAvatar, DanAvatarGroup, DanSpace } from '@dandan-ui/ui'
</script>

<template>
  <DanSpace direction="vertical">
    <DanAvatarGroup :max="3" size="large">
      <DanAvatar>A</DanAvatar>
      <DanAvatar>B</DanAvatar>
      <DanAvatar>C</DanAvatar>
      <DanAvatar>D</DanAvatar>
      <DanAvatar>E</DanAvatar>
    </DanAvatarGroup>
    <DanAvatarGroup size="small" shape="square">
      <DanAvatar>北</DanAvatar>
      <DanAvatar>京</DanAvatar>
      <DanAvatar>团</DanAvatar>
    </DanAvatarGroup>
  </DanSpace>
</template>
