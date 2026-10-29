<script setup>
import { DanToolCallCard } from '@dandan-ui/ui'
</script>

<template>
  <div style="display: grid; gap: 12px; max-width: 480px">
    <DanToolCallCard
      name="search_docs"
      status="running"
      :input="{ query: 'InputTag' }"
      default-expanded
    />
    <DanToolCallCard
      name="search_docs"
      status="done"
      :input="{ query: 'InputTag' }"
      :output="{ hits: 3 }"
    />
  </div>
</template>
