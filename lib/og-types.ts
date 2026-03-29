export interface DocumentMetadata {
  url: string
  favicon: string | null
  doc: {
    title: string
    description: string
  }
  openGraph: {
    title: string
    description: string
    image: string
    isValidImage: boolean
    siteName?: string
    type?: string
  }
  twitter: {
    title: string
    description: string
    image: string
    isValidImage: boolean
    card?: string
    site?: string
  }
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
