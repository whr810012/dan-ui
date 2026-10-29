<script setup lang="ts">
import { computed } from 'vue'
import { useNamespace } from '../../hooks/useNamespace'
import './style.css'

defineOptions({ name: 'DanChatWorkspace' })

const props = withDefaults(
  defineProps<{
    /** 是否显示左侧会话栏 */
    showSidebar?: boolean
    /** 是否显示右侧 Artifact */
    showArtifact?: boolean
    sidebarWidth?: string
    artifactWidth?: string
  }>(),
  {
    showSidebar: true,
    showArtifact: false,
    sidebarWidth: '260px',
    artifactWidth: '360px',
  },
)

const ns = useNamespace('chat-workspace')

const style = computed(() => ({
  '--dan-chat-sidebar-width': props.sidebarWidth,
  '--dan-chat-artifact-width': props.artifactWidth,
}))
</script>

<template>
  <div
    :class="[
      ns.b(),
      ns.is('with-sidebar', showSidebar),
      ns.is('with-artifact', showArtifact),
    ]"
    :style="style"
  >
    <aside v-if="showSidebar" :class="ns.e('sidebar')">
      <slot name="sidebar" />
    </aside>
    <main :class="ns.e('main')">
      <div :class="ns.e('messages')">
        <slot />
      </div>
      <div v-if="$slots.footer" :class="ns.e('footer')">
        <slot name="footer" />
      </div>
    </main>
    <aside v-if="showArtifact" :class="ns.e('artifact')">
      <slot name="artifact" />
    </aside>
  </div>
</template>
