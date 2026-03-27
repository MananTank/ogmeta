import type { Story, StoryDefault } from '@ladle/react'
import { TwitterPreview } from '@/components/previews/twitter-preview'
import { NOT_A_RELEVANT_TEST, OG_TEST_FIXTURES } from '@/lib/og-test-fixtures'
import { ogTestFixtureToPlatformPreviewsProps } from '@/lib/og-test-fixture-preview'
import {
  completeData,
  longTitleData,
  shortTitleData,
  summaryCardData,
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
    <div className="text-muted-foreground mb-4 text-center text-sm font-medium">
      {props.children}
    </div>
  )
}

export const FullData: Story = () => (
  <StoryGroup>
    <div>
      <StoryLabel>Complete OG Data</StoryLabel>
      <TwitterPreview {...completeData} />
    </div>

    <div>
      <StoryLabel>Long Title (truncated)</StoryLabel>
      <TwitterPreview {...longTitleData} />
    </div>

    <div>
      <StoryLabel>Short Title</StoryLabel>
      <TwitterPreview {...shortTitleData} />
    </div>

    <div>
      <StoryLabel>summary card</StoryLabel>
      <TwitterPreview {...summaryCardData} />
    </div>
  </StoryGroup>
)

export const PartialData: Story = () => (
  <StoryGroup>
    <div>
      <StoryLabel>Missing Image</StoryLabel>
      <TwitterPreview {...missingImageData} />
    </div>

    <div>
      <StoryLabel>Invalid Image</StoryLabel>
      <TwitterPreview {...invalidImageData} />
    </div>

    <div>
      <StoryLabel>Missing Title</StoryLabel>
      <TwitterPreview {...missingTitleData} />
    </div>
  </StoryGroup>
)

export const Loading: Story = () => (
  <StoryGroup>
    <div>
      <StoryLabel>Loading State</StoryLabel>
      <TwitterPreview {...loadingData} />
    </div>
  </StoryGroup>
)

export const FailedToFetch: Story = () => (
  <TwitterPreview {...failedToFetchData} />
)

export const InvalidUrl: Story = () => <TwitterPreview {...invalidUrlData} />

export const TwitterFullTestSuite: Story = () => (
  <div className="flex flex-col gap-14">
    {Object.entries(OG_TEST_FIXTURES)
      .filter(([, fixture]) => fixture.results?.twitter !== NOT_A_RELEVANT_TEST)
      .map(([slug, fixture]) => (
        <div key={slug}>
          <StoryLabel>{slug}</StoryLabel>
          <TwitterPreview
            {...ogTestFixtureToPlatformPreviewsProps(slug, fixture)}
          />
        </div>
      ))}
  </div>
)
