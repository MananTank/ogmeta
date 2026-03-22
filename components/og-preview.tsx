'use client';

interface OGPreviewProps {
  title: string;
  description: string;
  image: string;
  url: string;
}

export function OGPreview({
  title,
  description,
  image,
  url,
}: OGPreviewProps) {
  return (
    <div className="space-y-6 w-full">
      <div>
        <h2 className="text-lg font-semibold text-foreground mb-4">
          OpenGraph Metadata
        </h2>

        {/* Image Preview */}
        {image ? (
          <div className="mb-6">
            <img
              src={image}
              alt="OG preview"
              className="w-full max-w-2xl h-auto rounded-lg object-cover border border-border bg-muted"
              onError={(e) => {
                e.currentTarget.src = '';
                e.currentTarget.className =
                  'w-full max-w-2xl h-64 rounded-lg bg-muted border border-border flex items-center justify-center';
                e.currentTarget.innerHTML = '<span class="text-muted-foreground">Image failed to load</span>';
              }}
            />
          </div>
        ) : (
          <div className="mb-6 w-full max-w-2xl h-64 rounded-lg bg-muted border border-border border-dashed flex items-center justify-center">
            <span className="text-muted-foreground">No image found</span>
          </div>
        )}

        {/* Metadata Display */}
        <div className="space-y-4 bg-card border border-border rounded-lg p-6">
          <div>
            <label className="text-xs font-semibold text-muted-foreground uppercase">
              Title
            </label>
            <p className="text-foreground mt-1 break-words">{title}</p>
          </div>

          <div>
            <label className="text-xs font-semibold text-muted-foreground uppercase">
              Description
            </label>
            <p className="text-foreground mt-1 break-words line-clamp-4">
              {description || 'No description found'}
            </p>
          </div>

          <div>
            <label className="text-xs font-semibold text-muted-foreground uppercase">
              URL
            </label>
            <p className="text-foreground mt-1 break-all text-sm">{url}</p>
          </div>

          {image && (
            <div>
              <label className="text-xs font-semibold text-muted-foreground uppercase">
                Image URL
              </label>
              <p className="text-foreground mt-1 break-all text-sm">{image}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
