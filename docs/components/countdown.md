<script setup>
import DemoBlock from '../.vitepress/components/DemoBlock.vue'
import Basic from './demos/countdown/basic.vue'
import basicSrc from './demos/countdown/basic.vue?raw'
</script>

# Countdown 倒计时

## 基础用法

<DemoBlock :source="basicSrc">
  <Basic />
</DemoBlock>

`format` 支持 `DD` / `HH` / `mm` / `ss`；结束触发 `finish`。
