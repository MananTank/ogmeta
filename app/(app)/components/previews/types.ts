import type { PreviewViewport } from '@/lib/preview-viewport'
import type { DocumentMetadata } from '@/lib/og-types'

export type { PreviewViewport }

export type PlatformPreviewsProps = {
  data: DocumentMetadata | null
  isLoading: boolean
  isError: boolean
  previewViewport?: PreviewViewport
  urlInput: string
  isValidUrl: boolean
  isURLReady: boolean
}
