import type { Metadata } from 'next'
import { getOgTestsMetadataBase, ogTestsRobotsAllow } from '@/lib/og-test-html'

export const metadata: Metadata = {
  metadataBase: getOgTestsMetadataBase(),
  robots: ogTestsRobotsAllow,
}

export default function TestsLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children
}
