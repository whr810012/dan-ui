<script setup>
import { DanButton, DanDropdown, DanDropdownItem, DanDropdownMenu, DanSpace } from '@dandan-ui/ui'
</script>

<template>
  <DanSpace wrap>
    <DanDropdown trigger="hover" :show-after="120">
      <DanButton>悬停</DanButton>
      <template #dropdown>
        <DanDropdownMenu>
          <DanDropdownItem command="a">选项 A</DanDropdownItem>
          <DanDropdownItem command="b">选项 B</DanDropdownItem>
        </DanDropdownMenu>
      </template>
    </DanDropdown>
    <DanDropdown trigger="focus" :show-after="0">
      <DanButton>聚焦</DanButton>
      <template #dropdown>
        <DanDropdownMenu>
          <DanDropdownItem command="a">选项 A</DanDropdownItem>
        </DanDropdownMenu>
      </template>
    </DanDropdown>
    <DanDropdown trigger="contextmenu">
      <DanButton>右键</DanButton>
      <template #dropdown>
        <DanDropdownMenu>
          <DanDropdownItem command="a">选项 A</DanDropdownItem>
        </DanDropdownMenu>
      </template>
    </DanDropdown>
  </DanSpace>
</template>
