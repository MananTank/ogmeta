export function PlatformPreviewsSkeleton() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold text-foreground mb-4">Platform Previews</h2>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="border border-border rounded-lg p-4 bg-card space-y-4">
            {/* Platform Label */}
            <div className="h-4 bg-muted rounded w-20 animate-pulse" />
            
            {/* Image */}
            <div className="w-full h-40 bg-muted rounded animate-pulse" />
            
            {/* Title */}
            <div className="h-5 bg-muted rounded w-3/4 animate-pulse" />
            
            {/* Description Lines */}
            <div className="space-y-2">
              <div className="h-3 bg-muted rounded w-full animate-pulse" />
              <div className="h-3 bg-muted rounded w-4/5 animate-pulse" />
            </div>
            
            {/* URL */}
            <div className="h-3 bg-muted rounded w-1/2 animate-pulse" />
          </div>
        ))}
      </div>
    </div>
  );
}
