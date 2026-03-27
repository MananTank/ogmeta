import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'OG test fixtures',
  description:
    'Static HTML fixtures for Open Graph and Twitter card behavior (missing fields, images, aspect ratios).',
  robots: {
    index: false,
    follow: false,
  },
}

const FIXTURES: { href: string; label: string }[] = [
  { href: '/tests/complete', label: 'Priority 1 — complete (baseline)' },
  { href: '/tests/no-og-title', label: 'Priority 1 — no og:title' },
  { href: '/tests/no-og-description', label: 'Priority 1 — no og:description' },
  { href: '/tests/no-og-image', label: 'Priority 1 — no og:image' },
  { href: '/tests/no-og-any', label: 'Priority 1 — no Open Graph at all' },
  {
    href: '/tests/og-image-relative',
    label: 'Priority 2 — og:image relative URL',
  },
  { href: '/tests/og-image-broken', label: 'Priority 2 — og:image 404' },
  { href: '/tests/og-image-multiple', label: 'Priority 2 — multiple og:image' },
  { href: '/tests/og-square', label: 'Priority 2 — square og:image (1:1)' },
  { href: '/tests/twitter-only', label: 'Priority 3 — Twitter tags only' },
  { href: '/tests/og-only-no-twitter', label: 'Priority 3 — Open Graph only' },
  {
    href: '/tests/twitter-card-summary',
    label: 'Priority 3 — twitter:card summary',
  },
  {
    href: '/tests/twitter-card-large-image',
    label: 'Priority 3 — twitter:card summary_large_image',
  },
  { href: '/tests/og-title-long', label: 'Priority 4 — very long og:title' },
  {
    href: '/tests/og-description-long',
    label: 'Priority 4 — very long og:description',
  },
]

export default function TestsIndexPage() {
  return (
    <main className="mx-auto max-w-2xl px-6 py-12 font-sans">
      <h1 className="text-2xl font-semibold tracking-tight">
        OG test fixtures
      </h1>
      <p className="text-muted-foreground mt-2 text-sm leading-relaxed">
        Each URL returns hand-written HTML so meta tags match the scenario
        (Next.js{' '}
        <code className="bg-muted rounded px-1 py-0.5 text-xs">metadata</code>{' '}
        would mirror{' '}
        <code className="bg-muted rounded px-1 py-0.5 text-xs">title</code> into{' '}
        <code className="bg-muted rounded px-1 py-0.5 text-xs">og:title</code>,
        which would break “missing” cases).
      </p>
      <ul className="mt-8 space-y-2">
        {FIXTURES.map((item) => (
          <li key={item.href}>
            <Link
              href={item.href}
              className="text-primary text-sm underline-offset-4 hover:underline"
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </main>
  )
}
