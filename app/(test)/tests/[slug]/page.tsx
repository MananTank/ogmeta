import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { OG_TEST_FIXTURES } from '@/tests/og-test-fixtures'
import {
  getOgTestsMetadataBase,
  generateNextjsMetadata,
} from '@/tests/og-test-data'
import Link from 'next/link'
import { CornerUpLeftIcon } from 'lucide-react'

export const dynamic = 'force-static'

export function generateStaticParams() {
  return Object.keys(OG_TEST_FIXTURES).map((slug) => ({ slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const fixture = OG_TEST_FIXTURES[slug]
  if (!fixture) return {}
  const pathname = `/tests/${slug}`
  return generateNextjsMetadata(
    fixture.config,
    pathname,
    getOgTestsMetadataBase()
  )
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const fixture = OG_TEST_FIXTURES[slug]
  if (!fixture) notFound()

  return (
    <main className="mx-auto max-w-xl px-6 pt-24 pb-32 font-sans">
      <Link
        href="/tests"
        className="text-muted-foreground hover:text-foreground mb-12 flex items-center gap-2 text-sm"
      >
        <CornerUpLeftIcon className="size-8" />
      </Link>

      <h1 className="text-lg font-medium tracking-tight lowercase">{slug}</h1>
      <div className="mt-4">
        <code className="bg-card block w-full rounded-2xl p-4 text-sm whitespace-pre-wrap">
          {JSON.stringify(fixture, null, 2)}
        </code>
      </div>
    </main>
  )
}
