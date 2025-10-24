// components/LoadingSkeleton.tsx
import { Skeleton } from "./ui/skeleton";

export const DashboardLoadingSkeleton = () => {
  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center space-x-4">
        <Skeleton className="h-12 w-12 rounded-full" />
        <div className="space-y-2">
          <Skeleton className="h-4 w-[250px]" />
          <Skeleton className="h-4 w-[200px]" />
        </div>
      </div>
      <div className="space-y-3">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-[300px]" />
      </div>
    </div>
  );
};

export const PageLoadingSkeleton = () => {
  return (
    <div className="p-6 space-y-6">
      <Skeleton className="h-8 w-3/4" />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Skeleton className="h-32 w-full" />
        <Skeleton className="h-32 w-full" />
      </div>
      <Skeleton className="h-64 w-full" />
    </div>
  );
};