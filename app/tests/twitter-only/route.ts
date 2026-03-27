import type { NextRequest } from 'next/server'
import { ogTestHtml } from '@/lib/og-test-html'

export function GET(request: NextRequest) {
  return ogTestHtml(request, '/tests/twitter-only', {
    title: 'short',
    desc: 'none',
    og: {
      title: 'none',
      desc: 'none',
      image: 'none',
      type: 'website',
    },
    twitter: {
      title: 'short',
      card: 'summary_large_image',
      description: 'short',
    },
  })
}
