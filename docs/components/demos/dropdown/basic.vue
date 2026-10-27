<script setup lang="ts">
import {
  DanButton,
  DanDropdown,
  DanDropdownItem,
  DanDropdownMenu,
  DanMessage,
} from '@dandan-ui/ui'

function onCommand(command: string | number | object) {
  DanMessage.success(`选择了：${String(command)}`)
}
</script>

<template>
  <DanDropdown @command="onCommand">
    <DanButton type="primary">操作菜单</DanButton>
    <template #dropdown>
      <DanDropdownMenu>
        <DanDropdownItem command="edit">编辑</DanDropdownItem>
        <DanDropdownItem command="share">分享</DanDropdownItem>
        <DanDropdownItem command="delete" divided disabled>
          删除
        </DanDropdownItem>
      </DanDropdownMenu>
    </template>
  </DanDropdown>
</template>
