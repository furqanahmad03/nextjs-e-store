import { Skeleton } from "@/components/ui/skeleton"
import { Button } from "@/components/ui/button"
import { Minus, Plus } from "lucide-react"

export default function ProductDetailSkeleton() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Breadcrumb Skeleton */}
        <div className="mb-8">
          <div className="flex items-center space-x-2">
            <Skeleton className="h-4 w-16" />
            <Skeleton className="h-4 w-4" />
            <Skeleton className="h-4 w-20" />
            <Skeleton className="h-4 w-4" />
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-4 w-4" />
            <Skeleton className="h-4 w-32" />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Images Skeleton */}
          <div className="space-y-4">
            {/* Main Image Skeleton */}
            <div className="relative aspect-square bg-white rounded-lg overflow-hidden border border-gray-200">
              <Skeleton className="w-full h-full" />
              
              {/* Sale Badge Skeleton */}
              <div className="absolute top-4 left-4">
                <Skeleton className="h-6 w-20" />
              </div>
              
              {/* Stock Badge Skeleton */}
              <div className="absolute top-4 right-4">
                <Skeleton className="h-6 w-16" />
              </div>
            </div>

            {/* Thumbnail Images Skeleton */}
            <div className="flex gap-2 overflow-x-auto">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="relative w-20 h-20 rounded-lg overflow-hidden border-2 border-gray-200 flex-shrink-0">
                  <Skeleton className="w-full h-full" />
                </div>
              ))}
            </div>
          </div>

          {/* Product Info Skeleton */}
          <div className="space-y-6">
            {/* Product Header Skeleton */}
            <div>
              <Skeleton className="h-8 w-3/4 mb-2" />
              <Skeleton className="h-4 w-1/3 mb-4" />
              
              {/* Rating Skeleton */}
              <div className="flex items-center gap-2 mb-4">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Skeleton key={i} className="w-4 h-4" />
                  ))}
                </div>
                <Skeleton className="h-4 w-24" />
              </div>
            </div>

            {/* Price Skeleton */}
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <Skeleton className="h-8 w-24" />
                <Skeleton className="h-6 w-20" />
                <Skeleton className="h-6 w-16" />
              </div>
              <Skeleton className="h-4 w-48" />
            </div>

            {/* Quantity Selector Skeleton */}
            <div className="space-y-2">
              <Skeleton className="h-4 w-20" />
              <div className="flex items-center gap-2">
                <Button size="sm" variant="outline" disabled className="w-8 h-8 p-0">
                  <Minus className="w-3 h-3" />
                </Button>
                <Skeleton className="w-16 h-8" />
                <Button size="sm" variant="outline" disabled className="w-8 h-8 p-0">
                  <Plus className="w-3 h-3" />
                </Button>
              </div>
            </div>

            {/* Action Buttons Skeleton */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Skeleton className="h-12 flex-1" />
              <Skeleton className="h-12 w-32" />
              <Skeleton className="h-12 w-32" />
            </div>

            {/* Product Features Skeleton */}
            <div className="space-y-3">
              <Skeleton className="h-5 w-32" />
              <div className="space-y-2">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <Skeleton className="w-2 h-2 rounded-full" />
                    <Skeleton className="h-4 flex-1" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Product Details Tabs Skeleton */}
        <div className="mt-16">
          <div className="border-b border-gray-200">
            <div className="flex space-x-8">
              {[...Array(4)].map((_, i) => (
                <Skeleton key={i} className="h-10 w-24" />
              ))}
            </div>
          </div>
          
          <div className="mt-8 space-y-4">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-4 w-5/6" />
            <Skeleton className="h-4 w-2/3" />
          </div>
        </div>

        {/* Related Products Skeleton */}
        <div className="mt-16">
          <Skeleton className="h-8 w-48 mb-8" />
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="group relative bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300">
                {/* Product Image Skeleton */}
                <div className="aspect-square bg-gray-200 relative overflow-hidden">
                  <Skeleton className="w-full h-full" />
                  
                  {/* Sale Badge Skeleton */}
                  <Skeleton className="absolute top-2 left-2 h-5 w-12" />
                  
                  {/* Wishlist Button Skeleton */}
                  <Skeleton className="absolute top-2 right-2 w-8 h-8 rounded-full" />
                </div>

                {/* Product Info Skeleton */}
                <div className="p-4">
                  <div className="space-y-2">
                    {/* Category and Brand Skeleton */}
                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <Skeleton className="h-3 w-16" />
                      <Skeleton className="h-3 w-12" />
                    </div>

                    {/* Product Name Skeleton */}
                    <Skeleton className="h-4 w-3/4" />

                    {/* Rating Skeleton */}
                    <div className="flex items-center gap-1">
                      <div className="flex gap-0.5">
                        {[...Array(5)].map((_, j) => (
                          <Skeleton key={j} className="w-3 h-3" />
                        ))}
                      </div>
                      <Skeleton className="h-3 w-8" />
                    </div>

                    {/* Price Skeleton */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Skeleton className="h-5 w-16" />
                        <Skeleton className="h-4 w-8" />
                      </div>
                      <Skeleton className="h-3 w-20" />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
} 