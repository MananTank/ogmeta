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
   Full tweet chrome with avatar, handle, post text, and OG card.
   Card renders at max 516px in the feed (summary_large_image).
─────────────────────────────────────────────────────────────────── */
function TwitterPreview({ title, description, image, url }: Props) {
  return (
    <div>
      <Label>X (Twitter)</Label>

      {/* Tweet — max 600px like the real feed column */}
      <div className="w-full font-sans" style={{ maxWidth: 600 }}>

        {/* Tweet body */}
        <div className="border border-border rounded-xl bg-[oklch(0.04_0_0)] px-4 pt-3 pb-0">
          <div className="flex gap-3">
            {/* Avatar */}
            <div className="shrink-0">
              <div className="w-10 h-10 rounded-full bg-[oklch(0.18_0_0)] flex items-center justify-center text-muted-foreground">
                <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current"><path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z"/></svg>
              </div>
            </div>

            <div className="flex-1 min-w-0">
              {/* Name + handle + time */}
              <div className="flex items-center gap-1.5 flex-wrap">
                <span className="text-sm font-bold text-foreground">Example User</span>
                <span className="text-sm text-muted-foreground">@exampleuser</span>
                <span className="text-muted-foreground text-sm">·</span>
                <span className="text-sm text-muted-foreground">2h</span>
              </div>

              {/* Post text */}
              <p className="text-sm text-foreground mt-1 leading-relaxed">
                This is an example of a twitter post
              </p>

              {/* OG Card — image fills card, title badge overlaid on bottom, domain below */}
              <div className="mt-3" style={{ maxWidth: 516 }}>
                <div className="rounded-2xl border border-border overflow-hidden relative">
                  <OGImage src={image} className="w-full h-auto block" />
                  {title && (
                    <div className="absolute bottom-3 left-3 right-3">
                      <span className="inline-block text-foreground text-[13px] font-semibold px-3 py-1.5 rounded-full line-clamp-1 max-w-full" style={{ backgroundColor: 'rgba(10,10,10,0.85)', backdropFilter: 'blur(8px)' }}>
                        {title}
                      </span>
                    </div>
                  )}
                </div>
                <p className="text-[13px] text-muted-foreground mt-1.5 ml-0.5">
                  From {domain(url)}
                </p>
              </div>

              {/* Action bar */}
              <div className="flex items-center justify-between mt-3 pb-3 max-w-[425px] text-muted-foreground">
                {/* Reply */}
                <button className="flex items-center gap-1.5 hover:text-sky-400 transition-colors group">
                  <svg viewBox="0 0 24 24" className="w-4 h-4 fill-none stroke-current stroke-[1.5]"><path d="M1.751 10c0-4.42 3.584-8 8.005-8h4.366c4.49 0 7.501 3.58 7.501 8 0 4.25-2.91 7.73-6.965 8l-4.902.001c-.08 0-4.905-4.001-4.905-8.001z"/></svg>
                  <span className="text-xs">24</span>
                </button>
                {/* Repost */}
                <button className="flex items-center gap-1.5 hover:text-green-400 transition-colors">
                  <svg viewBox="0 0 24 24" className="w-4 h-4 fill-none stroke-current stroke-[1.5]"><path d="M4.5 3.88l4.432 4.14-1.364 1.46L5.5 7.55V16c0 1.1.896 2 2 2H13v2H7.5c-2.209 0-4-1.79-4-4V7.55L1.432 9.48.068 8.02 4.5 3.88zM16.5 6H11V4h5.5c2.209 0 4 1.79 4 4v8.45l2.068-1.93 1.364 1.46-4.432 4.14-4.432-4.14 1.364-1.46 2.068 1.93V8c0-1.1-.896-2-2-2z"/></svg>
                  <span className="text-xs">8</span>
                </button>
                {/* Like */}
                <button className="flex items-center gap-1.5 hover:text-pink-400 transition-colors">
                  <svg viewBox="0 0 24 24" className="w-4 h-4 fill-none stroke-current stroke-[1.5]"><path d="M16.697 5.5c-1.222-.06-2.679.51-3.89 2.16l-.003.01-.003-.01C11.88 6.01 10.423 5.44 9.2 5.5c-1.134.06-2.31.705-3.036 1.73-.74 1.055-.965 2.61-.267 4.4l.01.02.013.019c1.956 2.83 7.087 7.38 5.586 8.552L12 21.03l.494-.308c-.082-.072 4.364-4.653 5.588-8.554l.013-.02.01-.019c.698-1.79.473-3.345-.267-4.4-.726-1.025-1.902-1.67-3.142-1.73z"/></svg>
                  <span className="text-xs">142</span>
                </button>
                {/* Views */}
                <button className="flex items-center gap-1.5 hover:text-sky-400 transition-colors">
                  <svg viewBox="0 0 24 24" className="w-4 h-4 fill-none stroke-current stroke-[1.5]"><path d="M8.75 21V3h2v18h-2zM18 21V8.5h2V21h-2zM4 21l.004-10h2L6 21H4zm9.248 0v-7h2v7h-2z"/></svg>
                  <span className="text-xs">12.4K</span>
                </button>
                {/* Bookmark */}
                <button className="flex items-center gap-1.5 hover:text-sky-400 transition-colors">
                  <svg viewBox="0 0 24 24" className="w-4 h-4 fill-none stroke-current stroke-[1.5]"><path d="M4 4.5C4 3.12 5.119 2 6.5 2h11C18.881 2 20 3.12 20 4.5v18.44l-8-5.71-8 5.71V4.5z"/></svg>
                </button>
              </div>
            </div>
          </div>
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
