import type { GlobalProvider } from '@ladle/react'
import '../app/globals.css'
import './styles.css'
import React from 'react'

export const Provider: GlobalProvider = ({ children }) => {
  return (
    <div className="dark bg-background text-foreground min-h-dvh">
      {children}
    </div>
  )
}
