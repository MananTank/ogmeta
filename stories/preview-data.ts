import type { PlatformPreviewsProps } from '@/components/platform-previews'

const SAMPLE_IMAGE =
  'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1200&h=630&fit=crop'
const SAMPLE_URL = 'https://example.com/article/how-to-build-great-products'

type PreviewData = Omit<PlatformPreviewsProps, never>

export const completeData: PreviewData = {
  title: 'How to Build Great Products - A Comprehensive Guide',
  description:
    'Learn the fundamentals of product development and design thinking.',
  image: SAMPLE_IMAGE,
  isValidImage: true,
  url: SAMPLE_URL,
  favicon:
    'https://www.google.com/s2/favicons?domain=example.com&sz=64',
  isLoading: false,
  isError: false,
  isValidUrl: true,
}

export const longTitleData: PreviewData = {
  ...completeData,
  title:
    'This is an extremely long title that should be truncated because it exceeds the available space in the Twitter card preview component and we need to handle this gracefully',
}

export const shortTitleData: PreviewData = {
  ...completeData,
  title: 'Hello',
}

export const missingImageData: PreviewData = {
  ...completeData,
  image: '',
  isValidImage: false,
}

export const invalidImageData: PreviewData = {
  ...completeData,
  image: 'https://example.com/broken-image.jpg',
  isValidImage: false,
}

export const missingTitleData: PreviewData = {
  ...completeData,
  title: '',
}

export const loadingData: PreviewData = {
  title: '',
  description: '',
  image: '',
  isValidImage: false,
  url: SAMPLE_URL,
  isLoading: true,
  isError: false,
  isValidUrl: true,
}

export const failedToFetchData: PreviewData = {
  title: '',
  description: '',
  image: '',
  isValidImage: false,
  url: SAMPLE_URL,
  isLoading: false,
  isError: true,
  isValidUrl: true,
}

export const invalidUrlData: PreviewData = {
  title: '',
  description: '',
  image: '',
  isValidImage: false,
  url: 'not-a-valid-url',
  isLoading: false,
  isError: false,
  isValidUrl: false,
}
