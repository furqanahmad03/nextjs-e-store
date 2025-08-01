import { Skeleton } from "@/components/ui/skeleton"

export default function ProductCardSkeleton() {
  return (
    <div className="group relative bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300">
      {/* Image Skeleton */}
      <div className="aspect-square bg-gray-200 relative overflow-hidden">
        <Skeleton className="w-full h-full" />
      </div>

      {/* Content */}
      <div className="p-4">
        {/* Title Skeleton */}
        <Skeleton className="h-4 w-3/4 mb-2" />
        
        {/* Price Skeleton */}
        <div className="flex items-center gap-2 mb-2">
          <Skeleton className="h-5 w-16" />
          <Skeleton className="h-4 w-12" />
        </div>
        
        {/* Rating Skeleton */}
        <div className="flex items-center gap-2 mb-3">
          <div className="flex gap-1">
            {[...Array(5)].map((_, i) => (
              <Skeleton key={i} className="h-3 w-3" />
            ))}
          </div>
          <Skeleton className="h-3 w-8" />
        </div>
        
        {/* Button Skeleton */}
        <Skeleton className="h-10 w-full" />
      </div>
    </div>
  )
} 