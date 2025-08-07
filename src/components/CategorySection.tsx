"use client"

import * as React from "react"
import {
  Smartphone,
  Home,
  Pill,
  Dumbbell,
  Baby,
  ShoppingBag,
  Heart
} from "lucide-react"
import { SearchCategory } from "@/types/SearchCategory"
import Link from "next/link"
import { useTranslations } from "next-intl"
import { usePathname } from "next/navigation"

export default function CategorySection() {
  const t = useTranslations('categories')
  const pathname = usePathname()
  
  // Extract current language from pathname
  const currentLang = pathname.split('/')[1] || 'en'

  const categories: SearchCategory[] = [
    {
      id: 1,
      link: `/${currentLang}/products?category=electronics`,
      name: t('electronics'),
      icon: <Smartphone className="w-8 h-8" />,
    },
    {
      id: 2,
      link: `/${currentLang}/products?category=home-lifestyle`,
      name: t('homeLifestyle'),
      icon: <Home className="w-8 h-8" />,
    },
    {
      id: 3,
      link: `/${currentLang}/products?category=medicine`,
      name: t('medicine'),
      icon: <Pill className="w-8 h-8" />,
    },
    {
      id: 4,
      link: `/${currentLang}/products?category=sports-outdoor`,
      name: t('sportsOutdoor'),
      icon: <Dumbbell className="w-8 h-8" />,
    },
    {
      id: 5,
      link: `/${currentLang}/products?category=babies-toys`,
      name: t('babiesToys'),
      icon: <Baby className="w-8 h-8" />,
    },
    {
      id: 6,
      link: `/${currentLang}/products?category=groceries-pets`,
      name: t('groceriesPets'),
      icon: <ShoppingBag className="w-8 h-8" />,
    },
    {
      id: 7,
      link: `/${currentLang}/products?category=health-beauty`,
      name: t('healthBeauty'),
      icon: <Heart className="w-8 h-8" />,
    },
  ]

  return (
    <section className="w-full bg-white py-8">
      <div className="max-w-allowed mx-auto px-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="w-2 h-8 bg-red-500 rounded"></div>
            <div>
              <p className="text-sm text-red-700 font-medium">{t('categories')}</p>
              <h2 className="text-2xl font-bold text-gray-900">{t('browseByCategory')}</h2>
            </div>
          </div>
        </div>

        {/* Category Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7 gap-4">
          {categories.map((category) => (
            <Link href={category.link} key={category.id} className="w-full h-full">
              <div
                className={`
                p-6 rounded-lg border cursor-pointer transition-all duration-200 h-full
                ${category.isActive
                    ? 'bg-red-500 border-red-500 text-white shadow-md'
                    : 'bg-white border-gray-200 text-gray-900 hover:border-gray-300 hover:shadow-sm'
                  }
              `}
              >
                <div className="flex flex-col items-center text-center space-y-3">
                  <div className={`
                  ${category.isActive ? 'text-white' : 'text-gray-900'}
                `}>
                    {category.icon}
                  </div>
                  <span className={`
                  font-medium text-sm text-center
                  ${category.isActive ? 'text-white' : 'text-gray-900'}
                `}>
                    {category.name}
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
} 