import { Skeleton } from "@/components/ui/skeleton"
import ProductCardSkeleton from "./ProductCardSkeleton"

export default function BestSellingsSkeleton() {
  return (
    <section className="w-full bg-white py-8">
      <div className="max-w-allowed mx-auto px-4">
        {/* Header Skeleton */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <Skeleton className="w-2 h-8" />
            <div>
              <Skeleton className="h-4 w-24 mb-1" />
              <Skeleton className="h-8 w-48" />
            </div>
          </div>
        </div>

        {/* Product Grid Skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {[...Array(4)].map((_, i) => (
            <ProductCardSkeleton key={i} />
          ))}
        </div>
      </div>
    </section>
  )
} 