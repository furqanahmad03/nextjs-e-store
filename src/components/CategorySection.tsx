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

const categories: SearchCategory[] = [
  {
    id: 1,
    link: "/products?category=electronics",
    name: "Electronics",
    icon: <Smartphone className="w-8 h-8" />,
  },
  {
    id: 2,
    link: "/products?category=home-lifestyle",
    name: "Home & Lifestyle",
    icon: <Home className="w-8 h-8" />,
  },
  {
    id: 3,
    link: "/products?category=medicine",
    name: "Medicine",
    icon: <Pill className="w-8 h-8" />,
  },
  {
    id: 4,
    link: "/products?category=sports-outdoor",
    name: "Sports & Outdoor",
    icon: <Dumbbell className="w-8 h-8" />,
  },
  {
    id: 5,
    link: "/products?category=babies-toys",
    name: "Babies & Toys",
    icon: <Baby className="w-8 h-8" />,
  },
  {
    id: 6,
    link: "/products?category=groceries-pets",
    name: "Groceries & Pets",
    icon: <ShoppingBag className="w-8 h-8" />,
  },
  {
    id: 7,
    link: "/products?category=health-beauty",
    name: "Health & Beauty",
    icon: <Heart className="w-8 h-8" />,
  },
]

export default function CategorySection() {
  return (
    <section className="w-full bg-white py-8">
      <div className="max-w-allowed mx-auto px-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="w-2 h-8 bg-red-500 rounded"></div>
            <div>
              <p className="text-sm text-red-700 font-medium">Categories</p>
              <h2 className="text-2xl font-bold text-gray-900">Browse By Category</h2>
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