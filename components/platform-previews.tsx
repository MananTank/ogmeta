'use client';

interface PlatformPreviewsProps {
  title: string;
  description: string;
  image: string;
  url: string;
}

export function PlatformPreviews({
  title,
  description,
  image,
  url,
}: PlatformPreviewsProps) {
  return (
    <div className="space-y-8 w-full">
      <h2 className="text-2xl font-semibold text-foreground">Platform Previews</h2>

      {/* Twitter/X Preview */}
      <div className="border border-border rounded-lg overflow-hidden bg-card max-w-md">
        <div className="p-3 border-b border-border space-y-2">
          <p className="text-xs text-muted-foreground">X (Twitter)</p>
          <div className="flex gap-3">
            {image && (
              <img
                src={image}
                alt="preview"
                className="w-12 h-12 rounded object-cover flex-shrink-0"
                onError={(e) => {
                  e.currentTarget.src = '';
                  e.currentTarget.className = 'w-12 h-12 rounded bg-muted';
                }}
              />
            )}
            <div className="flex-1 min-w-0">
              <p className="font-bold text-sm text-foreground truncate">{title}</p>
              <p className="text-xs text-muted-foreground truncate">{description}</p>
              <p className="text-xs text-muted-foreground truncate">
                {new URL(url).hostname}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* LinkedIn Preview */}
      <div className="border border-border rounded-lg overflow-hidden bg-card max-w-md">
        <div className="p-3 space-y-2">
          <p className="text-xs text-muted-foreground mb-2">LinkedIn</p>
          {image && (
            <img
              src={image}
              alt="preview"
              className="w-full h-40 object-cover rounded"
              onError={(e) => {
                e.currentTarget.src = '';
                e.currentTarget.className =
                  'w-full h-40 rounded bg-muted';
              }}
            />
          )}
          <div className="space-y-1">
            <p className="font-bold text-sm text-foreground line-clamp-2">
              {title}
            </p>
            <p className="text-xs text-muted-foreground line-clamp-2">
              {description}
            </p>
            <p className="text-xs text-muted-foreground">
              {new URL(url).hostname}
            </p>
          </div>
        </div>
      </div>

      {/* Facebook Preview */}
      <div className="border border-border rounded-lg overflow-hidden bg-card max-w-md">
        <div className="p-3 space-y-2">
          <p className="text-xs text-muted-foreground mb-2">Facebook</p>
          {image && (
            <img
              src={image}
              alt="preview"
              className="w-full h-48 object-cover rounded"
              onError={(e) => {
                e.currentTarget.src = '';
                e.currentTarget.className =
                  'w-full h-48 rounded bg-muted';
              }}
            />
          )}
          <div className="space-y-1">
            <p className="text-xs text-muted-foreground">
              {new URL(url).hostname.replace('www.', '')}
            </p>
            <p className="font-bold text-sm text-foreground line-clamp-2">
              {title}
            </p>
            <p className="text-xs text-muted-foreground line-clamp-2">
              {description}
            </p>
          </div>
        </div>
      </div>

      {/* Discord Preview */}
      <div className="border border-border rounded-lg overflow-hidden bg-card max-w-md">
        <div className="bg-muted p-2 rounded-t flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-primary"></div>
          <p className="text-xs text-muted-foreground font-semibold">
            {new URL(url).hostname}
          </p>
        </div>
        <div className="p-3 space-y-2">
          <div className="flex gap-2">
            {image && (
              <img
                src={image}
                alt="preview"
                className="w-24 h-24 object-cover rounded flex-shrink-0"
                onError={(e) => {
                  e.currentTarget.src = '';
                  e.currentTarget.className =
                    'w-24 h-24 rounded bg-muted flex-shrink-0';
                }}
              />
            )}
            <div className="flex-1 min-w-0">
              <p className="font-bold text-sm text-foreground line-clamp-2">
                {title}
              </p>
              <p className="text-xs text-muted-foreground line-clamp-3">
                {description}
              </p>
              <p className="text-xs text-muted-foreground mt-2">
                {new URL(url).hostname}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
