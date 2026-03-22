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

      {/* Metadata rows */}
      <div className="border border-border rounded-md divide-y divide-border">
        <MetaRow label="Title" value={title || '—'} />
        <MetaRow label="Description" value={description || '—'} clamp />
        <MetaRow label="URL" value={url} mono />
        {image && <MetaRow label="Image" value={image} mono />}
      </div>
    </div>
  );
}

function MetaRow({
  label,
  value,
  mono,
  clamp,
}: {
  label: string;
  value: string;
  mono?: boolean;
  clamp?: boolean;
}) {
  return (
    <div className="flex gap-4 px-4 py-3">
      <span className="text-xs text-muted-foreground w-20 shrink-0 pt-px">{label}</span>
      <span
        className={`text-sm text-foreground break-all leading-relaxed ${mono ? 'font-mono text-xs' : ''} ${clamp ? 'line-clamp-3' : ''}`}
      >
        {value}
      </span>
    </div>
  );
}
