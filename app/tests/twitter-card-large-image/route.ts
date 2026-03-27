import type { NextRequest } from 'next/server'
import { ogTestHtml } from '@/lib/og-test-html'

export function GET(request: NextRequest) {
  return ogTestHtml(request, '/tests/twitter-card-large-image', {
    title: 'short',
    desc: 'short',
    og: {
      title: 'short',
      desc: 'short',
      image: '1200/630',
      type: 'website',
    },
    twitter: {
      title: 'short',
      card: 'summary_large_image',
      description: 'short',
    },
  })
}
