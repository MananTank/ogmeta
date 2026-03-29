import type { Metadata } from 'next'
import Link from 'next/link'
import { CopyTestSnippetButton } from './components/copy-test-snippet-button'
import { OG_TEST_FIXTURES } from '@/tests/og-test-fixtures'
import { getOgTestsMetadataBase } from '@/tests/og-test-data'
import { InspectionPanelIcon } from 'lucide-react'

export const metadata: Metadata = {
  title: 'OG test fixtures',
  description:
    'Static HTML fixtures for Open Graph and Twitter card behavior (missing fields, images, aspect ratios).',
}

const TEST_LINKS = Object.keys(OG_TEST_FIXTURES).map((key) => ({
  href: `/tests/${key}`,
  label: key,
}))

export default function TestsIndexPage() {
  const metadataBase = getOgTestsMetadataBase()

  return (
    <main className="mx-auto max-w-xl px-6 pt-24 pb-32 font-sans">
      <Link href="/" className="mb-8 block">
        <InspectionPanelIcon className="text-muted-foreground/50 size-8" />
      </Link>
      <h1 className="text-lg font-medium tracking-tight lowercase">
        OG Meta Tests
      </h1>
      <p className="text-muted-foreground mt-2 text-base leading-relaxed">
        This is a collection of test pages to test how various metadata
        configurations are rendered on social platforms
      </p>

      <ul className="-mx-3 mt-12 flex flex-col gap-0">
        {TEST_LINKS.map((item) => {
          const fullUrl = new URL(item.href, metadataBase).href
          return (
            <li
              key={item.href}
              className="group hover:bg-muted/60 relative flex items-center gap-2 rounded-lg px-3 py-2"
            >
              <Link
                href={item.href}
                className="focus-visible:ring-ring focus-visible:ring-offset-background absolute inset-0 z-0 rounded-lg outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
                aria-label={`Open fixture ${item.label}`}
              />
              <span
                aria-hidden
                className="text-muted-foreground group-hover:text-foreground pointer-events-none relative z-10 min-w-0 flex-1 text-base"
              >
                {item.label}
              </span>
              <CopyTestSnippetButton
                pathname={item.href}
                fullUrl={fullUrl}
                className="group-hover:text-foreground relative z-10"
              />
            </li>
          )
        })}
      </ul>
    </main>
  )
}
