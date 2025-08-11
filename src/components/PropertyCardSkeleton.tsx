import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

const PropertyCardSkeleton = () => {
  return (
    <Card className="overflow-hidden border-gray-200">
      <div className="h-56 w-full">
        <Skeleton className="h-full w-full" />
      </div>
      <div className="p-4 space-y-3">
        <Skeleton className="h-6 w-32" />
        <div className="flex items-center space-x-4">
          <Skeleton className="h-4 w-14" />
          <Skeleton className="h-4 w-14" />
          <Skeleton className="h-4 w-20" />
        </div>
        <Skeleton className="h-5 w-3/4" />
        <Skeleton className="h-4 w-2/3" />
        <div className="flex items-center justify-between">
          <Skeleton className="h-6 w-20 rounded-full" />
          <Skeleton className="h-4 w-32" />
        </div>
      </div>
    </Card>
  );
};

export default PropertyCardSkeleton;
