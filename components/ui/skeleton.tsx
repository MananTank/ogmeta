import { cn } from '@/lib/utils'

function Skeleton({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="skeleton"
      className={cn('bg-accent animate-pulse rounded-md', className)}
      {...props}
    />
  )
}

export function SkeletonContainer<T>(props: {
  loadedData?: T
  skeletonData: T
  className?: string
  render: (data: T) => React.ReactNode
  style?: React.CSSProperties
}) {
  const isLoading = props.loadedData === undefined
  return (
    <div
      aria-hidden={isLoading ? 'true' : 'false'}
      className={cn(
        isLoading && 'bg-muted inline-block animate-pulse rounded-lg',
        props.className
      )}
      style={props.style}
    >
      <div className={cn(isLoading && 'invisible')}>
        <div
          className={cn(
            'transition-opacity duration-300',
            isLoading ? 'opacity-0' : 'opacity-100'
          )}
        >
          {props.render(
            props.loadedData === undefined
              ? props.skeletonData
              : props.loadedData
          )}
        </div>
      </div>
    </div>
  )
}

export { Skeleton }
