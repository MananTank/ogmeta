import type { NextRequest } from 'next/server'
import { ogTestHtml } from '@/lib/og-test-html'

export function GET(request: NextRequest) {
  return ogTestHtml(request, '/tests/og-description-long', {
    title: 'short',
    desc: 'short',
    og: {
      title: 'short',
      desc: 'long',
      image: '1200/630',
      type: 'website',
    },
    twitter: {
      title: 'none',
      card: 'none',
      description: 'none',
    },
  })
}
