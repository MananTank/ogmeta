'use client'

import { useEffect } from 'react'
import { ThemeState } from '@ladle/react'
import { useTheme } from 'next-themes'

/** Keeps `next-themes` in sync with Ladle’s theme addon (toolbar / hotkey `d`). */
export function LadleThemeSync(props: { ladleTheme: ThemeState }) {
  const { setTheme } = useTheme()

  useEffect(() => {
    if (props.ladleTheme === ThemeState.Dark) setTheme('dark')
    else if (props.ladleTheme === ThemeState.Light) setTheme('light')
    else setTheme('system')
  }, [props.ladleTheme, setTheme])

  return null
}
