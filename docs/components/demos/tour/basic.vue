<script setup>
import { ref } from 'vue'
import { DanButton, DanTour } from '@dandan-ui/ui'

const open = ref(false)
const current = ref(0)
const steps = [
  {
    target: '#tour-demo-btn',
    title: '开始',
    description: '点击这里可以打开引导。',
  },
  {
    title: '完成',
    description: '这是第二步，可以点完成结束。',
  },
]

function startTour() {
  current.value = 0
  open.value = true
}
</script>

<template>
  <div>
    <DanButton id="tour-demo-btn" type="primary" @click="startTour">
      打开引导
    </DanButton>
    <DanTour v-model="open" v-model:current="current" :steps="steps" />
  </div>
</template>
