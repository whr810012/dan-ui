<script setup>
import { ref } from 'vue'
import { DanCollapse, DanCollapseItem } from '@dandan-ui/ui'

const active = ref(['1'])
</script>

<template>
  <DanCollapse v-model="active" accordion>
    <DanCollapseItem title="自定义图标" name="1">
      <template #icon="{ active: isActive }">
        <span style="font-size: 12px; color: var(--dan-color-primary)">
          {{ isActive ? '收起' : '展开' }}
        </span>
      </template>
      可通过 `#icon` 插槽替换默认箭头。
    </DanCollapseItem>
    <DanCollapseItem title="隐藏图标" name="2" hide-icon>
      设置 `hide-icon` 可隐藏右侧图标区域。
    </DanCollapseItem>
  </DanCollapse>
</template>
