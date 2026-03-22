export function OGPreviewSkeleton() {
  return (
    <div className="space-y-4">
      <div className="h-3 w-16 bg-muted rounded animate-pulse" />

      {/* Image — standard OG aspect ratio 1.91:1 */}
      <div className="w-full aspect-[1.91/1] rounded-md bg-muted animate-pulse" />

      {/* Title & description */}
      <div className="space-y-2">
        <div className="h-3.5 w-2/3 bg-muted rounded animate-pulse" />
        <div className="h-3 w-full bg-muted rounded animate-pulse" />
        <div className="h-3 w-4/5 bg-muted rounded animate-pulse" />
      </div>
    </div>
  );
}
