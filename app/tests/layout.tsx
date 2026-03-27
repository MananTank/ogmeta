import type { Metadata } from 'next'
import { getOgTestsMetadataBase } from '@/lib/og-test-html'

export const metadata: Metadata = {
  metadataBase: getOgTestsMetadataBase(),
}

export default function TestsLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children
}
