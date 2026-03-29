import type { DocumentMetadata } from '@/lib/og-types'

export function effectiveTwitterPreview(data: DocumentMetadata): {
  title: string
  description: string
  image: string
  isValidImage: boolean
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
