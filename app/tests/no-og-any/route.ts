import type { NextRequest } from 'next/server'
import { ogTestHtml } from '@/lib/og-test-html'

export function GET(request: NextRequest) {
  return ogTestHtml(request, '/tests/no-og-any', {
    title: 'short',
    desc: 'short',
    og: {
      title: 'none',
      desc: 'none',
      image: 'none',
      type: 'website',
    },
    twitter: {
      title: 'none',
      card: 'none',
      description: 'none',
    },
  })
}
