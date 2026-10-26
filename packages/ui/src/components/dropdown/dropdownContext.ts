import type { Ref } from 'vue'
import { createContext } from '../../utils/createContext'

export interface DropdownContext {
  visible: Ref<boolean>
  handleCommand: (command: string | number | object) => void
  close: () => void
}

export const [provideDropdown, injectDropdown, dropdownContextKey] =
  createContext<DropdownContext>('DanDropdown')
