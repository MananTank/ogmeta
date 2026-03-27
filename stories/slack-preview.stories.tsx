import type { Story, StoryDefault } from '@ladle/react'
import { SlackPreview } from '@/components/previews/slack-preview'
import { OG_TEST_FIXTURES } from '@/lib/og-test-fixtures'
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
      <SlackPreview {...completeData} />
    </div>

    <div>
      <StoryLabel>Long Title (truncated)</StoryLabel>
      <SlackPreview {...longTitleData} />
    </div>

    <div>
      <StoryLabel>Short Title</StoryLabel>
      <SlackPreview {...shortTitleData} />
    </div>
  </StoryGroup>
)

export const PartialData: Story = () => (
  <StoryGroup>
    <div>
      <StoryLabel>Missing Image</StoryLabel>
      <SlackPreview {...missingImageData} />
    </div>

    <div>
      <StoryLabel>Invalid Image</StoryLabel>
      <SlackPreview {...invalidImageData} />
    </div>

    <div>
      <StoryLabel>Missing Title</StoryLabel>
      <SlackPreview {...missingTitleData} />
    </div>
  </StoryGroup>
)

export const Loading: Story = () => (
  <StoryGroup>
    <div>
      <StoryLabel>Loading State</StoryLabel>
      <SlackPreview {...loadingData} />
    </div>
  </StoryGroup>
)

export const FailedToFetch: Story = () => (
  <SlackPreview {...failedToFetchData} />
)

export const InvalidUrl: Story = () => <SlackPreview {...invalidUrlData} />

export const SlackFullTestSuite: Story = () => (
  <div className="flex flex-col gap-14">
    {Object.entries(OG_TEST_FIXTURES).map(([slug, fixture]) => (
      <div key={slug}>
        <StoryLabel>{slug}</StoryLabel>
        <SlackPreview
          {...ogTestFixtureToPlatformPreviewsProps(slug, fixture)}
        />
      </div>
    ))}
  </div>
)
