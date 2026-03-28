import type { Metadata } from 'next'
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

export const metadata: Metadata = {
  title: 'og meta',
  description: 'Preview links on social platforms',
  // icons: {
  //   icon: [
  //     {
  //       url: '/icon-light-32x32.png',
  //       media: '(prefers-color-scheme: light)',
  //     },
  //     {
  //       url: '/icon-dark-32x32.png',
  //       media: '(prefers-color-scheme: dark)',
  //     },
  //     {
  //       url: '/icon.svg',
  //       type: 'image/svg+xml',
  //     },
  //   ],
  //   apple: '/apple-icon.png',
  // },
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
