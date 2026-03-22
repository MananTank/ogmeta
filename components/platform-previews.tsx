'use client';

interface Props {
  title: string;
  description: string;
  image: string;
  url: string;
}

function domain(url: string) {
  try {
    return new URL(url).hostname.replace('www.', '');
  } catch {
    return url;
  }
}

function OGImage({ src, className }: { src: string; className?: string }) {
  if (!src) return null;
  return (
    <img
      src={src}
      alt="og preview"
      className={className}
      onError={(e) => {
        e.currentTarget.style.display = 'none';
      }}
    />
  );
}

/* ─── Twitter / X ─────────────────────────────────────────────── */
function TwitterPreview({ title, description, image, url }: Props) {
  return (
    <div className="space-y-2">
      <p className="text-xs font-medium text-muted-foreground tracking-widest uppercase">X (Twitter)</p>
      <div className="rounded-xl border border-border overflow-hidden bg-card max-w-sm">
        <OGImage src={image} className="w-full h-44 object-cover" />
        <div className="px-3 py-2.5 space-y-0.5">
          <p className="text-[11px] text-muted-foreground">{domain(url)}</p>
          <p className="text-sm font-semibold text-foreground leading-snug line-clamp-2">{title || '—'}</p>
          <p className="text-[11px] text-muted-foreground line-clamp-1">{description}</p>
        </div>
      </div>
    </div>
  );
}

/* ─── LinkedIn ─────────────────────────────────────────────────── */
function LinkedInPreview({ title, description, image, url }: Props) {
  return (
    <div className="space-y-2">
      <p className="text-xs font-medium text-muted-foreground tracking-widest uppercase">LinkedIn</p>
      <div className="rounded-md border border-border overflow-hidden bg-card max-w-sm">
        <OGImage src={image} className="w-full h-44 object-cover" />
        <div className="px-3 py-3 bg-secondary space-y-0.5">
          <p className="text-sm font-semibold text-foreground line-clamp-2 leading-snug">{title || '—'}</p>
          <p className="text-[11px] text-muted-foreground">{domain(url)}</p>
        </div>
      </div>
    </div>
  );
}

/* ─── Facebook ─────────────────────────────────────────────────── */
function FacebookPreview({ title, description, image, url }: Props) {
  return (
    <div className="space-y-2">
      <p className="text-xs font-medium text-muted-foreground tracking-widest uppercase">Facebook</p>
      <div className="border border-border overflow-hidden bg-card max-w-sm">
        <OGImage src={image} className="w-full h-44 object-cover" />
        <div className="px-3 py-2.5 bg-secondary space-y-0.5">
          <p className="text-[10px] text-muted-foreground uppercase tracking-wide">{domain(url)}</p>
          <p className="text-sm font-bold text-foreground line-clamp-2 leading-snug">{title || '—'}</p>
          <p className="text-[11px] text-muted-foreground line-clamp-2">{description}</p>
        </div>
      </div>
    </div>
  );
}

/* ─── Discord ──────────────────────────────────────────────────── */
function DiscordPreview({ title, description, image, url }: Props) {
  return (
    <div className="space-y-2">
      <p className="text-xs font-medium text-muted-foreground tracking-widest uppercase">Discord</p>
      <div className="rounded-md border border-border border-l-2 border-l-foreground/20 overflow-hidden bg-card max-w-sm p-3 space-y-2">
        <p className="text-xs font-semibold text-foreground">{domain(url)}</p>
        <p className="text-sm font-bold text-foreground line-clamp-2 leading-snug">{title || '—'}</p>
        <p className="text-xs text-muted-foreground line-clamp-3 leading-relaxed">{description}</p>
        <OGImage src={image} className="w-full h-40 object-cover rounded" />
      </div>
    </div>
  );
}

/* ─── Slack ────────────────────────────────────────────────────── */
function SlackPreview({ title, description, image, url }: Props) {
  return (
    <div className="space-y-2">
      <p className="text-xs font-medium text-muted-foreground tracking-widest uppercase">Slack</p>
      <div className="rounded border border-border border-l-[3px] border-l-border overflow-hidden bg-card max-w-sm px-3 py-2.5 space-y-1">
        <p className="text-xs font-bold text-foreground">{domain(url)}</p>
        <p className="text-sm font-semibold text-foreground line-clamp-2 leading-snug">{title || '—'}</p>
        <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">{description}</p>
        <OGImage src={image} className="mt-2 w-full max-w-xs h-36 object-cover rounded" />
      </div>
    </div>
  );
}

/* ─── iMessage ─────────────────────────────────────────────────── */
function IMessagePreview({ title, description, image, url }: Props) {
  return (
    <div className="space-y-2">
      <p className="text-xs font-medium text-muted-foreground tracking-widest uppercase">iMessage</p>
      <div className="rounded-2xl border border-border overflow-hidden bg-card max-w-xs">
        <OGImage src={image} className="w-full h-40 object-cover" />
        <div className="px-3 py-2.5 space-y-0.5">
          <p className="text-[10px] text-muted-foreground uppercase tracking-wide">{domain(url)}</p>
          <p className="text-sm font-semibold text-foreground line-clamp-2 leading-snug">{title || '—'}</p>
          <p className="text-[11px] text-muted-foreground line-clamp-1">{description}</p>
        </div>
      </div>
    </div>
  );
}

/* ─── Root export ──────────────────────────────────────────────── */
export function PlatformPreviews(props: Props) {
  return (
    <div className="space-y-4">
      <h2 className="text-xs font-medium tracking-widest text-muted-foreground uppercase">
        Platform Previews
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
        <TwitterPreview {...props} />
        <LinkedInPreview {...props} />
        <FacebookPreview {...props} />
        <DiscordPreview {...props} />
        <SlackPreview {...props} />
        <IMessagePreview {...props} />
      </div>
    </div>
  );
}
