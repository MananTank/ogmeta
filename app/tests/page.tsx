import type { Metadata } from 'next'
import Link from 'next/link'
import { OG_TEST_FIXTURES } from '@/lib/og-test-fixtures'
import { ogTestsRobotsAllow } from '@/lib/og-test-html'

export const metadata: Metadata = {
  title: 'OG test fixtures',
  description:
    'Static HTML fixtures for Open Graph and Twitter card behavior (missing fields, images, aspect ratios).',
  robots: ogTestsRobotsAllow,
}

const TEST_LINKS = Object.keys(OG_TEST_FIXTURES).map((key) => ({
  href: `/tests/${key}`,
  label: key,
}))

export default function TestsIndexPage() {
  return (
    <main className="mx-auto max-w-xl px-6 py-12 font-sans">
      <h1 className="text-2xl font-semibold tracking-tight">Tests</h1>
      <p className="text-muted-foreground mt-2 text-sm leading-relaxed">
        All the cases will be tested in the actual apps like Twitter, LinkedIn,
        etc. to see how they handle the cases
      </p>
      <ul className="mt-8 space-y-2">
        {TEST_LINKS.map((item) => (
          <li key={item.href}>
            <Link
              href={item.href}
              className="text-sm underline-offset-4 hover:underline"
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </main>
  )
}
