import { withInstall } from '../../utils/withInstall'
import ConfigProvider from './ConfigProvider.vue'

export const DanConfigProvider = withInstall(
  ConfigProvider,
  undefined,
  'DanConfigProvider',
)
export default DanConfigProvider
export type DanConfigProviderInstance = InstanceType<typeof ConfigProvider>
