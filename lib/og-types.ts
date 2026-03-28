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

/** Document-level metadata: `<title>` and `meta[name="description"]` (not `og:*` / `twitter:*`). */
export interface DocumentMetaSlice {
  title: string
  description: string
}

export interface Metadata {
  url: string
  doc: DocumentMetaSlice
  openGraph: OpenGraphSlice
  twitter: TwitterTagsSlice
  favicon?: string
}

/**
 * X/Twitter preview: Twitter Card tags per field first, then Open Graph when
 * that field has no Twitter tag.
 */
export function effectiveTwitterPreview(data: Metadata): {
  title: string
  description: string
  image: string
  isValidImage: boolean
  /** Normalized `twitter:card` (e.g. `summary`, `summary_large_image`). */
  card: string | undefined
} {
  const og = data.openGraph
  const tw = data.twitter
  const docTitle = data.doc.title?.trim() ?? ''
  const docDesc = data.doc.description?.trim() ?? ''

  const title = tw.title?.trim() || og.title?.trim() || docTitle
  const description =
    tw.description?.trim() || og.description?.trim() || docDesc

  const hasTwImage = Boolean(tw.image?.trim())
  const image = hasTwImage ? tw.image : og.image
  const isValidImage = hasTwImage ? tw.isValidImage : og.isValidImage

  const raw = tw.card?.trim().toLowerCase()
  const card = raw || undefined

  return { title, description, image, isValidImage, card }
}

/**
 * Slack link unfurl: Open Graph first, then Twitter Card tags, then document HTML
 * (Slack falls back to Twitter metadata when OG is missing).
 */
export function effectiveSlackPreview(data: Metadata): {
  title: string
  description: string
  image: string
  isValidImage: boolean
} {
  const og = data.openGraph
  const tw = data.twitter
  const docTitle = data.doc.title?.trim() ?? ''
  const docDesc = data.doc.description?.trim() ?? ''

  const title = og.title?.trim() || tw.title?.trim() || docTitle
  const description =
    og.description?.trim() || tw.description?.trim() || docDesc

  const hasOgImage = Boolean(og.image?.trim()) && og.isValidImage
  const hasTwImage = Boolean(tw.image?.trim()) && tw.isValidImage
  const image = hasOgImage ? og.image : hasTwImage ? tw.image : ''
  const isValidImage = hasOgImage || hasTwImage

  return { title, description, image, isValidImage }
}
