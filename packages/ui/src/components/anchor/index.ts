import { withInstall } from '../../utils/withInstall'
import Anchor from './Anchor.vue'
import AnchorLink from './AnchorLink.vue'

export const DanAnchor = withInstall(
  Anchor,
  { DanAnchorLink: AnchorLink },
  'DanAnchor',
)
export const DanAnchorLink = withInstall(AnchorLink, undefined, 'DanAnchorLink')

export default DanAnchor
export type DanAnchorInstance = InstanceType<typeof Anchor>
export type DanAnchorLinkInstance = InstanceType<typeof AnchorLink>
