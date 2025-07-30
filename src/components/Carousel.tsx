"use client"

import * as React from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

const bannerSlides = [
  {
    id: 1,
    title: "iPhone 14 Series",
    subtitle: "Up to 10% off Voucher",
    cta: "Shop Now",
    image: "/iphone-banner.jpg",
    bgColor: "bg-black",
    textColor: "text-white",
    borderColor: "border-blue-500",
  },
  {
    id: 2,
    title: "Summer Collection",
    subtitle: "New Arrivals - Up to 50% Off",
    cta: "Explore Now",
    image: "/summer-banner.jpg",
    bgColor: "bg-gradient-to-r from-pink-400 to-purple-500",
    textColor: "text-white",
    borderColor: "border-pink-300",
  },
  {
    id: 3,
    title: "Electronics Sale",
    subtitle: "Tech Deals - Save Big",
    cta: "Shop Electronics",
    image: "/electronics-banner.jpg",
    bgColor: "bg-gradient-to-r from-blue-600 to-indigo-700",
    textColor: "text-white",
    borderColor: "border-blue-400",
  },
]

export default function HeroCarousel() {
  return (
    <div className="w-full">
      <Carousel
        opts={{
          align: "start",
          loop: true,
        }}
        className="w-full"
      >
        <CarouselContent>
          {bannerSlides.map((slide) => (
            <CarouselItem key={slide.id} className="w-full">
              <div className={`relative w-full h-[400px] ${slide.bgColor} ${slide.borderColor} border-2 rounded-lg overflow-hidden`}>
                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-10">
                  <div className="absolute top-4 left-4 w-16 h-16 bg-white rounded-full"></div>
                  <div className="absolute top-20 right-8 w-8 h-8 bg-white rounded-full"></div>
                  <div className="absolute bottom-8 left-1/3 w-12 h-12 bg-white rounded-full"></div>
                </div>
                
                {/* Content */}
                <div className="relative z-10 flex items-center justify-between h-full px-8">
                  <div className="flex-1">
                    <div className="mb-2">
                      <h3 className={`text-sm font-medium ${slide.textColor} opacity-80`}>
                        {slide.title}
                      </h3>
                    </div>
                    <h2 className={`text-4xl font-bold ${slide.textColor} mb-4`}>
                      {slide.subtitle}
                    </h2>
                    <Button 
                      variant="outline" 
                      className={`${slide.textColor} text-black hover:bg-gray-200 transition-colors duration-300`}
                    >
                      {slide.cta}
                      <ChevronRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                  
                  {/* Product Image */}
                  <div className="flex-1 flex justify-end items-center">
                    <div className="relative w-48 h-48 rounded-full overflow-hidden">
                      <Image
                        src={slide.image}
                        alt={slide.title}
                        fill
                        className="object-cover"
                        priority={slide.id === 1}
                      />
                    </div>
                  </div>
                </div>
                
                {/* Pagination Dots */}
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                  {bannerSlides.map((_, index) => (
                    <div
                      key={index}
                      className={`w-2 h-2 rounded-full ${
                        index + 1 === slide.id ? 'bg-red-500' : 'bg-white/50'
                      }`}
                    />
                  ))}
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        
        <CarouselPrevious className="left-4" />
        <CarouselNext className="right-4" />
      </Carousel>
    </div>
  )
} 