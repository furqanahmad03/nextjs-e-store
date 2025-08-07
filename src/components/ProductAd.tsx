"use client"

import * as React from "react"
import Image from "next/image"
import Link from "next/link"
import { useTranslations } from "next-intl"
import { usePathname } from "next/navigation"

interface ProductAdProps {
  category: string
  tagline: string
  description?: string
  image: string
  productLink: string
}

export default function ProductAd({ 
  category, 
  tagline, 
  description, 
  image, 
  productLink 
}: ProductAdProps) {
  const t = useTranslations('productAd')
  const pathname = usePathname()
  
  // Extract current language from pathname
  const currentLang = pathname.split('/')[1] || 'en'

  return (
    <section className="w-full bg-white py-12">
      <div className="max-w-allowed bg-gray-900 mx-auto p-16">
        <div className="flex flex-col lg:flex-row items-center gap-8">
          {/* Left Section - Text and Timer */}
          <div className="flex-1 text-white space-y-6">
            {/* Category Label */}
            <div className="text-green-400 text-sm font-medium">
              {category}
            </div>

            {/* Main Tagline */}
            <h2 className="text-4xl lg:text-5xl font-bold leading-tight">
              {tagline}
            </h2>

            {/* Description (optional) */}
            {description && (
              <p className="text-gray-300 text-lg">
                {description}
              </p>
            )}

            {/* Buy Now Button */}
            <Link href={productLink} className="text-sm border border-white text-white font-medium hover:text-black hover:bg-white transition-colors duration-300 px-4 py-2 rounded-sm">{t('buyNow')}</Link>
          </div>

          {/* Right Section - Product Image */}
          <div className="flex-1 flex justify-center lg:justify-end">
            <div className="relative w-80 h-80 lg:w-96 lg:h-96">
              <Image
                src={image}
                alt="Product"
                fill
                className="object-contain"
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
} 