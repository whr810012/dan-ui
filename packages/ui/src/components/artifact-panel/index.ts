import { withInstall } from '../../utils/withInstall'
import ArtifactPanel from './ArtifactPanel.vue'

export const DanArtifactPanel = withInstall(
  ArtifactPanel,
  undefined,
  'DanArtifactPanel',
)
export default DanArtifactPanel
export type DanArtifactPanelInstance = InstanceType<typeof ArtifactPanel>
