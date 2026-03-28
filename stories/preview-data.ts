import type { PlatformPreviewsProps } from '@/components/previews/types'
import type { Metadata } from '@/lib/og-types'
import {
  TWITTER_SHORT_DESCRIPTION,
  TWITTER_SHORT_TITLE,
} from '@/lib/og-test-html'

const SAMPLE_IMAGE =
  'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1200&h=630&fit=crop'
const SAMPLE_URL = 'https://example.com/article/how-to-build-great-products'

const SAMPLE_FAVICON =
  'https://www.google.com/s2/favicons?domain=example.com&sz=64'

const emptyTwitter: Metadata['twitter'] = {
  title: '',
  description: '',
  image: '',
  isValidImage: false,
}

function baseMetadata(openGraph: Metadata['openGraph']): Metadata {
  return {
    url: SAMPLE_URL,
    doc: {
      title: openGraph.title,
      description: openGraph.description,
    },
    openGraph,
    twitter: { ...emptyTwitter },
    favicon: SAMPLE_FAVICON,
  }
}

type PreviewData = PlatformPreviewsProps

export const completeData: PreviewData = {
  data: baseMetadata({
    title: 'How to Build Great Products - A Comprehensive Guide',
    description:
      'Learn the fundamentals of product development and design thinking.',
    image: SAMPLE_IMAGE,
    isValidImage: true,
    siteName: 'Example',
    type: 'website',
  }),
  isLoading: false,
  isError: false,
  isValidUrl: true,
}

export const longTitleData: PreviewData = {
  ...completeData,
  data: baseMetadata({
    ...completeData.data!.openGraph,
    title:
      'This is an extremely long title that should be truncated because it exceeds the available space in the Twitter card preview component and we need to handle this gracefully',
  }),
}

export const shortTitleData: PreviewData = {
  ...completeData,
  data: baseMetadata({
    ...completeData.data!.openGraph,
    title: 'Hello',
  }),
}

/** `twitter:card` = summary: small square image left, text column right. */
export const summaryCardData: PreviewData = {
  ...completeData,
  data: {
    ...completeData.data!,
    url: 'https://ogmeta.app/tests/twitter-card-summary',
    twitter: {
      title: TWITTER_SHORT_TITLE,
      description: TWITTER_SHORT_DESCRIPTION,
      image: SAMPLE_IMAGE,
      isValidImage: true,
      card: 'summary',
    },
  },
}

export const missingImageData: PreviewData = {
  ...completeData,
  data: baseMetadata({
    ...completeData.data!.openGraph,
    image: '',
    isValidImage: false,
  }),
}

export const invalidImageData: PreviewData = {
  ...completeData,
  data: baseMetadata({
    ...completeData.data!.openGraph,
    image: 'https://example.com/broken-image.jpg',
    isValidImage: false,
  }),
}

export const missingTitleData: PreviewData = {
  ...completeData,
  data: baseMetadata({
    ...completeData.data!.openGraph,
    title: '',
  }),
}

export const loadingData: PreviewData = {
  data: null,
  urlInput: SAMPLE_URL,
  isLoading: true,
  isError: false,
  isValidUrl: true,
}

export const failedToFetchData: PreviewData = {
  data: null,
  urlInput: SAMPLE_URL,
  isLoading: false,
  isError: true,
  isValidUrl: true,
}

export const invalidUrlData: PreviewData = {
  data: null,
  urlInput: 'not-a-valid-url',
  isLoading: false,
  isError: false,
  isValidUrl: false,
}
