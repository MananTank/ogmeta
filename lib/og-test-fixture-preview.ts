import type { PlatformPreviewsProps } from '@/components/previews/types'
import type { OgTestFixture } from '@/lib/og-test-fixtures'
import { ogTestOptionsToOgMetadata } from '@/lib/og-test-html'

/** Default `/tests/[slug]` slug for Ladle preview data and error-state stories. */
export const OG_TEST_DEFAULT_FIXTURE_SLUG = 'complete-short' as const

export function ogTestFixturePageUrl(fixtureSlug: string): string {
  return `https://ogmeta.app/tests/${fixtureSlug}`
}

/**
 * Maps a fixture to {@link PlatformPreviewsProps} for Slack (and other) previews,
 * using the same strings and image rules as `/tests/[slug]`.
 */
export function ogTestFixtureToPlatformPreviewsProps(
  fixtureSlug: string,
  fixture: OgTestFixture
): PlatformPreviewsProps {
  const url = ogTestFixturePageUrl(fixtureSlug)

  return {
    data: ogTestOptionsToOgMetadata(fixture.config, url),
    isLoading: false,
    isError: false,
    isValidUrl: true,
    urlInput: url,
  }
}
