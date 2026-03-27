import type { NextRequest } from 'next/server'
import { ogTestHtml } from '@/lib/og-test-html'

export function GET(request: NextRequest) {
  return ogTestHtml(request, '/tests/og-title-long', {
    title: 'short',
    desc: 'short',
    og: {
      title: 'long',
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
