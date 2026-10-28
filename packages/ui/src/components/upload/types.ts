export type UploadStatus = 'ready' | 'uploading' | 'success' | 'fail'

export interface UploadRawFile extends File {
  uid?: number
}

export interface UploadFile {
  name: string
  size?: number
  percentage?: number
  status: UploadStatus
  uid: number
  raw?: UploadRawFile
  url?: string
  response?: unknown
}

export type UploadUserFile = Partial<UploadFile> &
  Pick<UploadFile, 'name' | 'uid'>

export interface UploadChunkInfo {
  index: number
  start: number
  end: number
  total: number
  blob: Blob
}

export interface UploadRequestOptions {
  file: UploadRawFile
  /** 当前分片信息；整文件上传时为空 */
  chunk?: UploadChunkInfo
  onProgress: (percent: number) => void
  onSuccess: (response?: unknown) => void
  onError: (error?: unknown) => void
}

export type UploadRequestResult =
  | void
  | Promise<unknown>
  | { abort?: () => void }

export type UploadRequestHandler = (
  options: UploadRequestOptions,
) => UploadRequestResult

export type UploadBeforeChunkHook = (
  chunk: UploadChunkInfo,
  file: UploadFile,
) => boolean | Promise<boolean>

/** 返回已上传完成的分片 index，用于断点续传跳过 */
export type UploadGetUploadedChunks = (
  file: UploadFile,
) => number[] | Promise<number[]>

export interface UploadChunkSuccessMeta {
  index: number
  etag?: string
  response?: unknown
}
