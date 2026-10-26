<script setup lang="ts">
import { ref } from 'vue'
import {
  DanAside,
  DanButton,
  DanFooter,
  DanHeader,
  DanLayout,
  DanMain,
} from '@dan-ui/ui'

const collapsed = ref(false)
</script>

<template>
  <div style="height: 320px; border: 1px solid var(--dan-color-border)">
    <DanLayout style="height: 100%">
      <DanAside
        v-model:collapsed="collapsed"
        width="200px"
        collapsed-width="64px"
      >
        <div style="padding: 16px">
          {{ collapsed ? '导航' : '侧栏导航' }}
        </div>
      </DanAside>
      <DanLayout>
        <DanHeader>
          <div
            style="
              display: flex;
              align-items: center;
              justify-content: space-between;
              width: 100%;
            "
          >
            <strong>dan-ui Admin</strong>
            <DanButton size="small" @click="collapsed = !collapsed">
              {{ collapsed ? '展开侧栏' : '收起侧栏' }}
            </DanButton>
          </div>
        </DanHeader>
        <DanMain> 主内容区。Aside 支持 `v-model:collapsed`。 </DanMain>
        <DanFooter>© dan-ui</DanFooter>
      </DanLayout>
    </DanLayout>
  </div>
</template>
