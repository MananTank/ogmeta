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

      {/* Tweet chrome — max 600px like the real feed column */}
      <div className="w-full font-sans" style={{ maxWidth: 600 }}>

        {/* X app chrome bar */}
        <div className="rounded-t-xl border border-border border-b-0 bg-[oklch(0.06_0_0)] px-4 py-2 flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <div className="w-2 h-2 rounded-full bg-[oklch(0.25_0_0)]" />
            <div className="w-2 h-2 rounded-full bg-[oklch(0.25_0_0)]" />
            <div className="w-2 h-2 rounded-full bg-[oklch(0.25_0_0)]" />
          </div>
          {/* X logo */}
          <svg viewBox="0 0 24 24" className="w-4 h-4 fill-foreground opacity-60" aria-label="X">
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.746l7.73-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
          </svg>
          <div className="w-12" />
        </div>

        {/* Tweet body */}
        <div className="border-x border-border bg-[oklch(0.04_0_0)] px-4 pt-3 pb-0">
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

              {/* OG Card */}
              <div className="mt-3 rounded-2xl border border-border overflow-hidden" style={{ maxWidth: 516 }}>
                <OGImage src={image} className="w-full h-auto block" />
                <div className="px-3 py-2.5 space-y-0.5 bg-[oklch(0.06_0_0)]">
                  <p className="text-[12px] text-muted-foreground">{domain(url)}</p>
                  <p className="text-sm font-semibold text-foreground leading-snug line-clamp-2">{title || '—'}</p>
                  {description && <p className="text-[12px] text-muted-foreground line-clamp-2 leading-relaxed">{description}</p>}
                </div>
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

        {/* Bottom chrome bar */}
        <div className="rounded-b-xl border border-border border-t border-t-border bg-[oklch(0.06_0_0)] px-4 py-2 flex justify-around text-muted-foreground">
          {/* Home */}
          <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current opacity-50"><path d="M12 1.696L.622 9.947l1.04 1.434L3 10.36V19.5C3 20.881 4.119 22 5.5 22h4a1 1 0 001-1v-4h3v4a1 1 0 001 1h4c1.381 0 2.5-1.119 2.5-2.5V10.36l1.338.998 1.04-1.366L12 1.696zM17 20h-2v-4a1 1 0 00-1-1h-4a1 1 0 00-1 1v4H7v-9.987l5-3.528 5 3.528V20z"/></svg>
          {/* Search */}
          <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current opacity-50"><path d="M10.25 3.75c-3.59 0-6.5 2.91-6.5 6.5s2.91 6.5 6.5 6.5c1.795 0 3.419-.726 4.596-1.904 1.178-1.177 1.904-2.801 1.904-4.596 0-3.59-2.91-6.5-6.5-6.5zm-8.5 6.5c0-4.694 3.806-8.5 8.5-8.5s8.5 3.806 8.5 8.5c0 1.986-.682 3.815-1.814 5.262l4.276 4.276-1.414 1.414-4.276-4.276c-1.447 1.132-3.276 1.814-5.272 1.814-4.694 0-8.5-3.806-8.5-8.5z"/></svg>
          {/* Notifications */}
          <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current opacity-50"><path d="M11.996 2c-4.062 0-7.49 3.021-7.999 7.051L2.866 13H1v2h3.882l.891-1.051c.456-.537.94-1.489 1.23-2.94.291-1.452.489-2.731.489-3.509C7.492 5.17 9.533 4 11.996 4s4.504 1.17 4.504 3.5c0 .778.198 2.057.49 3.51.29 1.45.773 2.402 1.229 2.939l.89 1.051H23v-2h-1.866l-1.131-3.949C19.494 5.021 16.058 2 11.996 2zM9 19c0 1.105.896 2 2 2h2c1.104 0 2-.895 2-2H9z"/></svg>
          {/* Profile */}
          <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current opacity-50"><path d="M5.651 19h12.698c-.337-1.8-1.023-2.15-2.28-2.984C14.974 15.416 13.526 15 12 15c-1.526 0-2.974.416-4.069 1.016-1.257.834-1.943 1.185-2.28 2.984zm.486-5.56C7.627 11.85 9.648 11 12 11s4.373.85 5.863 2.44c1.477 1.581 2.137 3.846 2.137 6.56v1H4v-1c0-2.714.66-4.979 2.137-6.56zM12 10c-2.206 0-4-1.794-4-4s1.794-4 4-4 4 1.794 4 4-1.794 4-4 4zm0-2c1.103 0 2-.897 2-2s-.897-2-2-2-2 .897-2 2 .897 2 2 2z"/></svg>
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
