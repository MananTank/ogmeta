import type { Story, StoryDefault } from '@ladle/react'
import { WhatsAppPreview } from '@/components/previews/whatsapp-preview'
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
      <WhatsAppPreview {...completeData} />
    </div>

    <div>
      <StoryLabel>Long Title (truncated)</StoryLabel>
      <WhatsAppPreview {...longTitleData} />
    </div>

    <div>
      <StoryLabel>Short Title</StoryLabel>
      <WhatsAppPreview {...shortTitleData} />
    </div>
  </StoryGroup>
)

export const PartialData: Story = () => (
  <StoryGroup>
    <div>
      <StoryLabel>Missing Image</StoryLabel>
      <WhatsAppPreview {...missingImageData} />
    </div>

    <div>
      <StoryLabel>Invalid Image</StoryLabel>
      <WhatsAppPreview {...invalidImageData} />
    </div>

    <div>
      <StoryLabel>Missing Title</StoryLabel>
      <WhatsAppPreview {...missingTitleData} />
    </div>
  </StoryGroup>
)

export const Loading: Story = () => (
  <StoryGroup>
    <div>
      <StoryLabel>Loading State</StoryLabel>
      <WhatsAppPreview {...loadingData} />
    </div>
  </StoryGroup>
)

export const FailedToFetch: Story = () => (
  <WhatsAppPreview {...failedToFetchData} />
)

export const InvalidUrl: Story = () => <WhatsAppPreview {...invalidUrlData} />

export const WhatsAppFullTestSuite: Story = () => (
  <div className="flex flex-col gap-14">
    {Object.entries(OG_TEST_FIXTURES)
      .filter(([, fixture]) => fixture.results?.whatsapp !== NOT_A_RELEVANT_TEST)
      .map(([slug, fixture]) => (
        <div key={slug}>
          <StoryLabel>{slug}</StoryLabel>
          <WhatsAppPreview
            {...ogTestFixtureToPlatformPreviewsProps(slug, fixture)}
          />
        </div>
      ))}
  </div>
)
