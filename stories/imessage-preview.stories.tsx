import type { Story, StoryDefault } from '@ladle/react'
import { IMessagePreview } from '@/components/previews/imessage-preview'
import { NOT_A_RELEVANT_TEST, OG_TEST_FIXTURES } from '@/tests/og-test-fixtures'
import { ogTestFixtureToPlatformPreviewsProps } from '@/stories/og-test-fixture-preview'
import { StoryLoadingToggle } from './story-loading-toggle'
import { completeData, failedToFetchData, invalidUrlData } from './preview-data'

export default {
  decorators: [
    (Story) => (
      <div className="py-10">
        <Story />
      </div>
    ),
  ],
} satisfies StoryDefault

function StoryLabel(props: { children: React.ReactNode }) {
  return (
    <div className="text-muted-foreground mb-2 text-center text-sm font-medium">
      {props.children}
    </div>
  )
}

export const Loading: Story = () => (
  <StoryLoadingToggle>
    {(isLoading) => (
      <IMessagePreview
        {...completeData}
        isLoading={isLoading}
        isError={false}
        data={isLoading ? null : completeData.data}
        urlInput={completeData.urlInput}
      />
    )}
  </StoryLoadingToggle>
)

export const FailedToFetch: Story = () => (
  <IMessagePreview {...failedToFetchData} />
)

export const InvalidUrl: Story = () => <IMessagePreview {...invalidUrlData} />

export const AllTests: Story = () => (
  <div className="flex flex-col gap-14">
    {Object.entries(OG_TEST_FIXTURES)
      .filter(
        ([, fixture]) => fixture.results?.imessage !== NOT_A_RELEVANT_TEST
      )
      .map(([slug, fixture]) => (
        <div key={slug}>
          <StoryLabel>{slug}</StoryLabel>
          <IMessagePreview
            {...ogTestFixtureToPlatformPreviewsProps(slug, fixture)}
          />
        </div>
      ))}
  </div>
)
