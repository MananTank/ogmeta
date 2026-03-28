'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { useState } from 'react'
import { ThemeProvider } from 'next-themes'

export function Providers(props: { children: React.ReactNode }) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 60 * 1000,
            refetchOnWindowFocus: false,
          },
        },
      })
  )

  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="dark"
      enableSystem={false}
      storageKey="ogmeta-theme"
      disableTransitionOnChange
    >
      <QueryClientProvider client={queryClient}>
        {props.children}
      </QueryClientProvider>
    </ThemeProvider>
  )
}
