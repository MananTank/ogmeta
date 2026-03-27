/** Parsed from og:* tags (and HTML fallbacks where typical for OG consumers). */
export interface OpenGraphSlice {
  title: string
  description: string
  image: string
  isValidImage: boolean
  siteName?: string
  type?: string
}

/** Parsed only from twitter:* tags; no OG mixed in. */
export interface TwitterTagsSlice {
  title: string
  description: string
  image: string
  isValidImage: boolean
  card?: string
  /** From `twitter:site` (e.g. `@brand` or handle). */
  site?: string
}

export interface OGMetadata {
  url: string
  openGraph: OpenGraphSlice
  twitter: TwitterTagsSlice
  favicon?: string
}

/**
 * X/Twitter preview: Twitter Card tags per field first, then Open Graph when
 * that field has no Twitter tag.
 */
export function effectiveTwitterPreview(data: OGMetadata): {
  title: string
  description: string
  image: string
  isValidImage: boolean
  /** Normalized `twitter:card` (e.g. `summary`, `summary_large_image`). */
  card: string | undefined
} {
  const og = data.openGraph
  const tw = data.twitter

  const title = tw.title?.trim() ? tw.title : og.title
  const description = tw.description?.trim() ? tw.description : og.description

  const hasTwImage = Boolean(tw.image?.trim())
  const image = hasTwImage ? tw.image : og.image
  const isValidImage = hasTwImage ? tw.isValidImage : og.isValidImage

  const raw = tw.card?.trim().toLowerCase()
  const card = raw || undefined

  return { title, description, image, isValidImage, card }
}
