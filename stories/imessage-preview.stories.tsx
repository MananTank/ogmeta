import type { Story, StoryDefault } from '@ladle/react'
import { IMessagePreview } from '@/components/platform-previews'
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

function StoryGroup({ children }: { children: React.ReactNode }) {
  return <div className="flex flex-col gap-16">{children}</div>
}

function StoryLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="text-muted-foreground mb-2 text-center text-sm font-medium">
      {children}
    </div>
  )
}

export const FullData: Story = () => (
  <StoryGroup>
    <div>
      <StoryLabel>Complete OG Data</StoryLabel>
      <IMessagePreview {...completeData} />
    </div>

    <div>
      <StoryLabel>Long Title (truncated)</StoryLabel>
      <IMessagePreview {...longTitleData} />
    </div>

    <div>
      <StoryLabel>Short Title</StoryLabel>
      <IMessagePreview {...shortTitleData} />
    </div>
  </StoryGroup>
)

export const PartialData: Story = () => (
  <StoryGroup>
    <div>
      <StoryLabel>Missing Image</StoryLabel>
      <IMessagePreview {...missingImageData} />
    </div>

    <div>
      <StoryLabel>Invalid Image</StoryLabel>
      <IMessagePreview {...invalidImageData} />
    </div>

    <div>
      <StoryLabel>Missing Title</StoryLabel>
      <IMessagePreview {...missingTitleData} />
    </div>
  </StoryGroup>
)

export const Loading: Story = () => (
  <StoryGroup>
    <div>
      <StoryLabel>Loading State</StoryLabel>
      <IMessagePreview {...loadingData} />
    </div>
  </StoryGroup>
)

export const FailedToFetch: Story = () => (
  <IMessagePreview {...failedToFetchData} />
)

export const InvalidUrl: Story = () => <IMessagePreview {...invalidUrlData} />
