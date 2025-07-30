"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import productsData from "@/app/api/products/products.json"
import Link from "next/link"

export default function NewArrival() {
  // Select 4 products for New Arrival section
  const newArrivalProducts = React.useMemo(() => {
    const selectedProducts = productsData.slice(0, 4)
    return selectedProducts.map((product, index) => ({
      id: product.id,
      name: product.name,
      description: product.description,
      image: product.image,
      price: product.price,
      category: product.category,
    }))
  }, [])
  return (
    <section className="w-full bg-white py-8">
      <div className="max-w-allowed mx-auto px-4">
        {/* Header */}
        <div className="flex items-center gap-3 mb-8">
          <div className="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
            Featured
          </div>
          <h2 className="text-2xl font-bold text-gray-900">New Arrival</h2>
        </div>

        {/* Product Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Large Left Panel */}
          <div className="lg:col-span-1">
            <div className="relative h-full bg-black rounded-lg overflow-hidden group">
              <Image
                src="/ps5.png"
                alt={newArrivalProducts[0]?.name || "Product"}
                fill
                className="object-contain object-center group-hover:scale-105 transition-transform duration-300"
                priority
              />
              {/* <div className="absolute inset-0 bg-black !bg-opacity-20"></div> */}
              <div className="absolute bottom-6 left-6 text-white drop-shadow-lg">
                <h3 className="text-2xl font-bold mb-2">{newArrivalProducts[0]?.name || "PlayStation 5"}</h3>
                <p className="text-gray-300 mb-4 max-w-xs text-sm">
                  {newArrivalProducts[0]?.description || "Black and White version of the PS5 coming out on sale."}
                </p>
                  <Link href="/products/1" className="text-sm border border-white text-white font-medium hover:text-black hover:bg-white transition-colors duration-300 px-4 py-2 rounded-sm">Shop Now</Link>
              </div>
            </div>
          </div>

          {/* Right Stacked Panels */}
          <div className="flex flex-col justify-end space-y-6 lg:col-span-1">
            {/* Top Right Panel */}
            <div className="relative lg:h-64 h-52 bg-black rounded-lg overflow-hidden group flex">
              <div className="w-1/2 flex items-end p-4">
                <div className="text-white drop-shadow-lg">
                  <h3 className="text-lg font-bold mb-1">{newArrivalProducts[1]?.name || "Women's Collections"}</h3>
                  <p className="text-gray-300 text-sm mb-3 max-w-xs">
                    {newArrivalProducts[1]?.description || "Featured woman collections that give you another vibe."}
                  </p>
                  <Link href="/products/1" className="text-sm border border-white text-white font-medium hover:text-black hover:bg-white transition-colors duration-300 px-4 py-2 rounded-sm">Shop Now</Link>
                </div>
              </div>
              <div className="w-1/2 h-full relative">
                <Image
                  src="/women-collection.png"
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
                  src="/speakers.png"
                  alt={newArrivalProducts[2]?.name || "Product"}
                  fill
                  className="object-contain object-center group-hover:scale-105 transition-transform duration-300"
                />
                {/* <div className="absolute inset-0 bg-black bg-opacity-20"></div> */}
                                  <div className="absolute bottom-4 left-4 text-white drop-shadow-lg">
                    <h3 className="text-lg font-bold mb-1">{newArrivalProducts[2]?.name || "Speakers"}</h3>
                    <p className="text-gray-300 text-sm mb-3 max-w-xs">
                      {newArrivalProducts[2]?.description || "Amazon wireless speakers"}
                    </p>
                  <Link href="/products/1" className="text-sm border border-white text-white font-medium hover:text-black hover:bg-white transition-colors duration-300 px-4 py-2 rounded-sm">Shop Now</Link>
                </div>
              </div>

              {/* Right Small Panel */}
              <div className="relative lg:h-64 h-52 bg-black rounded-lg overflow-hidden group">
                <Image
                  src="/perfumes.png"
                  alt={newArrivalProducts[3]?.name || "Product"}
                  fill
                  className="object-contain object-center group-hover:scale-105 transition-transform duration-300"
                />
                  <div className="absolute bottom-4 left-4 text-white drop-shadow-lg">
                  <h3 className="text-lg font-bold mb-1">{newArrivalProducts[3]?.name || "Perfume"}</h3>
                  <p className="text-gray-300 text-sm mb-3 max-w-xs">
                    {newArrivalProducts[3]?.description || "GUCCI INTENSE OUD EDP"}
                  </p>
                  <Link href="/products/1" className="text-sm border border-white text-white font-medium hover:text-black hover:bg-white transition-colors duration-300 px-4 py-2 rounded-sm">Shop Now</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
} 