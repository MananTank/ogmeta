'use client'

import * as React from 'react'

import { cn } from '@/lib/utils'

export type ImgProps = Omit<
  React.ComponentPropsWithoutRef<'img'>,
  'src' | 'children'
> & {
  src?: string | null
  fallback: React.ReactNode
}

export function Img({ src, fallback, className, onError, ...props }: ImgProps) {
  const [failed, setFailed] = React.useState(false)

  React.useEffect(() => {
    setFailed(false)
  }, [src])

  if (!src || failed) {
    return <>{fallback}</>
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text -- generic primitive; callers control src
    <img
      data-slot="img"
      src={src}
      className={cn(className)}
      onError={(e) => {
        setFailed(true)
        onError?.(e)
      }}
      {...props}
    />
  )
}
