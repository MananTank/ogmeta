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

function Label({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-xs font-medium text-muted-foreground tracking-widest uppercase mb-2">
      {children}
    </p>
  );
}

/* ─── Twitter / X ──────────────────────────────────────────────────
   Card renders at ~516px wide in the tweet feed.
   summary_large_image: image above, 1.78:1 ratio, title + description below.
─────────────────────────────────────────────────────────────────── */
function TwitterPreview({ title, description, image, url }: Props) {
  return (
    <div>
      <Label>X (Twitter)</Label>
      <div className="rounded-2xl border border-border overflow-hidden bg-card w-full" style={{ maxWidth: 516 }}>
        <OGImage src={image} className="w-full aspect-[1.78/1] object-cover" />
        <div className="px-3 py-2.5 space-y-0.5">
          <p className="text-[11px] text-muted-foreground">{domain(url)}</p>
          <p className="text-sm font-semibold text-foreground leading-snug line-clamp-2">{title || '—'}</p>
          <p className="text-[11px] text-muted-foreground line-clamp-1">{description}</p>
        </div>
      </div>
    </div>
  );
}

/* ─── LinkedIn ─────────────────────────────────────────────────────
   Link preview card renders at ~552px in the feed.
   Image above at 1.91:1, title + domain below on a grey background.
─────────────────────────────────────────────────────────────────── */
function LinkedInPreview({ title, description, image, url }: Props) {
  return (
    <div>
      <Label>LinkedIn</Label>
      <div className="rounded-sm border border-border overflow-hidden bg-card w-full" style={{ maxWidth: 552 }}>
        <OGImage src={image} className="w-full aspect-[1.91/1] object-cover" />
        <div className="px-3 py-3 bg-secondary space-y-0.5">
          <p className="text-sm font-semibold text-foreground line-clamp-2 leading-snug">{title || '—'}</p>
          <p className="text-[11px] text-muted-foreground">{domain(url)}</p>
        </div>
      </div>
    </div>
  );
}

/* ─── Facebook ─────────────────────────────────────────────────────
   Link preview renders at ~500px wide. No border-radius on the card.
   Domain uppercase above title, description below.
─────────────────────────────────────────────────────────────────── */
function FacebookPreview({ title, description, image, url }: Props) {
  return (
    <div>
      <Label>Facebook</Label>
      <div className="border border-border overflow-hidden bg-card w-full" style={{ maxWidth: 500 }}>
        <OGImage src={image} className="w-full aspect-[1.91/1] object-cover" />
        <div className="px-3 py-2.5 bg-secondary space-y-0.5">
          <p className="text-[10px] text-muted-foreground uppercase tracking-wide">{domain(url)}</p>
          <p className="text-sm font-bold text-foreground line-clamp-2 leading-snug">{title || '—'}</p>
          <p className="text-[11px] text-muted-foreground line-clamp-2">{description}</p>
        </div>
      </div>
    </div>
  );
}

/* ─── Discord ──────────────────────────────────────────────────────
   Embeds are capped at ~432px. Left accent border, no separate image header —
   image appears below the text block.
─────────────────────────────────────────────────────────────────── */
function DiscordPreview({ title, description, image, url }: Props) {
  return (
    <div>
      <Label>Discord</Label>
      <div
        className="rounded-sm border border-border overflow-hidden bg-card w-full p-3 space-y-1.5"
        style={{ maxWidth: 432, borderLeft: '4px solid oklch(0.35 0 0)' }}
      >
        <p className="text-xs font-semibold text-muted-foreground">{domain(url)}</p>
        <p className="text-sm font-bold text-foreground line-clamp-2 leading-snug">{title || '—'}</p>
        <p className="text-xs text-muted-foreground line-clamp-3 leading-relaxed">{description}</p>
        <OGImage src={image} className="w-full max-w-xs aspect-[1.78/1] object-cover rounded mt-1" />
      </div>
    </div>
  );
}

/* ─── Slack ────────────────────────────────────────────────────────
   Unfurls render at ~400px. Left accent border, image thumbnail
   sits below the text content (max ~360px wide).
─────────────────────────────────────────────────────────────────── */
function SlackPreview({ title, description, image, url }: Props) {
  return (
    <div>
      <Label>Slack</Label>
      <div
        className="rounded border border-border overflow-hidden bg-card w-full px-3 py-2.5 space-y-1"
        style={{ maxWidth: 400, borderLeft: '3px solid oklch(0.3 0 0)' }}
      >
        <p className="text-xs font-bold text-foreground">{domain(url)}</p>
        <p className="text-sm font-semibold text-foreground line-clamp-2 leading-snug">{title || '—'}</p>
        <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">{description}</p>
        <OGImage src={image} className="mt-1.5 aspect-[1.91/1] object-cover rounded w-full max-w-[360px]" />
      </div>
    </div>
  );
}

/* ─── iMessage ─────────────────────────────────────────────────────
   Rich link bubble is ~320px. Rounded 2xl, image on top,
   title + domain below. No description shown by default.
─────────────────────────────────────────────────────────────────── */
function IMessagePreview({ title, description, image, url }: Props) {
  return (
    <div>
      <Label>iMessage</Label>
      <div className="rounded-2xl border border-border overflow-hidden bg-card w-full" style={{ maxWidth: 320 }}>
        <OGImage src={image} className="w-full aspect-[1.91/1] object-cover" />
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
      <div className="flex flex-col gap-10">
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
