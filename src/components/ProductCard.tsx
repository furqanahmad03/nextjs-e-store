"use client"

import * as React from "react"
import { Heart, Eye, Star } from "lucide-react"
import Image from "next/image"
import { ProductCardProps } from "@/types/Product"
import Link from "next/link"

interface Props {
  product: ProductCardProps
}

const renderStars = (rating: number) => {
  const stars = []
  const fullStars = Math.floor(rating)
  const hasHalfStar = rating % 1 !== 0

  for (let i = 0; i < fullStars; i++) {
    stars.push(<Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />)
  }

  if (hasHalfStar) {
    stars.push(<Star key="half" className="w-4 h-4 fill-yellow-400 text-yellow-400" />)
  }

  const emptyStars = 5 - Math.ceil(rating)
  for (let i = 0; i < emptyStars; i++) {
    stars.push(<Star key={`empty-${i}`} className="w-4 h-4 text-gray-300" />)
  }

  return stars
}

export default function ProductCard({ product }: Props) {
  return (
    <div className="group relative p-3 h-full hover:shadow-lg rounded-sm transition-all duration-300 border border-gray-100 overflow-hidden">
      {/* Product Image */}
      <div className="relative mb-6 overflow-hidden">
        <div className="relative w-full h-52 bg-gradient-to-br from-gray-50 to-gray-100 rounded-sm overflow-hidden">
          <Image
            src={product.image || '/iphone-banner.jpg'}
            alt={product.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>
        
        {/* Discount Badge */}
        <div className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
          -{product.discount}%
        </div>
        
        {/* Action Icons */}
        <div className="absolute top-2 right-2 flex flex-col gap-2">
          <button className="w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-md hover:bg-gray-100">
            <Heart className="w-4 h-4 text-gray-600" />
          </button>
          <Link href={"/products/1"} className="w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-md hover:bg-gray-100">
            <Eye className="w-4 h-4 text-gray-600" />
          </Link>
        </div>

        {/* Add To Cart Button - Slides up from bottom of image */}
        <div className="absolute bottom-0 left-0 right-0 bg-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out">
          <button className="w-full bg-black text-white font-bold py-3 px-4 uppercase tracking-wide hover:bg-gray-900 transition-colors duration-200">
            Add To Cart
          </button>
        </div>
      </div>

      {/* Product Info */}
      <div className="space-y-3 px-2">
        <h3 className="font-semibold text-gray-900 text-base leading-tight line-clamp-2">
          {product.name}
        </h3>
        
        {/* Price */}
        <div className="flex items-center gap-3">
          <span className="text-red-500 font-bold text-xl">${product.currentPrice}</span>
          <span className="text-gray-400 line-through text-sm font-medium">${product.originalPrice}</span>
        </div>
        
        {/* Rating */}
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1">
            {renderStars(product.rating)}
          </div>
          <span className="text-gray-500 text-sm font-medium">({product.reviews})</span>
        </div>
      </div>


    </div>
  )
} 