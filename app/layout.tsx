import type { Metadata } from 'next'
import localFont from 'next/font/local'
import { Geist_Mono, Instrument_Serif } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { Providers } from '@/components/providers'
import { ThemeProvider } from '@/components/theme-provider'
import './globals.css'

const openRunde = localFont({
  src: [
    {
      path: '../public/fonts/OpenRunde-Regular.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../public/fonts/OpenRunde-Medium.woff2',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../public/fonts/OpenRunde-Semibold.woff2',
      weight: '600',
      style: 'normal',
    },
  ],
  variable: '--font-open-runde',
  display: 'swap',
})

const geistMono = Geist_Mono({
  subsets: ['latin'],
  variable: '--font-geist-mono',
})

const instrumentSerif = Instrument_Serif({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-instrument-serif',
})

export const metadata: Metadata = {
  title: 'OG Meta - Check OpenGraph Tags',
  description:
    'Preview how your URLs appear when shared on social media and messaging apps. Check OpenGraph metadata for any website.',
  generator: 'v0.app',
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export default function RootLayout(
  props: Readonly<{ children: React.ReactNode }>
) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`dark ${openRunde.variable} ${geistMono.variable} ${instrumentSerif.variable}`}
    >
      <body className="bg-background text-foreground min-h-screen font-sans antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          storageKey="ogmeta-theme"
          disableTransitionOnChange
        >
          {/* <SiteHeader /> */}
          <Providers>{props.children}</Providers>
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  )
}
