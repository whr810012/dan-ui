<script setup>
import { ref } from 'vue'
import { DanRichText } from '@dandan-ui/ui'

const value = ref(
  '<h2>扩展能力演示</h2><p>支持<strong>加粗</strong>、<em>斜体</em>、<u>下划线</u>与<code>行内代码</code>。</p><ul><li>无序列表</li><li>有序列表见下</li></ul><ol><li>第一步</li><li>第二步</li></ol><blockquote>引用块</blockquote><pre><code>console.log("code block")</code></pre>',
)
</script>

<template>
  <DanRichText
    v-model="value"
    placeholder="试用工具栏：标题 / 列表 / 链接 / 代码"
  />
</template>
