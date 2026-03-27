import type { NextRequest } from 'next/server'
import { ogTestHtml } from '@/lib/og-test-html'

export function GET(request: NextRequest) {
  return ogTestHtml(request, '/tests/no-og-title', {
    title: 'short',
    desc: 'none',
    og: {
      title: 'none',
      desc: 'short',
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
