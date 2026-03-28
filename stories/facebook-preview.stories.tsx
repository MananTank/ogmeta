import type { Story, StoryDefault } from '@ladle/react'
import { FacebookPreview } from '@/components/previews/facebook-preview'
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
      <FacebookPreview {...completeData} />
    </div>

    <div>
      <StoryLabel>Long Title (truncated)</StoryLabel>
      <FacebookPreview {...longTitleData} />
    </div>

    <div>
      <StoryLabel>Short Title</StoryLabel>
      <FacebookPreview {...shortTitleData} />
    </div>
  </StoryGroup>
)

export const PartialData: Story = () => (
  <StoryGroup>
    <div>
      <StoryLabel>Missing Image</StoryLabel>
      <FacebookPreview {...missingImageData} />
    </div>

    <div>
      <StoryLabel>Invalid Image</StoryLabel>
      <FacebookPreview {...invalidImageData} />
    </div>

    <div>
      <StoryLabel>Missing Title</StoryLabel>
      <FacebookPreview {...missingTitleData} />
    </div>
  </StoryGroup>
)

export const Loading: Story = () => (
  <StoryGroup>
    <div>
      <StoryLabel>Loading State</StoryLabel>
      <FacebookPreview {...loadingData} />
    </div>
  </StoryGroup>
)

export const FailedToFetch: Story = () => (
  <FacebookPreview {...failedToFetchData} />
)

export const InvalidUrl: Story = () => <FacebookPreview {...invalidUrlData} />

export const FacebookFullTestSuite: Story = () => (
  <div className="flex flex-col gap-14">
    {Object.entries(OG_TEST_FIXTURES)
      .filter(
        ([, fixture]) => fixture.results?.facebook !== NOT_A_RELEVANT_TEST
      )
      .map(([slug, fixture]) => (
        <div key={slug}>
          <StoryLabel>{slug}</StoryLabel>
          <FacebookPreview
            {...ogTestFixtureToPlatformPreviewsProps(slug, fixture)}
          />
        </div>
      ))}
  </div>
)
