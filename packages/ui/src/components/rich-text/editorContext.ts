import type { Editor } from '@tiptap/vue-3'
import type { Ref } from 'vue'
import { createContext } from '../../utils/createContext'

export interface RichTextContext {
  editor: Ref<Editor | undefined>
  disabled: Ref<boolean | undefined>
}

export const [provideRichText, injectRichText, richTextContextKey] =
  createContext<RichTextContext>('DanRichText')
