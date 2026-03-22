"use client";

interface OGPreviewProps {
  title: string;
  description: string;
  image: string;
  url: string;
}

function extractDomain(url: string) {
  try {
    return new URL(url).hostname.replace("www.", "");
  } catch {
    return url;
  }
}

export function OGPreview({ title, description, image, url }: OGPreviewProps) {
  return (
    <div className="space-y-6">
      {/* Image Preview */}
      {image ? (
        <div className="rounded-xl overflow-hidden border border-border bg-card">
          <img
            src={image}
            alt="OG image"
            className="w-full h-auto block"
            onError={(e) => {
              e.currentTarget.style.display = "none";
            }}
          />
        </div>
      ) : (
        <div className="w-full aspect-[1.91/1] rounded-xl bg-card border border-dashed border-border-bright flex flex-col items-center justify-center gap-2">
          <svg
            className="w-8 h-8 text-muted-foreground/40"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
          <span className="text-xs text-muted-foreground/60">
            No og:image found
          </span>
        </div>
      )}

      {/* Metadata Details */}
      <div className="grid gap-3 p-5 bg-card/50 rounded-xl border border-border/50">
        <p className="text-base font-medium text-foreground leading-snug">
          {title || (
            <span className="text-muted-foreground italic">No title</span>
          )}
        </p>
        {description && (
          <p className="text-sm text-muted-foreground leading-relaxed">
            {description}
          </p>
        )}
        <p className="text-sm text-muted-foreground/70 font-mono truncate">
          {url}
        </p>
      </div>
    </div>
  );
}
