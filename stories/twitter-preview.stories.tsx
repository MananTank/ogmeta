import type { Story, StoryDefault } from '@ladle/react'
import { TwitterPreview } from '@/components/platform-previews'

export default {
  decorators: [
    (Story) => (
      <div className="py-10">
        <Story />
      </div>
    ),
  ],
} satisfies StoryDefault

const SAMPLE_IMAGE =
  'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1200&h=630&fit=crop'
const SAMPLE_URL = 'https://example.com/article/how-to-build-great-products'

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
      <TwitterPreview
        title="How to Build Great Products - A Comprehensive Guide"
        description="Learn the fundamentals of product development and design thinking."
        image={SAMPLE_IMAGE}
        isValidImage={true}
        url={SAMPLE_URL}
        isLoading={false}
        isError={false}
        isValidUrl={true}
      />
    </div>

    <div>
      <StoryLabel>Long Title (truncated)</StoryLabel>
      <TwitterPreview
        title="This is an extremely long title that should be truncated because it exceeds the available space in the Twitter card preview component and we need to handle this gracefully"
        description="Learn the fundamentals of product development and design thinking."
        image={SAMPLE_IMAGE}
        isValidImage={true}
        url={SAMPLE_URL}
        isLoading={false}
        isError={false}
        isValidUrl={true}
      />
    </div>

    <div>
      <StoryLabel>Short Title</StoryLabel>
      <TwitterPreview
        title="Hello"
        description="Learn the fundamentals of product development and design thinking."
        image={SAMPLE_IMAGE}
        isValidImage={true}
        url={SAMPLE_URL}
        isLoading={false}
        isError={false}
        isValidUrl={true}
      />
    </div>
  </StoryGroup>
)

export const PartialData: Story = () => (
  <StoryGroup>
    <div>
      <StoryLabel>Missing Image</StoryLabel>
      <TwitterPreview
        title="How to Build Great Products - A Comprehensive Guide"
        description="Learn the fundamentals of product development and design thinking."
        image=""
        isValidImage={false}
        url={SAMPLE_URL}
        isLoading={false}
        isError={false}
        isValidUrl={true}
      />
    </div>

    <div>
      <StoryLabel>Invalid Image</StoryLabel>
      <TwitterPreview
        title="How to Build Great Products - A Comprehensive Guide"
        description="Learn the fundamentals of product development and design thinking."
        image="https://example.com/broken-image.jpg"
        isValidImage={false}
        url={SAMPLE_URL}
        isLoading={false}
        isError={false}
        isValidUrl={true}
      />
    </div>

    <div>
      <StoryLabel>Missing Title</StoryLabel>
      <TwitterPreview
        title=""
        description="Learn the fundamentals of product development and design thinking."
        image={SAMPLE_IMAGE}
        isValidImage={true}
        url={SAMPLE_URL}
        isLoading={false}
        isError={false}
        isValidUrl={true}
      />
    </div>
  </StoryGroup>
)

export const Loading: Story = () => (
  <StoryGroup>
    <div>
      <StoryLabel>Loading State</StoryLabel>
      <TwitterPreview
        title=""
        description=""
        image=""
        isValidImage={false}
        url={SAMPLE_URL}
        isLoading={true}
        isError={false}
        isValidUrl={true}
      />
    </div>
  </StoryGroup>
)

export const FailedToFetch: Story = () => (
  <TwitterPreview
    title=""
    description=""
    image=""
    isValidImage={false}
    url={SAMPLE_URL}
    isLoading={false}
    isError={true}
    isValidUrl={true}
  />
)

export const InvalidUrl: Story = () => (
  <TwitterPreview
    title=""
    description=""
    image=""
    isValidImage={false}
    url="not-a-valid-url"
    isLoading={false}
    isError={false}
    isValidUrl={false}
  />
)
