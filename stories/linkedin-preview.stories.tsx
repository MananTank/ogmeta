import type { Story, StoryDefault } from '@ladle/react'
import { LinkedInPreview } from '@/components/previews/linkedin-preview'
import { NOT_A_RELEVANT_TEST, OG_TEST_FIXTURES } from '@/lib/og-test-fixtures'
import { ogTestFixtureToPlatformPreviewsProps } from '@/lib/og-test-fixture-preview'
import {
  completeData,
  longTitleData,
  shortTitleData,
  missingImageData,
  invalidImageData,
  missingTitleData,
  loadingData,
  failedToFetchData,
  invalidUrlData,
} from './preview-data'

export default {
  decorators: [
    (Story) => (
      <div className="py-10">
        <Story />
      </div>
    ),
  ],
} satisfies StoryDefault

function StoryGroup(props: { children: React.ReactNode }) {
  return <div className="flex flex-col gap-16">{props.children}</div>
}

function StoryLabel(props: { children: React.ReactNode }) {
  return (
    <div className="text-muted-foreground mb-2 text-center text-sm font-medium">
      {props.children}
    </div>
  )
}

export const FullData: Story = () => (
  <StoryGroup>
    <div>
      <StoryLabel>Complete OG Data</StoryLabel>
      <LinkedInPreview {...completeData} />
    </div>

    <div>
      <StoryLabel>Long Title (truncated)</StoryLabel>
      <LinkedInPreview {...longTitleData} />
    </div>

    <div>
      <StoryLabel>Short Title</StoryLabel>
      <LinkedInPreview {...shortTitleData} />
    </div>
  </StoryGroup>
)

export const PartialData: Story = () => (
  <StoryGroup>
    <div>
      <StoryLabel>Missing Image</StoryLabel>
      <LinkedInPreview {...missingImageData} />
    </div>

    <div>
      <StoryLabel>Invalid Image</StoryLabel>
      <LinkedInPreview {...invalidImageData} />
    </div>

    <div>
      <StoryLabel>Missing Title</StoryLabel>
      <LinkedInPreview {...missingTitleData} />
    </div>
  </StoryGroup>
)

export const TextOnly: Story = () => (
  <StoryGroup>
    <div>
      <StoryLabel>image-none</StoryLabel>
      <LinkedInPreview
        {...ogTestFixtureToPlatformPreviewsProps(
          'image-none',
          OG_TEST_FIXTURES['image-none']
        )}
      />
    </div>
    <div>
      <StoryLabel>only-title</StoryLabel>
      <LinkedInPreview
        {...ogTestFixtureToPlatformPreviewsProps(
          'only-title',
          OG_TEST_FIXTURES['only-title']
        )}
      />
    </div>
    <div>
      <StoryLabel>no-meta</StoryLabel>
      <LinkedInPreview
        {...ogTestFixtureToPlatformPreviewsProps(
          'no-meta',
          OG_TEST_FIXTURES['no-meta']
        )}
      />
    </div>
  </StoryGroup>
)

export const Loading: Story = () => (
  <StoryGroup>
    <div>
      <StoryLabel>Loading State</StoryLabel>
      <LinkedInPreview {...loadingData} />
    </div>
  </StoryGroup>
)

export const FailedToFetch: Story = () => (
  <LinkedInPreview {...failedToFetchData} />
)

export const InvalidUrl: Story = () => <LinkedInPreview {...invalidUrlData} />

export const AllTests: Story = () => (
  <div className="flex flex-col gap-14">
    {Object.entries(OG_TEST_FIXTURES)
      .filter(
        ([, fixture]) => fixture.results?.linkedin !== NOT_A_RELEVANT_TEST
      )
      .map(([slug, fixture]) => (
        <div key={slug}>
          <StoryLabel>{slug}</StoryLabel>
          <LinkedInPreview
            {...ogTestFixtureToPlatformPreviewsProps(slug, fixture)}
          />
        </div>
      ))}
  </div>
)
