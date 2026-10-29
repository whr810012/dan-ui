import type { App, Plugin } from 'vue'
import { withInstall } from '../../utils/withInstall'
import Paragraph from './Paragraph.vue'
import Text from './Text.vue'
import Title from './Title.vue'

export const DanText = withInstall(Text, undefined, 'DanText')
export const DanTitle = withInstall(Title, undefined, 'DanTitle')
export const DanParagraph = withInstall(Paragraph, undefined, 'DanParagraph')

export const DanTypography: Plugin = {
  install(app: App) {
    app.use(DanText)
    app.use(DanTitle)
    app.use(DanParagraph)
  },
}

export default DanTypography
export type DanTextInstance = InstanceType<typeof Text>
export type DanTitleInstance = InstanceType<typeof Title>
export type DanParagraphInstance = InstanceType<typeof Paragraph>
