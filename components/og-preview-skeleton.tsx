export function OGPreviewSkeleton() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold text-foreground mb-4">Metadata Preview</h2>
      </div>
      
      <div className="border border-border rounded-lg overflow-hidden bg-card">
        {/* Image Skeleton */}
        <div className="w-full h-64 bg-muted animate-pulse" />
        
        {/* Content Skeleton */}
        <div className="p-6 space-y-4">
          {/* Title */}
          <div>
            <div className="h-2 bg-muted rounded w-12 mb-2 animate-pulse" />
            <div className="h-6 bg-muted rounded w-3/4 animate-pulse" />
          </div>
          
          {/* Description */}
          <div className="space-y-2">
            <div className="h-2 bg-muted rounded w-20 mb-2 animate-pulse" />
            <div className="h-4 bg-muted rounded w-full animate-pulse" />
            <div className="h-4 bg-muted rounded w-5/6 animate-pulse" />
          </div>
          
          {/* URL */}
          <div>
            <div className="h-2 bg-muted rounded w-8 mb-2 animate-pulse" />
            <div className="h-4 bg-muted rounded w-1/2 animate-pulse" />
          </div>
        </div>
      </div>
    </div>
  );
}
