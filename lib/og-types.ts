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

export interface DocumentMetadata {
  url: string
  doc: DocumentMetaSlice
  openGraph: OpenGraphSlice
  twitter: TwitterTagsSlice
  favicon?: string
}

/**
 * Slack link unfurl: Open Graph first, then Twitter Card tags, then document HTML
 * (Slack falls back to Twitter metadata when OG is missing).
 */
export function effectiveSlackPreview(data: DocumentMetadata): {
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

/**
 * Facebook link preview: Open Graph only (not Twitter Card). Title falls back to
 * document title, then hostname — matches observed behavior in OG test fixtures.
 */
type FacebookPreviewImageMode = 'large' | 'broken' | 'none'

export function effectiveFacebookPreview(data: DocumentMetadata): {
  title: string
  description: string
  imageMode: FacebookPreviewImageMode
  /** Absolute og:image URL when mode is `large` or `broken` */
  imageSrc: string
} {
  const og = data.openGraph
  const doc = data.doc
  const url = data.url

  function hostnameLabel(): string {
    try {
      return new URL(url).hostname.replace(/^www\./, '')
    } catch {
      return ''
    }
  }

  const title = og.title?.trim() || doc.title?.trim() || hostnameLabel()
  const description = og.description?.trim() || doc.description?.trim() || ''

  const imageSrc = og.image?.trim() ?? ''
  if (!imageSrc) {
    return { title, description, imageMode: 'none', imageSrc: '' }
  }
  if (!og.isValidImage) {
    return { title, description, imageMode: 'broken', imageSrc }
  }
  return { title, description, imageMode: 'large', imageSrc }
}

const LINKEDIN_FALLBACK_TITLE = 'Web Link'

/**
 * LinkedIn link preview: Open Graph only (Twitter tags are not used for the snippet).
 * With `og:image`: thumbnail + title + domain (no description in the compact strip).
 * Without a valid image: text-only card — title, domain, and description when present.
 */
export function effectiveLinkedInPreview(data: DocumentMetadata): {
  title: string
  description: string
  showImage: boolean
  imageSrc: string
} {
  const og = data.openGraph
  const doc = data.doc

  const title = og.title?.trim() || doc.title?.trim() || LINKEDIN_FALLBACK_TITLE

  const description = og.description?.trim() || doc.description?.trim() || ''

  const imageSrc = og.image?.trim() ?? ''
  const showImage = Boolean(imageSrc) && og.isValidImage

  return { title, description, showImage, imageSrc }
}
