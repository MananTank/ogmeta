import type { Metadata } from 'next'
import Link from 'next/link'
import { OG_TEST_FIXTURES } from '@/lib/og-test-fixtures'
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

      <ul className="mt-12 space-y-5">
        {TEST_LINKS.map((item) => (
          <li key={item.href}>
            <Link
              href={item.href}
              className="text-muted-foreground hover:text-foreground decoration-muted-foreground/20 hover:decoration-foreground/30 text-base underline underline-offset-4"
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </main>
  )
}
