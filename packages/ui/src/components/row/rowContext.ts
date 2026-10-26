import type { Ref } from 'vue'
import { createContext } from '../../utils/createContext'

export interface RowContext {
  gutter: Ref<number>
}

export const [provideRow, injectRow, rowContextKey] =
  createContext<RowContext>('DanRow')
