import type { PlatformPreviewsProps } from '@/components/previews/types'
import {
  ogTestFixturePageUrl,
  ogTestFixtureToPlatformPreviewsProps,
  OG_TEST_DEFAULT_FIXTURE_SLUG,
} from '@/lib/og-test-fixture-preview'
import { OG_TEST_FIXTURES, OG_TEST_INVALID_URL_INPUT } from '@/lib/og-test-fixtures'

type PreviewData = PlatformPreviewsProps

/** Same as `/tests/complete-short` fixture metadata. */
export const completeData: PreviewData = ogTestFixtureToPlatformPreviewsProps(
  OG_TEST_DEFAULT_FIXTURE_SLUG,
  OG_TEST_FIXTURES[OG_TEST_DEFAULT_FIXTURE_SLUG]
)

/** Valid fixture URL but fetch failed before metadata exists. */
export const failedToFetchData: PreviewData = {
  data: null,
  urlInput: ogTestFixturePageUrl(OG_TEST_DEFAULT_FIXTURE_SLUG),
  isLoading: false,
  isError: true,
  isValidUrl: true,
}

/** Input that does not pass URL validation ({@link OG_TEST_INVALID_URL_INPUT}). */
export const invalidUrlData: PreviewData = {
  data: null,
  urlInput: OG_TEST_INVALID_URL_INPUT,
  isLoading: false,
  isError: false,
  isValidUrl: false,
}
