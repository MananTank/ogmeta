import type { Metadata, Viewport } from 'next'
import localFont from 'next/font/local'
import { Analytics } from '@vercel/analytics/next'
import { Providers } from '@/components/providers'
import '../globals.css'

const openRunde = localFont({
  src: [
    {
      path: '../../public/fonts/OpenRunde-Regular.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../../public/fonts/OpenRunde-Medium.woff2',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../../public/fonts/OpenRunde-Semibold.woff2',
      weight: '600',
      style: 'normal',
    },
  ],
  variable: '--font-open-runde',
  display: 'swap',
})

const siteUrl = 'https://ogmeta.app'
const title = 'og meta'
const siteName = 'og meta'
const description =
  'Preview links on social platforms like X, Facebook, LinkedIn, and Slack using Open Graph metadata'

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: title,
    template: '%s | og meta',
  },
  description,
  applicationName: siteName,
  keywords: [
    'open graph preview',
    'OG metadata preview',
    'twitter card preview',
  ],
  authors: [{ name: 'Manan Tank', url: 'https://x.com/MananTank' }],
  creator: 'Manan Tank',
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  alternates: {
    canonical: '/',
  },
  appleWebApp: {
    title: siteName,
  },
  openGraph: {
    title,
    description,
    siteName,
    type: 'website',
    url: siteUrl,
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title,
    description,
    site: '@MananTank',
    creator: '@MananTank',
  },
}

export default function RootLayout(
  props: Readonly<{ children: React.ReactNode }>
) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${openRunde.variable}`}
    >
      <head>
        <meta name="apple-mobile-web-app-title" content="og meta" />
      </head>
      <body className="bg-background text-foreground min-h-screen font-sans antialiased">
        <Providers>{props.children}</Providers>
        <Analytics />
      </body>
    </html>
  )
}
