"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import ProductCard from "./ProductCard"
import { ProductCardProps } from "@/types/Product"
import Link from "next/link"

// Specific products for "Explore Our Products" section
const ourProducts: ProductCardProps[] = [
  {
    id: 1,
    name: "Breed Dry Dog Food",
    image: "/iphone-banner.jpg", // Placeholder - you can replace with actual dog food image
    currentPrice: 100,
    originalPrice: 120,
    discount: 17,
    rating: 3.5,
    reviews: 35,
  },
  {
    id: 2,
    name: "CANON EOS DSLR Camera",
    image: "/iphone-banner.jpg", // Placeholder - you can replace with actual camera image
    currentPrice: 360,
    originalPrice: 400,
    discount: 10,
    rating: 4.5,
    reviews: 95,
  },
  {
    id: 3,
    name: "ASUS FHD Gaming Laptop",
    image: "/iphone-banner.jpg", // Placeholder - you can replace with actual laptop image
    currentPrice: 700,
    originalPrice: 800,
    discount: 13,
    rating: 4.5,
    reviews: 325,
  },
  {
    id: 4,
    name: "Curology Product Set",
    image: "/iphone-banner.jpg", // Placeholder - you can replace with actual skincare image
    currentPrice: 500,
    originalPrice: 600,
    discount: 17,
    rating: 4.0,
    reviews: 145,
  },
  {
    id: 5,
    name: "Kids Electric Car",
    image: "/iphone-banner.jpg", // Placeholder - you can replace with actual car image
    currentPrice: 960,
    originalPrice: 1200,
    discount: 20,
    rating: 4.0,
    reviews: 65,
  },
  {
    id: 6,
    name: "Jr. Zoom Soccer Cleats",
    image: "/iphone-banner.jpg", // Placeholder - you can replace with actual cleats image
    currentPrice: 1160,
    originalPrice: 1300,
    discount: 11,
    rating: 5.0,
    reviews: 35,
  },
  {
    id: 7,
    name: "GP11 Shooter USB Gamepad",
    image: "/iphone-banner.jpg", // Placeholder - you can replace with actual gamepad image
    currentPrice: 660,
    originalPrice: 800,
    discount: 18,
    rating: 5.0,
    reviews: 55,
  },
  {
    id: 8,
    name: "Quilted Satin Jacket",
    image: "/iphone-banner.jpg", // Placeholder - you can replace with actual jacket image
    currentPrice: 660,
    originalPrice: 750,
    discount: 12,
    rating: 4.5,
    reviews: 55,
  },
]

export default function OurProducts() {
  return (
    <section className="w-full bg-white py-8">
      <div className="max-w-allowed mx-auto px-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="w-2 h-8 bg-red-500 rounded"></div>
            <div>
              <p className="text-sm text-red-600 font-medium">Our Products</p>
              <h2 className="text-2xl font-bold text-gray-900">Explore Our Products</h2>
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
          <Link href="/products" className="text-sm border border-gray-600 text-black hover:text-white hover:bg-black transition-colors duration-300 px-4 py-2 rounded-sm">
            View More
          </Link>
        </div>
      </div>
    </section>
  )
} 