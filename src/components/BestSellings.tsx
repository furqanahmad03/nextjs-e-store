"use client"

import * as React from "react"
import ProductCard from "./ProductCard"
import { Product } from "@/types/Product"
import BestSellingsSkeleton from "./skeletons/BestSellingsSkeleton"
import { useTranslations } from "next-intl"

export default function BestSellings() {
  const [bestSellingProducts, setBestSellingProducts] = React.useState<Product[]>([])
  const [loading, setLoading] = React.useState(true)
  const t = useTranslations('products')

  // Fetch best selling products from API
  React.useEffect(() => {
    const fetchBestSellers = async () => {
      try {
        const response = await fetch('/api/products/bestsellers')
        const data = await response.json()
        
        // Transform the data to match Product format
        const transformedProducts = data.map((product: Product) => ({
          id: product.id,
          name: product.name,
          description: product.description,
          price: product.price,
          image: product.image,
          images: product.images || [product.image], // Use images array or fallback to single image
          category: product.category,
          subcategory: product.subcategory,
          brand: product.brand,
          rating: product.rating || 5.0, // Best sellers have high ratings
          stock: product.stock || 10,
          isSale: product.isSale || false,
        } as Product))
        
        setBestSellingProducts(transformedProducts)
      } catch (error) {
        console.error('Error fetching best sellers:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchBestSellers()
  }, [])

  if (loading) {
    return <BestSellingsSkeleton />
  }

  return (
    <section className="w-full bg-white py-8">
      <div className="max-w-allowed mx-auto px-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="w-2 h-8 bg-red-500 rounded"></div>
            <div>
              <p className="text-sm text-red-600 font-medium">{t('bestSellingThisMonth')}</p>
              <h2 className="text-2xl font-bold text-gray-900">{t('bestSellingProducts')}</h2>
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