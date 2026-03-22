import { Skeleton } from '@/components/ui/skeleton'

export function OGPreviewSkeleton() {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Skeleton className="h-3 w-32" />
      </div>

      <Skeleton className="aspect-[1.91/1] w-full rounded-xl" />

      <div className="bg-card/50 border-border/50 grid gap-4 rounded-xl border p-5">
        <div className="space-y-2">
          <Skeleton className="h-4 w-3/4" />
        </div>
        <div className="space-y-2">
          <Skeleton className="h-3 w-full" />
          <Skeleton className="h-3 w-4/5" />
        </div>
        <div className="space-y-2">
          <Skeleton className="h-3 w-2/3" />
        </div>
      </div>
    </div>
  )
}
