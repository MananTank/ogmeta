import { Skeleton } from "@/components/ui/skeleton";

function PlatformSection({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`w-full py-16 px-5 sm:px-8 ${className || ""}`}>
      <div className="max-w-3xl mx-auto">{children}</div>
    </div>
  );
}

function TwitterSkeleton() {
  return (
    <div className="w-full bg-black py-16 px-5 sm:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center gap-2 mb-4">
          <Skeleton className="w-4 h-4 rounded bg-neutral-800" />
          <Skeleton className="h-2.5 w-16 bg-neutral-800" />
        </div>
        <div className="max-w-[512px]">
          <div className="flex gap-3">
            <Skeleton className="w-10 h-10 rounded-full bg-neutral-800" />
            <div className="flex-1 space-y-3">
              <div className="flex items-center gap-2">
                <Skeleton className="h-3 w-20 bg-neutral-800" />
                <Skeleton className="h-3 w-16 bg-neutral-800" />
              </div>
              <Skeleton className="h-3 w-3/4 bg-neutral-800" />
              <Skeleton className="w-full aspect-[1.91/1] rounded-2xl bg-neutral-800" />
              <Skeleton className="h-3 w-24 bg-neutral-800" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function LinkedInSkeleton() {
  return (
    <PlatformSection className="bg-[#f3f2ef]">
      <div className="flex items-center gap-2 mb-4">
        <Skeleton className="w-4 h-4 rounded bg-[#d0cec9]" />
        <Skeleton className="h-2.5 w-16 bg-[#d0cec9]" />
      </div>
      <div className="max-w-[552px]">
        <Skeleton className="w-full aspect-[1.91/1] rounded-t-lg bg-[#d0cec9]" />
        <div className="bg-white p-3 space-y-2 rounded-b-lg">
          <Skeleton className="h-4 w-3/4 bg-[#e0dfdc]" />
          <Skeleton className="h-3 w-24 bg-[#e0dfdc]" />
        </div>
      </div>
    </PlatformSection>
  );
}

function FacebookSkeleton() {
  return (
    <PlatformSection className="bg-[#f0f2f5]">
      <div className="flex items-center gap-2 mb-4">
        <Skeleton className="w-4 h-4 rounded bg-[#d0d2d6]" />
        <Skeleton className="h-2.5 w-16 bg-[#d0d2d6]" />
      </div>
      <div className="max-w-[500px]">
        <Skeleton className="w-full aspect-[1.91/1] bg-[#d0d2d6]" />
        <div className="bg-white p-3 space-y-2">
          <Skeleton className="h-3 w-20 bg-[#e0e2e6]" />
          <Skeleton className="h-4 w-3/4 bg-[#e0e2e6]" />
          <Skeleton className="h-3 w-1/2 bg-[#e0e2e6]" />
        </div>
      </div>
    </PlatformSection>
  );
}

function DiscordSkeleton() {
  return (
    <PlatformSection className="bg-[#313338]">
      <div className="flex items-center gap-2 mb-4">
        <Skeleton className="w-4 h-4 rounded bg-[#4a4d52]" />
        <Skeleton className="h-2.5 w-16 bg-[#4a4d52]" />
      </div>
      <div
        className="max-w-[432px] bg-[#2b2d31] rounded p-4 space-y-2"
        style={{ borderLeft: "4px solid #5865f2" }}
      >
        <Skeleton className="h-3 w-24 bg-[#4a4d52]" />
        <Skeleton className="h-4 w-3/4 bg-[#4a4d52]" />
        <Skeleton className="h-3 w-full bg-[#4a4d52]" />
        <Skeleton className="w-full max-w-xs aspect-[1.78/1] rounded bg-[#4a4d52]" />
      </div>
    </PlatformSection>
  );
}

function SlackSkeleton() {
  return (
    <PlatformSection className="bg-[#1a1d21]">
      <div className="flex items-center gap-2 mb-4">
        <Skeleton className="w-4 h-4 rounded bg-[#3a3d42]" />
        <Skeleton className="h-2.5 w-16 bg-[#3a3d42]" />
      </div>
      <div
        className="max-w-[400px] p-3 space-y-2"
        style={{ borderLeft: "4px solid #36c5f0" }}
      >
        <Skeleton className="h-3 w-20 bg-[#3a3d42]" />
        <Skeleton className="h-4 w-3/4 bg-[#3a3d42]" />
        <Skeleton className="h-3 w-1/2 bg-[#3a3d42]" />
        <Skeleton className="w-full max-w-[360px] aspect-[1.91/1] rounded bg-[#3a3d42]" />
      </div>
    </PlatformSection>
  );
}

function IMessageSkeleton() {
  return (
    <PlatformSection className="bg-white">
      <div className="flex items-center gap-2 mb-4">
        <Skeleton className="w-4 h-4 rounded bg-[#d1d1d6]" />
        <Skeleton className="h-2.5 w-16 bg-[#d1d1d6]" />
      </div>
      <div className="max-w-[320px] bg-[#e9e9eb] rounded-2xl overflow-hidden">
        <Skeleton className="w-full aspect-[1.91/1] bg-[#d1d1d6]" />
        <div className="p-3 space-y-2">
          <Skeleton className="h-2.5 w-16 bg-[#d1d1d6]" />
          <Skeleton className="h-4 w-3/4 bg-[#d1d1d6]" />
          <Skeleton className="h-3 w-1/2 bg-[#d1d1d6]" />
        </div>
      </div>
    </PlatformSection>
  );
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
  );
}
