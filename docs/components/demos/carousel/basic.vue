<script setup>
import { DanCarousel, DanCarouselItem } from '@dandan-ui/ui'
</script>

<template>
  <DanCarousel height="240px" arrow="always">
    <DanCarouselItem>
      <img src="/images/wall-sunset.png" alt="城墙日落" />
    </DanCarouselItem>
    <DanCarouselItem>
      <img src="/images/city-rainbow.png" alt="城市彩虹" />
    </DanCarouselItem>
    <DanCarouselItem>
      <img src="/images/blackhole.png" alt="黑洞" />
    </DanCarouselItem>
    <DanCarouselItem>
      <img src="/images/starburst.png" alt="星空" />
    </DanCarouselItem>
  </DanCarousel>
</template>
