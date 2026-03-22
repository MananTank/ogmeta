'use client';

interface OGPreviewProps {
  title: string;
  description: string;
  image: string;
  url: string;
}

export function OGPreview({ title, description, image, url }: OGPreviewProps) {
  return (
    <div className="space-y-4">
      <h2 className="text-xs font-medium tracking-widest text-muted-foreground uppercase">
        Metadata
      </h2>

      {/* Image Preview */}
      {image ? (
        <div className="rounded-md overflow-hidden border border-border bg-card">
          <img
            src={image}
            alt="OG image"
            className="w-full h-auto block"
            onError={(e) => {
              e.currentTarget.style.display = 'none';
            }}
          />
        </div>
      ) : (
        <div className="w-full h-48 rounded-md bg-card border border-border border-dashed flex items-center justify-center">
          <span className="text-xs text-muted-foreground">No image found</span>
        </div>
      )}

      {/* Title & Description */}
      <div className="space-y-1.5">
        <p className="text-sm font-medium text-foreground leading-snug">
          {title || '—'}
        </p>
        {description && (
          <p className="text-sm text-muted-foreground leading-relaxed">
            {description}
          </p>
        )}
      </div>
    </div>
  );
}
