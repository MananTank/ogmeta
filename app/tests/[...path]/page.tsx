import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { OG_TEST_FIXTURES } from '@/lib/og-test-fixtures'
import {
  getOgTestsMetadataBase,
  ogTestOptionsToMetadata,
} from '@/lib/og-test-html'

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
  const options = OG_TEST_FIXTURES[key]
  if (!options) return {}
  const pathname = `/tests/${key}`
  return ogTestOptionsToMetadata(options, pathname, getOgTestsMetadataBase())
}

export default async function TestsFixturePage({
  params,
}: {
  params: Promise<{ path: string[] }>
}) {
  const { path } = await params
  const key = path.join('/')
  const options = OG_TEST_FIXTURES[key]
  if (!options) notFound()

  return (
    <main className="mx-auto max-w-2xl px-6 py-12 font-sans">
      <h1 className="mb-4 text-lg font-semibold tracking-tight">{key}</h1>
      <code className="bg-card block w-full rounded-2xl p-4 text-sm whitespace-pre-wrap">
        {JSON.stringify(options, null, 2)}
      </code>
    </main>
  )
}
