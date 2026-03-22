const PLATFORMS = [
  { maxWidth: 516 }, // Twitter/X
  { maxWidth: 552 }, // LinkedIn
  { maxWidth: 500 }, // Facebook
  { maxWidth: 432 }, // Discord
  { maxWidth: 400 }, // Slack
  { maxWidth: 320 }, // iMessage
];

function PlatformCardSkeleton({ maxWidth }: { maxWidth: number }) {
  return (
    <div>
      <div className="h-2.5 w-16 bg-muted rounded animate-pulse mb-2" />
      <div className="rounded-md border border-border overflow-hidden bg-card w-full" style={{ maxWidth }}>
        <div className="w-full aspect-[1.91/1] bg-muted animate-pulse" />
        <div className="px-3 py-2.5 space-y-2">
          <div className="h-2.5 w-1/3 bg-muted rounded animate-pulse" />
          <div className="h-3.5 w-4/5 bg-muted rounded animate-pulse" />
          <div className="h-2.5 w-2/3 bg-muted rounded animate-pulse" />
        </div>
      </div>
    </div>
  );
}

export function PlatformPreviewsSkeleton() {
  return (
    <div className="space-y-4">
      <div className="h-3 w-28 bg-muted rounded animate-pulse" />
      <div className="flex flex-col gap-10">
        {PLATFORMS.map(({ maxWidth }, i) => (
          <PlatformCardSkeleton key={i} maxWidth={maxWidth} />
        ))}
      </div>
    </div>
  );
}
