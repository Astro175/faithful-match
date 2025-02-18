import { Skeleton } from "@/components/ui/skeleton";

export function ProfileSkeleton() {
  return (
    <div className="flex items-center gap-3">
      <Skeleton className="w-10 h-10 rounded-full" />
      <div>
        <Skeleton className="w-24 h-4 mb-1" />
        <Skeleton className="w-16 h-3" />
      </div>
    </div>
  );
}