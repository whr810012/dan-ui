import { withInstall } from '../../utils/withInstall'
import Carousel from './Carousel.vue'
import CarouselItem from './CarouselItem.vue'

export const DanCarouselItem = withInstall(
  CarouselItem,
  undefined,
  'DanCarouselItem',
)
export const DanCarousel = withInstall(
  Carousel,
  { DanCarouselItem },
  'DanCarousel',
)

export default DanCarousel
export type DanCarouselInstance = InstanceType<typeof Carousel>
export type DanCarouselItemInstance = InstanceType<typeof CarouselItem>
