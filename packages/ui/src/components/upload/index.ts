import { withInstall } from '../../utils/withInstall'
import Upload from './Upload.vue'

export const DanUpload = withInstall(Upload, undefined, 'DanUpload')
export default DanUpload
export type DanUploadInstance = InstanceType<typeof Upload>
export type {
  UploadBeforeChunkHook,
  UploadChunkInfo,
  UploadFile,
  UploadRawFile,
  UploadRequestHandler,
  UploadRequestOptions,
  UploadRequestResult,
  UploadStatus,
  UploadUserFile,
} from './types'
