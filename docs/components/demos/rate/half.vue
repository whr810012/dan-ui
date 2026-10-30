<script setup>
import { ref } from 'vue'
import { DanRate, DanSpace } from '@dandan-ui/ui'

const half = ref(2.5)
const clearable = ref(3)
</script>

<template>
  <DanSpace direction="vertical">
    <div>
      <p style="margin: 0 0 8px; color: var(--dan-color-text-secondary)">
        半星：{{ half }}
      </p>
      <DanRate v-model="half" allow-half />
    </div>
    <div>
      <p style="margin: 0 0 8px; color: var(--dan-color-text-secondary)">
        可清空（再点同星）：{{ clearable }}
      </p>
      <DanRate v-model="clearable" clearable />
    </div>
  </DanSpace>
</template>
