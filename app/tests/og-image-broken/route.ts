import type { NextRequest } from 'next/server'
import { ogTestHtml } from '@/lib/og-test-html'

export function GET(request: NextRequest) {
  return ogTestHtml(request, '/tests/og-image-broken', {
    title: 'short',
    desc: 'short',
    og: {
      title: 'short',
      desc: 'short',
      image: 'broken',
      type: 'website',
    },
    twitter: {
      title: 'none',
      card: 'none',
      description: 'none',
    },
  })
}
