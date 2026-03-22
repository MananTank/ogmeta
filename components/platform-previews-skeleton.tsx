export function PlatformPreviewsSkeleton() {
  return (
    <div className="space-y-4">
      <div className="h-3 w-28 bg-muted rounded animate-pulse" />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="space-y-2">
            {/* Platform label */}
            <div className="h-2.5 w-16 bg-muted rounded animate-pulse" />

            {/* Card */}
            <div className="rounded-md border border-border overflow-hidden bg-card">
              {/* Image */}
              <div className="w-full h-44 bg-muted animate-pulse" />
              {/* Text rows */}
              <div className="px-3 py-2.5 space-y-2">
                <div className="h-2.5 w-1/3 bg-muted rounded animate-pulse" />
                <div className="h-3.5 w-4/5 bg-muted rounded animate-pulse" />
                <div className="h-2.5 w-2/3 bg-muted rounded animate-pulse" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
