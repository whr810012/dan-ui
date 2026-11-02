<script setup>
import { ref } from 'vue'
import { DanMenu, DanMenuItem, DanSubMenu } from '@dandan-ui/ui'

const active = ref('1-1')
const openeds = ref(['1'])
</script>

<template>
  <DanMenu
    v-model="active"
    v-model:openeds="openeds"
    unique-opened
    style="width: 220px"
  >
    <DanSubMenu index="1" title="导航一">
      <DanMenuItem index="1-1">选项 1</DanMenuItem>
      <DanMenuItem index="1-2">选项 2</DanMenuItem>
    </DanSubMenu>
    <DanSubMenu index="2" title="导航二">
      <DanMenuItem index="2-1">选项 A</DanMenuItem>
      <DanMenuItem index="2-2">选项 B</DanMenuItem>
    </DanSubMenu>
    <DanSubMenu index="3" title="导航三">
      <DanMenuItem index="3-1">选项 X</DanMenuItem>
    </DanSubMenu>
  </DanMenu>
</template>
