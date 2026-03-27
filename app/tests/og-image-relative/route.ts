import type { NextRequest } from 'next/server'
import { ogTestHtml } from '@/lib/og-test-html'

export function GET(request: NextRequest) {
  return ogTestHtml(request, '/tests/og-image-relative', {
    title: 'short',
    desc: 'short',
    og: {
      title: 'short',
      desc: 'short',
      image: 'relative',
      type: 'website',
    },
    twitter: {
      title: 'none',
      card: 'none',
      description: 'none',
    },
  })
}
