"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import ProductCard from "./ProductCard"
import productsData from "@/app/api/products/products.json"
import { ProductCardProps } from "@/types/Product"

export default function BestSellings() {
  // Create best selling products with specific data
  const bestSellingProducts = React.useMemo(() => {
    // Select specific products for best sellers
    const selectedProducts = productsData.slice(8, 12) // Get products 9-12
    
    return selectedProducts.map((product, index) => {
      const discount = 10 + (product.id % 30) // 10-40% discount based on product ID
      const originalPrice = product.price
      const currentPrice = originalPrice * (1 - discount / 100)
      
      return {
        id: product.id,
        name: product.name,
        image: product.image,
        currentPrice: Math.round(currentPrice * 100) / 100,
        originalPrice: Math.round(originalPrice * 100) / 100,
        discount,
        rating: 5, // Best sellers have 5-star ratings
        reviews: 50 + (product.id % 50), // 50-100 reviews based on product ID
      } as ProductCardProps
    })
  }, [])

  return (
    <section className="w-full bg-white py-8">
      <div className="max-w-allowed mx-auto px-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="w-2 h-8 bg-red-500 rounded"></div>
            <div>
              <p className="text-sm text-red-600 font-medium">This Month</p>
              <h2 className="text-2xl font-bold text-gray-900">Best Selling Products</h2>
            </div>
          </div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {bestSellingProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  )
} 