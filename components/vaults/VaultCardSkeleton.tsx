import { Skeleton } from "@/components/ui/skeleton";

export function VaultCardSkeleton() {
  return (
    <div className="rounded-lg border bg-card p-6 shadow-sm">
      <div className="mb-4 flex items-center justify-between">
        <Skeleton className="h-6 w-32" />
        <Skeleton className="h-6 w-16" />
      </div>
      <div className="space-y-3">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="flex justify-between">
            <Skeleton className="h-4 w-20" />
            <Skeleton className="h-4 w-16" />
          </div>
        ))}
      </div>
      <div className="mt-4 flex justify-end space-x-2">
        <Skeleton className="h-9 w-16" />
        <Skeleton className="h-9 w-24" />
      </div>
    </div>
  );
}
