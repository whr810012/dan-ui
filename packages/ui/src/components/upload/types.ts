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

export interface UploadRequestOptions {
  file: UploadRawFile
  onProgress: (percent: number) => void
  onSuccess: (response?: unknown) => void
  onError: (error?: unknown) => void
}

export type UploadRequestHandler = (
  options: UploadRequestOptions,
) => void | Promise<unknown>
