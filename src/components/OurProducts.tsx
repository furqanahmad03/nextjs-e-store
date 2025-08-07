"use client"

import * as React from "react"
import ProductCard from "./ProductCard"
import { Product } from "@/types/Product"
import Link from "next/link"
import OurProductsSkeleton from "./skeletons/OurProductsSkeleton"
import { useTranslations } from "next-intl"
import { usePathname } from "next/navigation"

export default function OurProducts() {
  const [ourProducts, setOurProducts] = React.useState<Product[]>([])
  const [loading, setLoading] = React.useState(true)
  const t = useTranslations('products')
  const pathname = usePathname()
  
  // Extract current language from pathname
  const currentLang = pathname.split('/')[1] || 'en'

  // Fetch featured products from API
  React.useEffect(() => {
    const fetchFeaturedProducts = async () => {
      try {
        const response = await fetch('/api/products/featured')
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
          rating: product.rating || 4.0,
          stock: product.stock || 10,
          isSale: product.isSale || false,
        } as Product))
        
        setOurProducts(transformedProducts)
      } catch (error) {
        console.error('Error fetching featured products:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchFeaturedProducts()
  }, [])

  if (loading) {
    return <OurProductsSkeleton />
  }

  return (
    <section className="w-full bg-white py-8">
      <div className="max-w-allowed mx-auto px-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="w-2 h-8 bg-red-500 rounded"></div>
            <div>
              <p className="text-sm text-red-600 font-medium">{t('our_products')}</p>
              <h2 className="text-2xl font-bold text-gray-900">{t('explore_products')}</h2>
            </div>
          </div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {ourProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* View More Button */}
        <div className="flex justify-center mt-8">
          <Link href={`/${currentLang}/products`} className="text-sm border border-gray-600 text-black hover:text-white hover:bg-black transition-colors duration-300 px-4 py-2 rounded-sm">
            {t('viewMore')}
          </Link>
        </div>
      </div>
    </section>
  )
} 