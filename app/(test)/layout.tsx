import localFont from 'next/font/local'
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

export default function RootLayout(
  props: Readonly<{ children: React.ReactNode }>
) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${openRunde.variable}`}
    >
      <body className="bg-background text-foreground min-h-screen font-sans antialiased">
        <Providers>{props.children}</Providers>
      </body>
    </html>
  )
}
