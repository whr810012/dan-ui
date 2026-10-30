import { withInstall } from '../../utils/withInstall'
import Slider from './Slider.vue'

export const DanSlider = withInstall(Slider, undefined, 'DanSlider')
export default DanSlider
export type DanSliderInstance = InstanceType<typeof Slider>
export type { SliderMark } from './Slider.vue'
