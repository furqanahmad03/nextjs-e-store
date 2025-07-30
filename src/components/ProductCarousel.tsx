"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import ProductCard from "./ProductCard"
import productsData from "@/app/api/products/products.json"
import { ProductCardProps } from "@/types/Product"
import Link from "next/link"

export default function ProductCarousel() {
  const [timeLeft, setTimeLeft] = React.useState({
    days: 3,
    hours: 23,
    minutes: 19,
    seconds: 56,
  })

  // Create flash sale products with discounts
  const flashSaleProducts = React.useMemo(() => {
    return productsData.slice(0, 8).map((product, index) => {
      const discount = 20 + (product.id % 40) // 20-60% discount based on product ID
      const originalPrice = product.price
      const currentPrice = originalPrice * (1 - discount / 100)
      
      return {
        id: product.id,
        name: product.name,
        image: product.image,
        currentPrice: Math.round(currentPrice * 100) / 100,
        originalPrice: Math.round(originalPrice * 100) / 100,
        discount,
        rating: product.rating,
        reviews: 50 + (product.id % 100), // 50-150 reviews based on product ID
      } as ProductCardProps
    })
  }, [])

  React.useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        let { days, hours, minutes, seconds } = prev
        
        if (seconds > 0) {
          seconds--
        } else {
          seconds = 59
          if (minutes > 0) {
            minutes--
          } else {
            minutes = 59
            if (hours > 0) {
              hours--
            } else {
              hours = 23
              if (days > 0) {
                days--
              }
            }
          }
        }
        
        return { days, hours, minutes, seconds }
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [])



  return (
    <section className="w-full bg-white py-8 min-h-fit">
      <div className="max-w-allowed mx-auto px-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="w-2 h-8 bg-red-500 rounded"></div>
            <div>
              <p className="text-sm text-gray-600">Today's</p>
              <h2 className="text-2xl font-bold text-gray-900">Flash Sales</h2>
            </div>
          </div>

          {/* Countdown Timer */}
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1">
              <span className="text-sm text-gray-600">Days</span>
              <span className="text-2xl font-bold text-gray-900">{timeLeft.days.toString().padStart(2, '0')}</span>
            </div>
            <span className="text-2xl font-bold text-red-500">:</span>
            <div className="flex items-center gap-1">
              <span className="text-sm text-gray-600">Hours</span>
              <span className="text-2xl font-bold text-gray-900">{timeLeft.hours.toString().padStart(2, '0')}</span>
            </div>
            <span className="text-2xl font-bold text-red-500">:</span>
            <div className="flex items-center gap-1">
              <span className="text-sm text-gray-600">Minutes</span>
              <span className="text-2xl font-bold text-gray-900">{timeLeft.minutes.toString().padStart(2, '0')}</span>
            </div>
            <span className="text-2xl font-bold text-red-500">:</span>
            <div className="flex items-center gap-1">
              <span className="text-sm text-gray-600">Seconds</span>
              <span className="text-2xl font-bold text-gray-900">{timeLeft.seconds.toString().padStart(2, '0')}</span>
            </div>
          </div>
        </div>

        {/* Product Carousel */}
        <div className="relative min-h-fit">
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full"
          >
            <CarouselContent className="-ml-2 md:-ml-4 mt-3 py-3">
            {flashSaleProducts.map((product) => (
              <CarouselItem key={product.id} className="pl-2 md:pl-4 basis-full md:basis-1/2 lg:basis-1/3 xl:basis-1/4">
                <ProductCard product={product} />
              </CarouselItem>
            ))}
          </CarouselContent>
          
          {/* Navigation Arrows - Top Right */}
          <div className="absolute -top-2 right-16 z-10 flex gap-2">
            <CarouselPrevious className="w-10 h-10 rounded-full bg-white border border-gray-900 hover:bg-gray-100 shadow-sm" />
            <CarouselNext className="w-10 h-10 rounded-full bg-white border border-gray-900 hover:bg-gray-100 shadow-sm" />
          </div>
        </Carousel>
        </div>


        
        {/* View All Button */}
        <div className="flex justify-center mt-8">
            <Link href="/products?sale=true" className="text-sm border border-gray-600 text-black hover:text-white hover:bg-black transition-colors duration-300 px-4 py-2 rounded-sm">View All Products</Link>
        </div>
      </div>
    </section>
  )
} 