import { Skeleton } from "@/shared/ui/skeleton";

export function BlogPostSkeleton() {
  return (
    <div className="space-y-4">
      {[...Array(3)].map((_, i) => (
        <div key={i} className="flex flex-col space-y-3 p-4 border rounded-lg">
          <div className="flex items-center space-x-3">
            <Skeleton className="h-10 w-10 rounded-full" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-[200px]" />
              <Skeleton className="h-3 w-[150px]" />
            </div>
          </div>
          <div className="space-y-2">
            <Skeleton className="h-6 w-3/4" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-5/6" />
          </div>
          <Skeleton className="h-48 w-full rounded-md" />
          <div className="flex items-center justify-between pt-2">
            <Skeleton className="h-4 w-20" />
            <div className="flex space-x-2">
              <Skeleton className="h-4 w-10" />
              <Skeleton className="h-4 w-10" /> 
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
