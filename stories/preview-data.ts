import type { PlatformPreviewsProps } from '@/app/(app)/components/previews/types'
import {
  ogTestFixturePageUrl,
  ogTestFixtureToPlatformPreviewsProps,
} from '@/stories/og-test-fixture-preview'
import {
  OG_TEST_FIXTURES,
  OG_TEST_INVALID_URL_INPUT,
} from '@/tests/og-test-fixtures'

type PreviewData = PlatformPreviewsProps

export const completeData: PreviewData = ogTestFixtureToPlatformPreviewsProps(
  'complete-short',
  OG_TEST_FIXTURES['complete-short']
)

export const failedToFetchData: PreviewData = {
  data: null,
  urlInput: ogTestFixturePageUrl('complete-short'),
  isLoading: false,
  isError: true,
  isValidUrl: true,
  isURLReady: true,
}

/** Input that does not pass URL validation ({@link OG_TEST_INVALID_URL_INPUT}). */
export const invalidUrlData: PreviewData = {
  data: null,
  urlInput: OG_TEST_INVALID_URL_INPUT,
  isLoading: false,
  isError: false,
  isValidUrl: false,
  isURLReady: true,
}
