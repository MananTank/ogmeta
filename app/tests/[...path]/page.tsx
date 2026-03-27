import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { OG_TEST_FIXTURES } from '@/lib/og-test-fixtures'
import {
  getOgTestsMetadataBase,
  ogTestOptionsToMetadata,
} from '@/lib/og-test-html'
import Link from 'next/link'
import { ArrowLeftIcon, CornerUpLeftIcon } from 'lucide-react'

export const dynamic = 'force-static'

export function generateStaticParams() {
  return Object.keys(OG_TEST_FIXTURES).map((key) => ({
    path: key.split('/'),
  }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ path: string[] }>
}): Promise<Metadata> {
  const { path } = await params
  const key = path.join('/')
  const fixture = OG_TEST_FIXTURES[key]
  if (!fixture) return {}
  const pathname = `/tests/${key}`
  return ogTestOptionsToMetadata(
    fixture.config,
    pathname,
    getOgTestsMetadataBase()
  )
}

export default async function TestsFixturePage({
  params,
}: {
  params: Promise<{ path: string[] }>
}) {
  const { path } = await params
  const key = path.join('/')
  const fixture = OG_TEST_FIXTURES[key]
  if (!fixture) notFound()

  return (
    <main className="mx-auto max-w-2xl px-6 py-12 font-sans">
      {/* back link */}
      <Link
        href="/tests"
        className="text-muted-foreground hover:text-foreground mb-12 flex items-center gap-2 text-sm"
      >
        <CornerUpLeftIcon className="size-5" />
      </Link>

      <h1 className="mb-4 text-lg font-semibold tracking-tight">{key}</h1>
      <code className="bg-card block w-full rounded-2xl p-4 text-sm whitespace-pre-wrap">
        {JSON.stringify(fixture, null, 2)}
      </code>
    </main>
  )
}
