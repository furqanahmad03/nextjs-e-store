import { Skeleton } from "@/components/ui/skeleton"
import ProductCardSkeleton from "./ProductCardSkeleton"

export default function ProductCarouselSkeleton() {
  return (
    <section className="w-full bg-white py-8 min-h-fit">
      <div className="max-w-allowed mx-auto px-4">
        {/* Header Skeleton */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <Skeleton className="w-2 h-8" />
            <div>
              <Skeleton className="h-4 w-16 mb-1" />
              <Skeleton className="h-8 w-32" />
            </div>
          </div>

          {/* Countdown Timer Skeleton */}
          <div className="flex items-center gap-2">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="flex items-center gap-1">
                <Skeleton className="h-4 w-8" />
                <Skeleton className="h-8 w-8" />
                {i < 3 && <Skeleton className="h-8 w-2" />}
              </div>
            ))}
          </div>
        </div>

        {/* Product Carousel Skeleton */}
        <div className="relative min-h-fit">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {[...Array(8)].map((_, i) => (
              <ProductCardSkeleton key={i} />
            ))}
          </div>
          
          {/* Navigation Arrows Skeleton */}
          <div className="absolute -top-2 right-16 z-10 flex gap-2">
            <Skeleton className="w-10 h-10 rounded-full" />
            <Skeleton className="w-10 h-10 rounded-full" />
          </div>
        </div>

        {/* View All Button Skeleton */}
        <div className="flex justify-center mt-8">
          <Skeleton className="h-10 w-32" />
        </div>
      </div>
    </section>
  )
} 