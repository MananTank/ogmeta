import type { PreviewViewport } from '@/lib/preview-viewport'
import type { OGMetadata } from '@/lib/og-types'

export type { PreviewViewport }

export type PlatformPreviewsProps = {
  data: OGMetadata | null
  isLoading: boolean
  isError: boolean
  previewViewport?: PreviewViewport
  /** Shown when `data` is missing (e.g. current input before a successful fetch). */
  urlInput?: string
  isValidUrl?: boolean
}
