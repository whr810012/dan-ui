<script setup lang="ts">
import { DanCol, DanRow } from '@dan-ui/ui'
</script>

<template>
  <DanRow :gutter="16">
    <DanCol :span="12">
      <div
        style="
          padding: 12px;
          background: var(--dan-color-primary-light);
          border-radius: 6px;
          text-align: center;
        "
      >
        span=12
      </div>
    </DanCol>
    <DanCol :span="12">
      <div
        style="
          padding: 12px;
          background: var(--dan-color-fill);
          border-radius: 6px;
          text-align: center;
        "
      >
        span=12
      </div>
    </DanCol>
  </DanRow>
  <DanRow :gutter="16" style="margin-top: 16px">
    <DanCol :span="8">
      <div
        style="
          padding: 12px;
          background: var(--dan-color-fill);
          border-radius: 6px;
          text-align: center;
        "
      >
        span=8
      </div>
    </DanCol>
    <DanCol :span="8">
      <div
        style="
          padding: 12px;
          background: var(--dan-color-primary-light);
          border-radius: 6px;
          text-align: center;
        "
      >
        span=8
      </div>
    </DanCol>
    <DanCol :span="8">
      <div
        style="
          padding: 12px;
          background: var(--dan-color-fill);
          border-radius: 6px;
          text-align: center;
        "
      >
        span=8
      </div>
    </DanCol>
  </DanRow>
</template>
