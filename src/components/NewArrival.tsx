"use client"

import * as React from "react"
import Image from "next/image"
import Link from "next/link"
import { Product } from "@/types/Product"
import { useTranslations } from "next-intl"
import { usePathname } from "next/navigation"

export default function NewArrival() {
  const [newArrivalProducts, setNewArrivalProducts] = React.useState<Product[]>([])
  const [loading, setLoading] = React.useState(true)
  const t = useTranslations('products')
  const tHero = useTranslations('hero')
  const pathname = usePathname()
  
  // Extract current language from pathname
  const currentLang = pathname.split('/')[1] || 'en'

  // Fetch new arrival products from API
  React.useEffect(() => {
    const fetchNewArrivalProducts = async () => {
      try {
        const response = await fetch('/api/products/newarrival')
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
        
        setNewArrivalProducts(transformedProducts)
      } catch (error) {
        console.error('Error fetching new arrival products:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchNewArrivalProducts()
  }, [])

  if (loading) {
    return (
      <section className="w-full bg-white py-8">
        <div className="max-w-allowed mx-auto px-4">
          <div className="flex items-center gap-3 mb-8">
            <div className="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
              {t('featured')}
            </div>
            <h2 className="text-2xl font-bold text-gray-900">{t('newArrivals')}</h2>
          </div>
          <div className="flex items-center justify-center h-64">
            <p>Loading new arrival products...</p>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="w-full bg-white py-8">
      <div className="max-w-allowed mx-auto px-4">
        {/* Header */}
        <div className="flex items-center gap-3 mb-8">
          <div className="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
            {t('featured')}
          </div>
          <h2 className="text-2xl font-bold text-gray-900">{t('newArrivals')}</h2>
        </div>

        {/* Product Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Large Left Panel */}
          <div className="lg:col-span-1">
            <div className="relative h-full bg-black rounded-lg overflow-hidden group">
              <Image
                src={newArrivalProducts[0]?.image || "/ps5.png"}
                alt={newArrivalProducts[0]?.name || "Product"}
                fill
                className="object-cover object-center group-hover:scale-105 transition-transform duration-300"
                priority
              />
              <div className="absolute bottom-6 left-6 text-white drop-shadow-lg">
                <h3 className="text-2xl font-bold mb-2">{newArrivalProducts[0]?.name || "PlayStation 5"}</h3>
                <p className="text-gray-300 mb-4 max-w-xs text-sm">
                  {newArrivalProducts[0]?.description || "Black and White version of the PS5 coming out on sale."}
                </p>
                <Link href={`/${currentLang}/products/${newArrivalProducts[0]?.id || 1}`} className="text-sm border border-white text-white font-medium hover:text-black hover:bg-white transition-colors duration-300 px-4 py-2 rounded-sm">{tHero('shopNow')}</Link>
              </div>
            </div>
          </div>

          {/* Right Stacked Panels */}
          <div className="flex flex-col justify-end space-y-6 lg:col-span-1">
            {/* Top Right Panel */}
            <div className="relative lg:h-64 h-52 bg-gradient-to-r from-gray-700 via-gray-700 to-gray-900 rounded-lg overflow-hidden group flex">
              <div className="w-1/2 flex items-end p-4">
                <div className="text-white drop-shadow-lg">
                  <h3 className="text-lg font-bold mb-1">{newArrivalProducts[1]?.name || "Women's Collections"}</h3>
                  <p className="text-gray-300 text-sm mb-3 max-w-xs">
                    {newArrivalProducts[1]?.description || "Featured woman collections that give you another vibe."}
                  </p>
                  <Link href={`/${currentLang}/products/${newArrivalProducts[1]?.id || 1}`} className="text-sm border border-white text-white font-medium hover:text-black hover:bg-white transition-colors duration-300 px-4 py-2 rounded-sm">{tHero('shopNow')}</Link>
                </div>
              </div>
              <div className="w-1/2 h-full relative">
                <Image
                  src={newArrivalProducts[1]?.image || "/women-collection.png"}
                  alt={newArrivalProducts[1]?.name || "Product"}
                  fill
                  className="object-cover object-center group-hover:scale-105 transition-transform duration-300"
                />
              </div>
            </div>

            {/* Bottom Right Panels - Side by Side */}
            <div className="grid grid-cols-2 gap-4">
              {/* Left Small Panel */}
              <div className="relative lg:h-64 h-52 bg-black rounded-lg overflow-hidden group">
                <Image
                  src={newArrivalProducts[2]?.image || "/speakers.png"}
                  alt={newArrivalProducts[2]?.name || "Product"}
                  fill
                  className="object-cover object-center group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute bottom-4 left-4 text-white drop-shadow-lg">
                  <h3 className="text-lg font-bold mb-1">{newArrivalProducts[2]?.name || "Speakers"}</h3>
                  <p className="text-gray-300 text-sm mb-3 max-w-xs">
                    {newArrivalProducts[2]?.description || "Amazon wireless speakers"}
                  </p>
                  <Link href={`/${currentLang}/products/${newArrivalProducts[2]?.id || 1}`} className="text-sm border border-white text-white font-medium hover:text-black hover:bg-white transition-colors duration-300 px-4 py-2 rounded-sm">{tHero('shopNow')}</Link>
                </div>
              </div>

              {/* Right Small Panel */}
              <div className="relative lg:h-64 h-52 bg-black rounded-lg overflow-hidden group">
                <Image
                  src={newArrivalProducts[3]?.image || "/perfumes.png"}
                  alt={newArrivalProducts[3]?.name || "Product"}
                  fill
                  className="object-cover object-center group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute bottom-4 left-4 text-white drop-shadow-lg">
                  <h3 className="text-lg font-bold mb-1">{newArrivalProducts[3]?.name || "Perfume"}</h3>
                  <p className="text-gray-300 text-sm mb-3 max-w-xs">
                    {newArrivalProducts[3]?.description || "GUCCI INTENSE OUD EDP"}
                  </p>
                  <Link href={`/${currentLang}/products/${newArrivalProducts[3]?.id || 1}`} className="text-sm border border-white text-white font-medium hover:text-black hover:bg-white transition-colors duration-300 px-4 py-2 rounded-sm">{tHero('shopNow')}</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
} 