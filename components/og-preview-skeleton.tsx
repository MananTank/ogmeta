export function OGPreviewSkeleton() {
  return (
    <div className="space-y-4">
      <div className="h-3 w-16 bg-muted rounded animate-pulse" />

      {/* Image — standard OG aspect ratio 1.91:1 */}
      <div className="w-full aspect-[1.91/1] rounded-md bg-muted animate-pulse" />

      {/* Metadata rows */}
      <div className="border border-border rounded-md divide-y divide-border overflow-hidden">
        {[['w-24', 'w-2/3'], ['w-20', 'w-full'], ['w-8', 'w-1/2'], ['w-12', 'w-3/4']].map(([labelW, valueW], i) => (
          <div key={i} className="flex gap-4 px-4 py-3">
            <div className={`h-3 ${labelW} bg-muted rounded animate-pulse mt-0.5 shrink-0`} />
            <div className={`h-3 ${valueW} bg-muted rounded animate-pulse`} />
          </div>
        ))}
      </div>
    </div>
  );
}
