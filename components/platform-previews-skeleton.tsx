import { Skeleton } from '@/components/ui/skeleton'

function PlatformSection({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <div className={`w-full px-5 py-16 sm:px-8 ${className || ''}`}>
      <div className="mx-auto max-w-3xl">{children}</div>
    </div>
  )
}

function TwitterSkeleton() {
  return (
    <div className="w-full bg-black px-5 py-16 sm:px-8">
      <div className="mx-auto max-w-3xl">
        <div className="mb-4 flex items-center gap-2">
          <Skeleton className="h-4 w-4 rounded bg-neutral-800" />
          <Skeleton className="h-2.5 w-16 bg-neutral-800" />
        </div>
        <div className="max-w-[512px]">
          <div className="flex gap-3">
            <Skeleton className="h-10 w-10 rounded-full bg-neutral-800" />
            <div className="flex-1 space-y-3">
              <div className="flex items-center gap-2">
                <Skeleton className="h-3 w-20 bg-neutral-800" />
                <Skeleton className="h-3 w-16 bg-neutral-800" />
              </div>
              <Skeleton className="h-3 w-3/4 bg-neutral-800" />
              <Skeleton className="aspect-[1.91/1] w-full rounded-2xl bg-neutral-800" />
              <Skeleton className="h-3 w-24 bg-neutral-800" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function LinkedInSkeleton() {
  return (
    <PlatformSection className="bg-[#f3f2ef]">
      <div className="mb-4 flex items-center gap-2">
        <Skeleton className="h-4 w-4 rounded bg-[#d0cec9]" />
        <Skeleton className="h-2.5 w-16 bg-[#d0cec9]" />
      </div>
      <div className="max-w-[552px]">
        <Skeleton className="aspect-[1.91/1] w-full rounded-t-lg bg-[#d0cec9]" />
        <div className="space-y-2 rounded-b-lg bg-white p-3">
          <Skeleton className="h-4 w-3/4 bg-[#e0dfdc]" />
          <Skeleton className="h-3 w-24 bg-[#e0dfdc]" />
        </div>
      </div>
    </PlatformSection>
  )
}

function FacebookSkeleton() {
  return (
    <PlatformSection className="bg-[#f0f2f5]">
      <div className="mb-4 flex items-center gap-2">
        <Skeleton className="h-4 w-4 rounded bg-[#d0d2d6]" />
        <Skeleton className="h-2.5 w-16 bg-[#d0d2d6]" />
      </div>
      <div className="max-w-[500px]">
        <Skeleton className="aspect-[1.91/1] w-full bg-[#d0d2d6]" />
        <div className="space-y-2 bg-white p-3">
          <Skeleton className="h-3 w-20 bg-[#e0e2e6]" />
          <Skeleton className="h-4 w-3/4 bg-[#e0e2e6]" />
          <Skeleton className="h-3 w-1/2 bg-[#e0e2e6]" />
        </div>
      </div>
    </PlatformSection>
  )
}

function DiscordSkeleton() {
  return (
    <PlatformSection className="bg-[#313338]">
      <div className="mb-4 flex items-center gap-2">
        <Skeleton className="h-4 w-4 rounded bg-[#4a4d52]" />
        <Skeleton className="h-2.5 w-16 bg-[#4a4d52]" />
      </div>
      <div
        className="max-w-[432px] space-y-2 rounded bg-[#2b2d31] p-4"
        style={{ borderLeft: '4px solid #5865f2' }}
      >
        <Skeleton className="h-3 w-24 bg-[#4a4d52]" />
        <Skeleton className="h-4 w-3/4 bg-[#4a4d52]" />
        <Skeleton className="h-3 w-full bg-[#4a4d52]" />
        <Skeleton className="aspect-[1.78/1] w-full max-w-xs rounded bg-[#4a4d52]" />
      </div>
    </PlatformSection>
  )
}

function SlackSkeleton() {
  return (
    <PlatformSection className="bg-[#1a1d21]">
      <div className="mb-4 flex items-center gap-2">
        <Skeleton className="h-4 w-4 rounded bg-[#3a3d42]" />
        <Skeleton className="h-2.5 w-16 bg-[#3a3d42]" />
      </div>
      <div
        className="max-w-[400px] space-y-2 p-3"
        style={{ borderLeft: '4px solid #36c5f0' }}
      >
        <Skeleton className="h-3 w-20 bg-[#3a3d42]" />
        <Skeleton className="h-4 w-3/4 bg-[#3a3d42]" />
        <Skeleton className="h-3 w-1/2 bg-[#3a3d42]" />
        <Skeleton className="aspect-[1.91/1] w-full max-w-[360px] rounded bg-[#3a3d42]" />
      </div>
    </PlatformSection>
  )
}

function IMessageSkeleton() {
  return (
    <PlatformSection className="bg-white">
      <div className="mb-4 flex items-center gap-2">
        <Skeleton className="h-4 w-4 rounded bg-[#d1d1d6]" />
        <Skeleton className="h-2.5 w-16 bg-[#d1d1d6]" />
      </div>
      <div className="max-w-[320px] overflow-hidden rounded-2xl bg-[#e9e9eb]">
        <Skeleton className="aspect-[1.91/1] w-full bg-[#d1d1d6]" />
        <div className="space-y-2 p-3">
          <Skeleton className="h-2.5 w-16 bg-[#d1d1d6]" />
          <Skeleton className="h-4 w-3/4 bg-[#d1d1d6]" />
          <Skeleton className="h-3 w-1/2 bg-[#d1d1d6]" />
        </div>
      </div>
    </PlatformSection>
  )
}

export function PlatformPreviewsSkeleton() {
  return (
    <>
      <TwitterSkeleton />
      <LinkedInSkeleton />
      <FacebookSkeleton />
      <DiscordSkeleton />
      <SlackSkeleton />
      <IMessageSkeleton />
    </>
  )
}
