import { withInstall } from '../../utils/withInstall'
import Dropdown from './Dropdown.vue'
import DropdownItem from './DropdownItem.vue'
import DropdownMenu from './DropdownMenu.vue'

export const DanDropdown = withInstall(Dropdown, undefined, 'DanDropdown')
export const DanDropdownMenu = withInstall(
  DropdownMenu,
  undefined,
  'DanDropdownMenu',
)
export const DanDropdownItem = withInstall(
  DropdownItem,
  undefined,
  'DanDropdownItem',
)

export default DanDropdown
export type DanDropdownInstance = InstanceType<typeof Dropdown>
export type DanDropdownMenuInstance = InstanceType<typeof DropdownMenu>
export type DanDropdownItemInstance = InstanceType<typeof DropdownItem>
