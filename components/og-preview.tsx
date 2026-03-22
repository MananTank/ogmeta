'use client'

interface OGPreviewProps {
  title: string
  description: string
  image: string
  url: string
}

function extractDomain(url: string) {
  try {
    return new URL(url).hostname.replace('www.', '')
  } catch {
    return url
  }
}

export function OGPreview({ title, description, image, url }: OGPreviewProps) {
  return (
    <div className="space-y-6">
      {/* Image Preview */}
      {image ? (
        <div className="border-border bg-card overflow-hidden rounded-xl border">
          <img
            src={image}
            alt="OG image"
            className="block h-auto w-full"
            onError={(e) => {
              e.currentTarget.style.display = 'none'
            }}
          />
        </div>
      ) : (
        <div className="bg-card border-border-bright flex aspect-[1.91/1] w-full flex-col items-center justify-center gap-2 rounded-xl border border-dashed">
          <svg
            className="text-muted-foreground/40 h-8 w-8"
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
          <span className="text-muted-foreground/60 text-xs">
            No og:image found
          </span>
        </div>
      )}

      {/* Metadata Details */}
      <div className="bg-card/50 border-border/50 grid gap-3 rounded-xl border p-5">
        <p className="text-foreground text-base leading-snug font-medium">
          {title || (
            <span className="text-muted-foreground italic">No title</span>
          )}
        </p>
        {description && (
          <p className="text-muted-foreground text-sm leading-relaxed">
            {description}
          </p>
        )}
        <p className="text-muted-foreground/70 truncate font-mono text-sm">
          {url}
        </p>
      </div>
    </div>
  )
}
