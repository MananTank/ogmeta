import type { GlobalProvider } from '@ladle/react'
import '../app/globals.css'
import './styles.css'
import React from 'react'
import { ThemeProvider } from '../components/theme-provider'
import { LadleThemeSync } from './ladle-theme-sync'

export const Provider: GlobalProvider = function Provider({
  children,
  globalState,
}) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="dark"
      enableSystem
      storageKey="ladle-ogmeta-theme"
      disableTransitionOnChange
    >
      <LadleThemeSync ladleTheme={globalState.theme} />
      <div className="bg-background text-foreground min-h-dvh font-sans antialiased">
        {children}
      </div>
    </ThemeProvider>
  )
}
