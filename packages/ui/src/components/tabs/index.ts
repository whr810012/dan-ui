import { withInstall } from '../../utils/withInstall'
import TabPane from './TabPane.vue'
import Tabs from './Tabs.vue'

export const DanTabs = withInstall(Tabs, { DanTabPane: TabPane }, 'DanTabs')
export const DanTabPane = withInstall(TabPane, undefined, 'DanTabPane')

export default DanTabs
export type DanTabsInstance = InstanceType<typeof Tabs>
export type DanTabPaneInstance = InstanceType<typeof TabPane>
