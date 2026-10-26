<script setup lang="ts">
import { DanIcon, iconNames } from '@dan-ui/ui'
</script>

<template>
  <div
    style="
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(108px, 1fr));
      gap: 12px;
    "
  >
    <div
      v-for="name in iconNames"
      :key="name"
      style="
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 8px;
        padding: 14px 8px;
        border: 1px solid var(--dan-color-border);
        border-radius: 8px;
        background: var(--dan-color-bg);
        font-size: 22px;
      "
    >
      <DanIcon :name="name" />
      <span style="font-size: 12px; color: var(--dan-color-text-secondary)">
        {{ name }}
      </span>
    </div>
  </div>
</template>
